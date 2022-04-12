---
title: "[번역] RxJS 공식 문서 #Subject"
description: "🇰🇷 옵저버블 동생 Subject에 대해 알아보자-"
date: 2022-04-12 18:00:00
update: 2022-04-12 18:00:00
tags:
  - RxJS
  - Reactive Programming
series: "RxJS 공식 문서 번역"
---

## 프롤로그

안녕하세요! 제로입니다.
이번에 번역해본 문서는 특별한 옵저버블인 [Subject 가이드](https://rxjs.dev/guide/subject) 입니다.
여러 형태를 가지고 있는 다양한 Subject들을 함께 배워봅시다!

## Subject 소개

**Subject**는 여러 옵저버에 값을 멀티캐스팅할 수 있는 특별한 옵저버블입니다.
일반 옵저버블이 유니캐스트(구독한 옵저버는 옵저버블의 독립적인 실행을 갖는 방식)라면, Subject는 멀티캐스트입니다.

> Subject는 많은 옵저버에 멀티캐스팅할 수 있는 옵저버블입니다. EventEmitter처럼 여러 리스너의 등록을 유지하죠.

**모든 Subject는 옵저버블입니다.** Subject가 주어지면 이를 `구독`할 수 있으며, 옵저버를 제공할 수 있습니다.
옵저버는 옵저버블 실행이 일반 유니캐스트 옵저버블에서 왔는지, 혹은 Subject에서 왔는지 구분할 수 없습니다.

Subject 내부적으로 `구독`은 값을 전달하는 새 실행을 호출하지 않습니다.
일반적으로 다른 라이브러리나 언어에서 `addListener`가 작동하는 방식과 유사하게, 주어진 옵저버를 옵저버 목록에 등록할 뿐이죠.

**모든 Subject는 옵저버입니다.** Subject는 `next(v)`, `error(e)`, `complete()` 메소드를 가진 객체입니다.
Subject에 새로운 값을 입력하려고 `next(theValue)`를 호출하면, Subject에 등록된 옵저버들에 멀티캐스팅됩니다.

예시로, 두 옵저버가 등록된 Subject에 몇 가지 값을 입력해 보겠습니다.

```ts
import { Subject } from "rxjs";

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`옵저버A: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`옵저버B: ${v}`),
});

subject.next(1);
subject.next(2);

// 로그:
// 옵저버A: 1
// 옵저버B: 1
// 옵저버A: 2
// 옵저버B: 2
```

Subject는 옵저버이기 때문에, 옵저버블의 `subscribe` 메소드 인수로 Subject를 전달할 수도 있습니다. 아래의 예시처럼요!

```ts
import { Subject, from } from "rxjs";

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`옵저버A: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`옵저버B: ${v}`),
});

const observable = from([1, 2, 3]);

observable.subscribe(subject); // Subject를 전달해 구독해봅시다!

// 로그:
// 옵저버A: 1
// 옵저버B: 1
// 옵저버A: 2
// 옵저버B: 2
// 옵저버A: 3
// 옵저버B: 3
```

위의 접근 방식에서, 우리는 개념적으로 Subject를 통해 유니캐스트 옵저버블 실행을 멀티캐스트로 변환했습니다.
이는 옵저버블 실행을 여러 옵저버에게 공유하는 유일한 방법이 Subject임을 증명합니다.

몇 가지 특별한 `Subject`에는 `BehaviorSubject`, `ReplaySubject`, `AsyncSubject`가 있습니다.

## 멀티캐스트 옵저버블

"멀티캐스트 옵저버블"은 많이 구독된 Subject를 통해 알림을 전달하지만, 일반 유니캐스트 옵저버블은 단일 옵저버에게만 알림을 보냅니다.

> 멀티캐스트된 옵저버블은 내부적으로 Subject를 사용해 여러 옵저버가 동일한 옵저버블 실행을 바라보게 합니다.

`multicast` 연산자의 내부적인 작동을 살펴보겠습니다.
옵저버들은 초기 Subject를 구독하고, 그 Subject는 소스 옵저버블을 구독합니다.
`observable.subscribe(subject)`를 사용한 위의 예제와 유사한 예제를 보겠습니다.

```ts
import { from, Subject, multicast } from "rxjs";

const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));

// 이 코드들은 내부적으로 `subject.subscribe({...})`입니다.
multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

// 이 코드는 내부적으로 `source.subscribe(subject)`입니다.
multicasted.connect();
```

`multicast`는 일반 옵저버블처럼 보이지만, 구독에 있어서는 Subject처럼 작동하는 옵저버블, `connect()` 메소드를 가진 옵저버블인 `ConnectableObservable`을 반환합니다.

