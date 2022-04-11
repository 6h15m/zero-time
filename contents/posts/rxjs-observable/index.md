---
title: "RxJS Observable 번역"
description: "🇰🇷 RxJS Observable 공식 문서를 번역해보자!"
date: 2022-04-09
update: 2022-04-09
tags:
  - RxJS
  - Reactive Programming
series: "RxJS 공식 문서 번역"
---

## 프롤로그

안녕하세요! 제로입니다.
저번의 [RxJS 공식 문서 OVERVIEW 번역](https://6h15m.github.io/rxjs-overview/) 에 이어,
공식 문서 가이드의 [Observable](https://rxjs.dev/guide/observable) 문서를 번역해보려 합니다.

## Observable(옵저버블) 소개

옵저버블은 여러 값들에 대한 "Lazy Push" 콜렉션입니다.

|          | Single                                                                                             | Multiple                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Pull** | [`함수`](https://developer.mozilla.org/ko/docs/Glossary/Function)                                  | [`Iterator`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols) |
| **Push** | [`Promise`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise) | [`옵저버블`](/api/index/class/Observable)                                                        |

**예제.** 아래의 코드는 구독 즉시(동기적으로) `1`, `2`, `3`을 push하고,
구독 후 1초가 지났을 때 `4`를 push해 완료되는 옵저버블입니다.

```ts
import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
```

옵저버블을 호출해 값을 확인하려면, 이 옵저버블을 구독해야 합니다.

```ts
import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log("방금 구독되었어요!");
observable.subscribe({
  next(x) {
    console.log("값: " + x);
  },
  error(err) {
    console.error("문제가 발생했습니다: " + err);
  },
  complete() {
    console.log("완료!");
  },
});
console.log("구독 직후입니다!");
```

콘솔을 확인해보겠습니다.

```none
방금 구독되었어요!
값: 1
값: 2
값: 3
구독 직후입니다!
값: 4
완료!
```

## Pull vs Push

_Pull_ 과 _Push_ 는 데이터 _생산자_ 가 데이터 _소비자_ 와 통신하는 방법에 해당하는 두 가지 프로토콜입니다.

**Pull이란?** Pull 시스템에서는, 소비자가 데이터 생산자로부터 데이터를 받을 시기를 결정합니다.
생산자는 데이터가 소비자에게 언제 전달되는지 알지 못하죠.

모든 JavaScript 함수는 Pull 시스템입니다.
함수는 데이터 생산자이며, 함수를 호출하는 코드는 호출 시에 _하나의_ 리턴 값을 "pull"합니다.

ES2015에서는 Pull 시스템의 또 다른 형태인
[제너레이터 함수와 이터레이터](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*) (`function*`)가 등장했는데,
`iterator.next()`를 호출하는 코드는 소비자가 되어, 이터레이터(생산자)에서 _여러 개의_ 값을 "pull"하죠.

|          | 생산자                                  | 소비자                                  |
| -------- | --------------------------------------- | --------------------------------------- |
| **Pull** | **수동적:** 요청 시 데이터 생산         | **능동적:** 데이터가 요청되었을 때 결정 |
| **Push** | **능동적:** 자체적인 속도로 데이터 생산 | **수동적:** 수신된 데이터에 반응        |

**Push란?** Push 시스템에서는, 소비자에게 데이터를 보내는 타이밍을 생산자가 결정합니다.
소비자는 언제 데이터를 수신할지 알 수 없죠.

JavaScript에서 가장 흔하게 볼 수 있는 Push 시스템에는 Promise가 있습니다.
Promise(생산자)는 resolve된 값을 등록된 콜백 함수(소비자)에 전달합니다.
함수와는 달리, Promise가 값이 콜백에 "push"되는 시기를 결정하죠.

RxJS는 JavaScript를 위한 새로운 Push 시스템, 옵저버블을 도입했습니다. 옵저버블은 여러 값의 생산자이면서, 그 값들을 옵저버(소비자)에게 "push"합니다.

- **함수**는 호출 시 동기적으로 단일 값을 리턴하는 지연 평가 계산입니다.
- **제너레이터**는 호출 시 동기적으로 0부터 (잠재적으로) 무한대까지의 값들을 리턴하는 지연 평가 계산입니다.
- **Promise**는 단일 값을 리턴할 수도 있고 리턴하지 않을 수도 있는 계산입니다.
- **옵저버블**은 호출 시 동기적으로, 또는 비동기적으로 0부터 (잠재적으로) 무한대까지의 값들을 리턴하는 지연 평가 계산입니다.

> 옵저버블을 Promise로 변환하는 것에 대한 자세한 정보가 알고 싶으시다면, [이 가이드 문서](https://rxjs.dev/deprecations/to-promise) 를 참조해 주세요.

## 일반화된 함수로서의 옵저버블

일반적인 주장들과는 달리, 옵저버블은 EventEmitter나 여러 값을 다루기 위한 Promise와 같지 않습니다.
옵저버블은 때에 따라 EventEmitter _같은_ 역할을 수행할 수도 있지만, 일반적으로 EventEmitter처럼 작동하지는 않습니다.

> 옵저버블은 인수가 없는 함수와 같지만, 여러 값을 허용하도록 일반화합니다.

밑의 예제를 살펴봅시다.

```ts
function foo() {
  console.log("안녕!");
  return 42;
}

const x = foo.call(); // foo()와 같음
console.log(x);
const y = foo.call(); // foo()와 같음
console.log(y);
```

출력은 아마 이렇게 될 것입니다.

```none
"안녕!"
42
"안녕!"
42
```

옵저버블을 이용해 같은 동작을 구현해보겠습니다.

```ts
import { Observable } from "rxjs";

const foo = new Observable((subscriber) => {
  console.log("안녕!");
  subscriber.next(42);
});

foo.subscribe((x) => {
  console.log(x);
});
foo.subscribe((y) => {
  console.log(y);
});
```

똑같이 출력됩니다.

```none
"안녕!"
42
"안녕!"
42
```

이는 함수와 옵저버블 모두 지연 평가에 해당하기 때문입니다.
함수를 호출하지 않았다면, `console.log('안녕!')`은 발생하지 않았겠죠?
옵저버블에서도 마찬가지로 `subscribe`로 "호출"하지 않았다면 `console.log('안녕!')`은 발생하지 않았을 것입니다.

추가로, "호출"과 "구독"은 분리되어 있는 연산입니다. 두 개의 함수 호출은 두 개의 개별 사이트 이펙트를 유발하고, 두 개의 옵저버블 구독은 두 개의 개별 사이드 이펙트를 유발합니다.
사이드 이펙트를 공유하고 구독자의 존재와 관계없이 실행하는 EventEmitter와 달리, 옵저버블은 공유 실행 작업이 없으며 지연됩니다.

> 옵저버블을 구독하는 것은 함수를 호출하는 것과 유사합니다.

옵저버블이 비동기적이라고 생각하는 경우도 있지만, 그건 사실이 아닙니다.
다음과 같이 로그 안에서 함수를 호출해 봅시다.

```js
console.log("이전");
console.log(foo.call());
console.log("이후");
```

이렇게 출력되겠군요.

```none
"이전"
"안녕!"
42
"이후"
```

옵저버블로 구현해도 이 동작은 동일합니다.

```js
console.log("이전");
foo.subscribe((x) => {
  console.log(x);
});
console.log("이후");
```

출력은 이렇습니다.

```none
"이전"
"안녕!"
42
"이후"
```

이는 `foo` 옵저버블의 구독이 완벽히 동기적이라는 것을 증명하죠.(마치 함수처럼요!)

> 옵저버블은 값을 동기적으로, 또는 비동기적으로 전달할 수 있습니다.

옵저버블과 함수의 차이점은 무엇일까요? **옵저버블은 시간이 지남에 따라 여러 개의 값을 "리턴"할 수 있습니다.** 함수에선 불가능한 작업이죠. 

```js
function foo() {
  console.log("안녕!");
  return 42;
  return 100; // 절대 발생할 수 없는 죽은 코드입니다.
}
```

Functions can only return one value. Observables, however, can do this:

```ts
import { Observable } from "rxjs";

const foo = new Observable((subscriber) => {
  console.log("안녕!");
  subscriber.next(42);
  subscriber.next(100); // 다른 값을 "리턴"
  subscriber.next(200); // 또 다른 "리턴"
});

console.log("이전");
foo.subscribe((x) => {
  console.log(x);
});
console.log("이후");
```

동기적으로 출력된 것을 보죠.

```none
"이전"
"안녕!"
42
100
200
"이후"
```

물론, 값들을 비동기적으로 "리턴"할 수도 있습니다.

```ts
import { Observable } from "rxjs";

const foo = new Observable((subscriber) => {
  console.log("안녕!");
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => {
    subscriber.next(300); // happens asynchronously
  }, 1000);
});

console.log("이전");
foo.subscribe((x) => {
  console.log(x);
});
console.log("이후");
```

출력은 아래와 같습니다.

```none
"이전"
"안녕!"
42
100
200
"이후"
300
```

정리:

- `func.call()`은 "_동기적으로 하나의 값을 주세요_"를 의미합니다.
- `observable.subscribe()`는 "_동기적으로든 비동기적으로든 개수 상관없이 값을 주세요_"를 의미합니다.

## Anatomy of an Observable

Observables are **created** using `new Observable` or a creation operator, are **subscribed** to with an Observer, **execute** to deliver `next` / `error` / `complete` notifications to the Observer, and their execution may be **disposed**. These four aspects are all encoded in an Observable instance, but some of these aspects are related to other types, like Observer and Subscription.

Core Observable concerns:

- **Creating** Observables
- **Subscribing** to Observables
- **Executing** the Observable
- **Disposing** Observables

### Creating Observables

The `Observable` constructor takes one argument: the `subscribe` function.

The following example creates an Observable to emit the string `'hi'` every second to a subscriber.

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next("hi");
  }, 1000);
});
```

<span class="informal">Observables can be created with `new Observable`. Most commonly, observables are created using creation functions, like `of`, `from`, `interval`, etc.</span>

In the example above, the `subscribe` function is the most important piece to describe the Observable. Let's look at what subscribing means.

### Subscribing to Observables

The Observable `observable` in the example can be _subscribed_ to, like this:

```ts
observable.subscribe((x) => console.log(x));
```

It is not a coincidence that `observable.subscribe` and `subscribe` in `new Observable(function subscribe(subscriber) {...})` have the same name. In the library, they are different, but for practical purposes you can consider them conceptually equal.

This shows how `subscribe` calls are not shared among multiple Observers of the same Observable. When calling `observable.subscribe` with an Observer, the function `subscribe` in `new Observable(function subscribe(subscriber) {...})` is run for that given subscriber. Each call to `observable.subscribe` triggers its own independent setup for that given subscriber.

<span class="informal">Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.</span>

This is drastically different to event handler APIs like `addEventListener` / `removeEventListener`. With `observable.subscribe`, the given Observer is not registered as a listener in the Observable. The Observable does not even maintain a list of attached Observers.

A `subscribe` call is simply a way to start an "Observable execution" and deliver values or events to an Observer of that execution.

### Executing Observables

The code inside `new Observable(function subscribe(subscriber) {...})` represents an "Observable execution", a lazy computation that only happens for each Observer that subscribes. The execution produces multiple values over time, either synchronously or asynchronously.

There are three types of values an Observable Execution can deliver:

- "Next" notification: sends a value such as a Number, a String, an Object, etc.
- "Error" notification: sends a JavaScript Error or exception.
- "Complete" notification: does not send a value.

"Next" notifications are the most important and most common type: they represent actual data being delivered to a subscriber. "Error" and "Complete" notifications may happen only once during the Observable Execution, and there can only be either one of them.

These constraints are expressed best in the so-called _Observable Grammar_ or _Contract_, written as a regular expression:

```none
next*(error|complete)?
```

<span class="informal">In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.</span>

The following is an example of an Observable execution that delivers three Next notifications, then completes:

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
```

