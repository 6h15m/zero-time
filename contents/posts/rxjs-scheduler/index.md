---
title: "[번역] RxJS 공식 문서 #Scheduler"
description: "🇰🇷 RxJS의 컨트롤타워, Scheduler에 대해서 알아보자-"
date: 2022-04-12 21:00:00
update: 2022-04-12 21:00:00
tags:
  - RxJS
  - Reactive Programming
series: "RxJS 공식 문서 번역"
---

## 프롤로그

안녕하세요! 제로입니다.
이번에 번역해본 문서는 특별한 옵저버블인 [Scheduler 가이드](https://rxjs.dev/guide/scheduler) 입니다.
공식 가이드 문서를 모두 번역하는 날이 얼마 남지 않았네요! 계속 달려보겠습니다- 💨

## Scheduler(스케쥴러) 소개

**Scheduler**는 구독 시작 타이밍과 알림 전달 타이밍을 제어합니다.
Scheduler는 아래 세 가지로 구성되어 있는데요,

- **Scheduler는 데이터 구조입니다.** 우선 순위 또는 기준에 따라 작업을 저장하고, 대기시킬 수 있습니다.
- **Scheduler는 실행 컨텍스트입니다.** 작업이 실행되는 위치 및 시간을 나타내죠.
  (예: 즉시 실행 또는 setTimeout, process.nextTick, animation frame 같은 콜백 매커니즘)
- **Scheduler에는 (가상의) 시계가 있습니다.** 스케쥴러는 getter 메소드 `now()`로 "시간" 개념을 제공합니다.
  특정 scheduler에서 스케쥴링되는 작업은 해당 시계로 표시된 시간에 적용되죠.

> Scheduler는 옵저버블이 옵저버에 알림을 전달할 실행 컨텍스트를 정의할 수 있습니다.

예시로, 값 `1`, `2`, `3`을 동기적으로 방출하는 간단한 옵저버블과 `observeOn` 연산자를 사용해
해당 값들을 전달하는 데 사용할 `async` Scheduler를 정의해보겠습니다.

<!-- prettier-ignore -->
```ts
import { Observable, observeOn, asyncScheduler } from 'rxjs';

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler)
);

console.log('구독 직전!');
observable.subscribe({
  next(x) {
    console.log('값 ' + x);
  },
  error(err) {
    console.error('문제가 발생했습니다: ' + err);
  },
  complete() {
    console.log('완료');
  },
});
console.log('구독 직후!');
```

출력된 값은 이렇습니다.

```none
구독 직전!
구독 직후!
값 1
값 2
값 3
완료
```

지금까지와는 다르게, `값 ...` 알림이 `구독 직후!` 알림보다 늦게 전달되었죠?
이는 `observeOn(asyncScheduler)`이 `new Observable`과 마지막 옵저버 사이에 중간 옵저버를 두기 때문입니다.
조금 더 명확하게 알아보기 위해서, 예제 코드를 살짝 바꾸어 보겠습니다.

<!-- prettier-ignore -->
```ts
import { Observable, observeOn, asyncScheduler } from 'rxjs';

const observable = new Observable((proxyObserver) => {
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
}).pipe(
  observeOn(asyncScheduler)
);

const finalObserver = {
  next(x) {
    console.log('값 ' + x);
  },
  error(err) {
    console.error('문제가 발생했습니다: ' + err);
  },
  complete() {
    console.log('완료');
  },
};

console.log('구독 직전!');
observable.subscribe(finalObserver);
console.log('구독 직후!');
```

`observeOn(asyncScheduler)`에서 생성된 `proxyObserver`의 `next(val)` 함수는 대략 이렇습니다.

<!-- prettier-ignore -->
```ts
const proxyObserver = {
  next(val) {
    asyncScheduler.schedule(
      (x) => finalObserver.next(x),
      0 /* delay */,
      val /* 위 함수의 x가 될 예정 */
    );
  },

  // ...
};
```

주어진 `delay` 값이 0이어도, `async` Scheduler는 `setTimeout` 또는 `setInterval`로 작동합니다.
일반적으로 JavaScript에서 `setTimeout(fn, 0)`은 다음 이벤트 루프에서 `fn` 함수를 제일 먼저 실행합니다.
이것이 `구독 직후!` 발생 이후에 `값 1`이 `finalObserver`로 전달되는 이유를 설명하죠.

Scheduler의 `schedule()` 메소드는 scheduler 내부의 시계에 상대적인 시간의 양을 전달하는 `delay` 인수를 받습니다.
`delay`와 같은 시간 연산자가 실제 시간이 아니라 scheduler 시계의 시간에 의해서 작동되는 이유는, 위와 같이 Scheduler의 시계는 실제 시간과 관련이 없기 때문입니다.
이 동작은 특히 _가상 시계 Scheduler_ 가 실제로 예정된 작업을 동기적으로 실행하는 동안
가짜 시계의 시간을 위조해야 하는 상황의 테스트를 진행할 때 유용합니다.

## Scheduler 타입들

`async(비동기)` Scheduler는 RxJS에서 제공하는 내장 scheduler 중 하나입니다.

| Scheduler                 | 목적                                                                                           | 사용 예시                      |
| ------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| `null`                    | Scheduler를 전달하지 않아서 동기적, 재귀적으로 알림을 전달합니다.                              | 상수 시간 연산, 꼬리 재귀 연산 |
| `queueScheduler`          | 현재 event frame의 queue에서 동작합니다.                                                       | 반복적인 작업                  |
| `asapScheduler`           | Promise와 동일한 queue인 micro task queue에서 동작합니다. (보통 현재 작업 이후-다음 작업 이전) | 비동기 변환                    |
| `asyncScheduler`          | `setInterval`과 함께 동작합니다.                                                               | 시간 기반의 연산               |
| `animationFrameScheduler` | 다음 브라우저 콘텐츠를 다시 그리기 직전에 동작합니다.                                          | 부드러운 브라우저 애니메이션   |

## Scheduler의 사용

어쩌면 여러분은 이미 RxJS 코드에서 scheduler를 사용했을 수도 있습니다.
동시성을 다루는 모든 옵저버블 연산자가 optional하게 scheduler를 갖고 있기 때문이죠.
scheduler를 작성하지 않으면, RxJS는 최소 동시성 원칙(연산자의 요구를 만족시키는 최소한의 동시성을 도입)에 의해 기본 scheduler를 선택합니다.

예를 들어, 유한하고 적은 수의 메세지를 다루는 옵저버블을 리턴하는 연산자엔 `null` 이나 `undefined`와 같이 scheduler를 사용하지 않는 것을 선택합니다.
잠재적으로 많거나 무한대의 메세지를 반환하는 연산자의 경우, `queue` Scheduler를 선택하고,
타이머를 사용하는 연산자는 `async` Scheduler를 선택합니다.

RxJS는 동시성 scheduler를 최소 용도로만 사용하기 때문에, 성능을 위해 동시성을 도입하려는 경우 다른 scheduler를 선택할 수 있습니다.
특정 scheduler를 지정하려면, scheduler를 인수로 받는 연산자 메서드를 사용하면 됩니다(예: `from([10, 20, 30], asyncScheduler)`).

**정적 생성 연산자는 Scheduler를 인수로 받습니다.**
예를 들어, `from(array, scheduler)`은 `array`에서 변환된 각 알림을 전달할 때 사용할 scheduler를 지정할 수 있습니다.
일반적으로 scheduler는 연산자의 마지막 인수입니다. 아래의 정적 생성 연산자들은 Scheduler를 인수로 받습니다.

- `bindCallback`
- `bindNodeCallback`
- `combineLatest`
- `concat`
- `empty`
- `from`
- `fromPromise`
- `interval`
- `merge`
- `of`
- `range`
- `throw`
- `timer`

**`subscribeOn`으로 `subscribe()` 호출이 발생할 타이밍을 예약하세요.**
기본적으로 옵저버블의 `subscribe()` 호출은 즉시, 동기적으로 발생합니다.
그러나 인스턴스 연산자 `subscribeOn(scheduler)`을 사용하면 지정된 Scheduler에서 실제 구독이 발생하는 타이밍을 지연하거나 예약할 수 있습니다.
여기서 `scheduler`를 인수로 제공해야 합니다.

**`observeOn`으로 알림이 전달되는 타이밍을 예약하세요.**
위의 예제에서 보았던 것처럼 인스턴스 연산자 `observeOn(scheduler)`은 옵저버와 소스 옵저버블 사이에 지정된 `scheduler`를 사용해 대상 옵저버에 대한 호출을 예약하는 중간 옵저버를 둡니다.

**인스턴스 연산자는 Scheduler를 인수로 받을 수 있습니다.**

`bufferTime`, `debounceTime`, `delay`, `auditTime`, `sampleTime`, `throttleTime`, `timeInterval`, `timeout`, `timeoutWith`, `windowTime` 같은 시간 관련 연산자들은
마지막 인수로 Scheduler를 받거나 `asyncScheduler` 위에서 작동합니다.

마지막 인수로 Scheduler를 받는 다른 인스턴스 연산자에는 `cache`, `combineLatest`, `concat`, `expand`, `merge`, `publishReplay`, `startWith`가 있습니다.

`cache`와 `publishReplay`는 모두 ReplaySubject를 사용하기 때문에 Scheduler를 인수로 받습니다.
ReplaySubject가 시간을 다룰 수 있기 때문에 ReplaySubject의 생성자는 (optional)Scheduler를 마지막 인수로 사용합니다.
기본적으로 ReplaySubject는 `queue` Scheduler를 통해 시간을 제공합니다.


```javascript
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}
```