`connect()` 메소드는 옵저버블 실행이 시작되는 타이밍을 정확하게 결정하는 데 있어 매우 중요합니다.
`connect()`가 내부적으로 `source.subscribe(subject)`를 실행하면, `connect()`가 공유된 옵저버블 실행을 취소할 수 있는 구독을 리턴하기 때문이죠.

### Reference counting(참조 카운팅)

`connect()`를 수동으로 호출해 구독을 다루는 건 꽤 번거롭습니다.
일반적으로는, 첫 번째 옵저버가 도착하면 _자동으로_ 연결하고, 마지막 옵저버가 구독을 취소하면 자동으로 공유된 실행을 취소하는 구현이 필요하겠죠?

아래의 목록처럼 구독이 발생하는 상황을 생각해 봅시다.

1. 첫 번째 옵저버가 멀티캐스트 옵저버블을 구독합니다.
2. **멀티캐스트 옵저버블이 연결되었습니다.**
3. `next` 값인 `0`이 첫 번째 옵저버에 전달됩니다.
4. 두 번째 옵저버가 멀티캐스트 옵저버블을 구독합니다.
5. `next` 값인 `1`이 첫 번째 옵저버에 전달됩니다.
6. `next` 값인 `1`이 두 번째 옵저버에 전달됩니다.
7. 첫 번째 옵저버가 멀티캐스트 옵저버블을 구독 취소합니다.
8. `next` 값인 `2`이 두 번째 옵저버에 전달됩니다.
9. 두 번째 옵저버가 멀티캐스트 옵저버블을 구독 취소합니다.
10. **멀티캐스트 옵저버블에 대한 연결이 구독 취소됩니다.**

이를 `connect()`를 명시적으로 호출하는 코드로 작성해 봅시다.

```ts
import { interval, Subject, multicast } from "rxjs";

const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
// `multicasted`의 첫 번째 구독자가 값을 소비하기 때문에,
// 여기서 `connect()`를 호출해야 합니다.
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// `multicasted`는 이 코드 이후 더 이상의 구독자가 없을 것이기 때문에,
// 여기서 공유된 옵저버블 실행을 구독 취소해야 합니다.
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // 공유된 옵저버블 실행을 대상으로 함
}, 2000);
```

`connect()`를 명시적으로 호출하지 않고 구현하려면, ConnectableObservable의 `refCount()` 메소드(참조 카운팅)를 사용할 수 있습니다.
이 메소드는 구독자의 수를 추적하는 옵저버블을 리턴합니다.
구독자 수가 `0`에서 `1`로 증가하면 공유된 실행을 시작하는 `connect()`를 호출하고,
구독자 수가 `1`에서 `0`으로 감소하면 완전히 구독 취소되었다고 판단해 추가 실행을 중단합니다.

> `refCount`는 첫 번째 구독자가 도착하면 멀티캐스트된 옵저버블의 실행을 자동으로 시작하고,
> 마지막 구독가 떠나면 실행을 중지시킵니다.

예시를 살펴보겠습니다.

```ts
import { interval, Subject, multicast, refCount } from "rxjs";

const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(multicast(subject), refCount());
let subscription1, subscription2;

// 아래 코드는 `refCounted`의 첫 번째 구독자이기 때문에,
// `connect()`를 호출합니다.
console.log("옵저버A 구독");
subscription1 = refCounted.subscribe({
  next: (v) => console.log(`옵저버A: ${v}`),
});

setTimeout(() => {
  console.log("옵저버B 구독");
  subscription2 = refCounted.subscribe({
    next: (v) => console.log(`옵저버B: ${v}`),
  });
}, 600);

setTimeout(() => {
  console.log("옵저버A 구독 취소");
  subscription1.unsubscribe();
}, 1200);

// 이 코드 이후에 `refCounted`의 구독자는 더 이상 없을 것이기 때문에,
// 공유된 옵저버블 실행이 멈출 것입니다.
setTimeout(() => {
  console.log("옵저버B 구독 취소");
  subscription2.unsubscribe();
}, 2000);

// 로그:
// 옵저버A 구독
// 옵저버A: 0
// 옵저버B 구독
// 옵저버A: 1
// 옵저버B: 1
// 옵저버A 구독 취소
// 옵저버B: 2
// 옵저버B 구독 취소
```

`refCount()` 메소드는 ConnectableObservable에만 존재하며, 또 다른 ConnectableObservable이 아니라 `Observable`을 리턴합니다.

## BehaviorSubject

특별한 Subject 중 하나인 `BehaviorSubject`는 "현재 값"이라는 개념이 있습니다.
가장 마지막으로 배출된 값을 저장해, 새로운 옵저버가 구독할 때마다 즉시 해당 옵저버에 "현재 값"을 전달하죠.