Observables strictly adhere to the Observable Contract, so the following code would not deliver the Next notification `4`:

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // Is not delivered because it would violate the contract
});
```

It is a good idea to wrap any code in `subscribe` with `try`/`catch` block that will deliver an Error notification if it catches an exception:

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```

### Disposing Observable Executions

Because Observable Executions may be infinite, and it's common for an Observer to want to abort execution in finite time, we need an API for canceling an execution. Since each execution is exclusive to one Observer only, once the Observer is done receiving values, it has to have a way to stop the execution, in order to avoid wasting computation power or memory resources.

When `observable.subscribe` is called, the Observer gets attached to the newly created Observable execution. This call also returns an object, the `Subscription`:

```ts
const subscription = observable.subscribe((x) => console.log(x));
```

The Subscription represents the ongoing execution, and has a minimal API which allows you to cancel that execution. Read more about the [`Subscription` type here](./guide/subscription). With `subscription.unsubscribe()` you can cancel the ongoing execution:

```ts
import { from } from "rxjs";

const observable = from([10, 20, 30]);
const subscription = observable.subscribe((x) => console.log(x));
// Later:
subscription.unsubscribe();
```

<span class="informal">When you subscribe, you get back a Subscription, which represents the ongoing execution. Just call `unsubscribe()` to cancel the execution.</span>

Each Observable must define how to dispose resources of that execution when we create the Observable using `create()`. You can do that by returning a custom `unsubscribe` function from within `function subscribe()`.

For instance, this is how we clear an interval execution set with `setInterval`:

```js
const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next("hi");
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```

Just like `observable.subscribe` resembles `new Observable(function subscribe() {...})`, the `unsubscribe` we return from `subscribe` is conceptually equal to `subscription.unsubscribe`. In fact, if we remove the ReactiveX types surrounding these concepts, we're left with rather straightforward JavaScript.

```js
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next("hi");
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({ next: (x) => console.log(x) });

// Later:
unsubscribe(); // dispose the resources
```

The reason why we use Rx types like Observable, Observer, and Subscription is to get safety (such as the Observable Contract) and composability with Operators.
