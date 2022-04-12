---
title: "[번역] RxJS 공식 문서 #Scheduler"
description: "🇰🇷 RxJS의 컨트롤타워, Scheduler에 대해서 알아보자-"
date: 2022-04-12 19:00:00
update: 2022-04-12 19:00:00
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
이는 `observeOn(asyncScheduler)`이 `new Observable`과 마지막 옵저버 사이에 프록시 옵저버를 꺼내기 때문입니다.
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
이건 `구독 직후!` 발생 이후에 `값 1`이 `finalObserver`로 전달되는 이유를 설명하죠.


The `schedule()` method of a Scheduler takes a `delay` argument, which refers to a quantity of time relative to the Scheduler's own internal clock.
A Scheduler's clock need not have any relation to the actual wall-clock time.
This is how temporal operators like `delay` operate not on actual time, but on time dictated by the Scheduler's clock.
This is specially useful in testing, where a _virtual time Scheduler_ may be used to fake wall-clock time while in reality executing scheduled tasks synchronously.

## Scheduler Types

The `async` Scheduler is one of the built-in schedulers provided by RxJS. Each of these can be created and returned by using static properties of the `Scheduler` object.

| Scheduler                 | Purpose                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `null`                    | By not passing any scheduler, notifications are delivered synchronously and recursively. Use this for constant-time operations or tail recursive operations.                   |
| `queueScheduler`          | Schedules on a queue in the current event frame (trampoline scheduler). Use this for iteration operations.                                                                     |
| `asapScheduler`           | Schedules on the micro task queue, which is the same queue used for promises. Basically after the current job, but before the next job. Use this for asynchronous conversions. |
| `asyncScheduler`          | Schedules work with `setInterval`. Use this for time-based operations.                                                                                                         |
| `animationFrameScheduler` | Schedules task that will happen just before next browser content repaint. Can be used to create smooth browser animations.                                                     |

## Using Schedulers

You may have already used schedulers in your RxJS code without explicitly stating the type of schedulers to be used.
This is because all Observable operators that deal with concurrency have optional schedulers.
If you do not provide the scheduler, RxJS will pick a default scheduler by using the principle of least concurrency.
This means that the scheduler which introduces the least amount of concurrency that satisfies the needs of the operator is chosen.
For example, for operators returning an observable with a finite and small number of messages, RxJS uses no Scheduler, i.e. `null` or `undefined`.
For operators returning a potentially large or infinite number of messages, `queue` Scheduler is used.
For operators which use timers, `async` is used.

Because RxJS uses the least concurrency scheduler, you can pick a different scheduler if you want to introduce concurrency for performance purpose.
To specify a particular scheduler, you can use those operator methods that take a scheduler, e.g., `from([10, 20, 30], asyncScheduler)`.

**Static creation operators usually take a Scheduler as argument.**
For instance, `from(array, scheduler)` lets you specify the Scheduler to use when delivering each notification converted from the `array`.
It is usually the last argument to the operator. The following static creation operators take a Scheduler argument:

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

**Use `subscribeOn` to schedule in what context will the `subscribe()` call happen.**
By default, a `subscribe()` call on an Observable will happen synchronously and immediately.
However, you may delay or schedule the actual subscription to happen on a given Scheduler, using the instance operator `subscribeOn(scheduler)`,
where `scheduler` is an argument you provide.

**Use `observeOn` to schedule in what context will notifications be delivered.**
As we saw in the examples above, instance operator `observeOn(scheduler)` introduces a mediator Observer between the source Observable and the destination Observer,
where the mediator schedules calls to the destination Observer using your given `scheduler`.

**Instance operators may take a Scheduler as argument.**

Time-related operators like `bufferTime`, `debounceTime`, `delay`, `auditTime`, `sampleTime`, `throttleTime`, `timeInterval`, `timeout`, `timeoutWith`, `windowTime`
all take a Scheduler as the last argument, and otherwise operate by default on the `asyncScheduler`.

Other instance operators that take a Scheduler as argument: `cache`, `combineLatest`, `concat`, `expand`, `merge`, `publishReplay`, `startWith`.

Notice that both `cache` and `publishReplay` accept a Scheduler because they utilize a ReplaySubject.
The constructor of a ReplaySubjects takes an optional Scheduler as the last argument because ReplaySubject may deal with time,
which only makes sense in the context of a Scheduler. By default, a ReplaySubject uses the `queue` Scheduler to provide a clock.