> BehaviorSubject는 "시간 경과에 따른 값"을 표현할 때 유용합니다.
> 생일 스트림을 Subject로 구현한다면, 나이 스트림은 BehaviorSubject로 구현합니다.

다음 예제에서, BehaviorSubject는 `0`으로 초기화됩니다. 이는 첫 번째 옵저버가 구독할 때 옵저버에 전달되는 값이기도 하죠.
두 번째 옵저버는 `2`가 방출된 이후에 구독했는데도 값 `2`를 전달받습니다.

```ts
import { BehaviorSubject } from "rxjs";
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`옵저버A: ${v}`),
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`옵저버B: ${v}`),
});

subject.next(3);

// 로그:
// 옵저버A: 0
// 옵저버A: 1
// 옵저버A: 2
// 옵저버B: 2
// 옵저버A: 3
// 옵저버B: 3
```

## ReplaySubject

`ReplaySubject`는 이전의 값을 새 구독자에게 전달할 수 있다는 점에서 `BehaviorSubject`와 비슷하지만,
옵저버블 실행의 일부분을 _기록_ 할 수 있습니다.

> `ReplaySubject`는 옵저버블 실행에서 여러 값들을 기록해 새 구독자에게 다시 전달합니다.

`ReplaySubject`를 생성할 때, 몇 개의 값을 다시 전달할지 지정할 수 있습니다.

```ts
import { ReplaySubject } from "rxjs";
const subject = new ReplaySubject(3); // 새 구독자에게 전달할 값을 3개 버퍼

subject.subscribe({
  next: (v) => console.log(`옵저버A: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`옵저버B: ${v}`),
});

subject.next(5);

// 로그:
// 옵저버A: 1
// 옵저버A: 2
// 옵저버A: 3
// 옵저버A: 4
// 옵저버B: 2
// 옵저버B: 3
// 옵저버B: 4
// 옵저버A: 5
// 옵저버B: 5
```

또, 버퍼 크기 외에 밀리초 단위로 _시간_ 을 지정하여 기록될 값의 수를 지정할 수 있습니다.
아래의 예제에서는 버퍼 크기를 크게(`100`) 지정했지만, 시간 파라미터로 딱 `500` 밀리초만 지정해두었습니다.

```ts
import { ReplaySubject } from "rxjs";
const subject = new ReplaySubject(100, 500 /* 시간 */);

subject.subscribe({
  next: (v) => console.log(`옵저버A: ${v}`),
});

let i = 1;
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`옵저버B: ${v}`),
  });
}, 1000);

// 로그:
// 옵저버A: 1
// 옵저버A: 2
// 옵저버A: 3
// 옵저버A: 4
// 옵저버A: 5
// 옵저버B: 3
// 옵저버B: 4
// 옵저버B: 5
// 옵저버A: 6
// 옵저버B: 6
// ...
```

## AsyncSubject

AsyncSubject는 실행이 완료되었을 때, 옵저버블 실행의 마지막 값만 옵저버에게 전달됩니다.

```js
import { AsyncSubject } from "rxjs";
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`옵저버A: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`옵저버B: ${v}`),
});

subject.next(5);
subject.complete();

// 로그:
// 옵저버A: 5
// 옵저버B: 5
```

AsyncSubject는 하나의 값을 전달하기 위해 `complete` 알림을 기다린다는 점에서 [`last()`](https://rxjs.dev/api/operators/last) 연산자와 유사합니다.

## Void Subject(리턴 없는 Subject)

가끔은 방출 된 값보다, 값이 방출되었다는 사실 자체가 더 중요한 상황이 존재합니다.

아래의 코드는 1초가 지났음을 알립니다.

```ts
const subject = new Subject<string>();
setTimeout(() => subject.next("더-미"), 1000);
```

더미 값을 전달하는 위의 방식은 서툴고 혼란스러워 보이네요.

_리턴 없는 Subject_ 를 선언하면, 부적합한 값에 대한 신호만을 보낼 수 있습니다. 이벤트 자체만 중요한 거죠.

```ts
const subject = new Subject<void>();
setTimeout(() => subject.next(), 1000);
```

전체 예제도 한 번 보겠습니다.

```ts
import { Subject } from "rxjs";

const subject = new Subject(); // Subject<void>의 약칭

subject.subscribe({
  next: () => console.log("1초가 지났어요!"),
});

setTimeout(() => subject.next(), 1000);
```

> 버전 7 이전에는, Subject 값의 기본 타입이 `any`였습니다.
> `Subject<any>`는 방출된 값의 타입 체킹을 비활성화하고,
> `Subject<void>`는 방출된 값에 실수로 접근하는 것을 방지합니다.
> 이전의 동작대로 사용하고 싶다면, `Subject`를 `Subject<any>`로 대체하세요.
