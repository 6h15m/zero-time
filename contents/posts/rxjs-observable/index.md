---
title: "[번역] RxJS 공식 문서 #Observable"
description: "🇰🇷 Observable, 너는 누구냐-"
date: 2022-04-11 04:00:00
update: 2022-04-11 04:00:00
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
| **Push** | [`Promise`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise) | [`옵저버블`](https://rxjs.dev/api/index/class/Observable)                                        |

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

**Pull이란?** Pull 시스템에서는, 소비자가 데이터 생산자로부터 데이터를 받을 타이밍을 결정합니다.
즉, 생산자는 데이터가 소비자에게 언제 전달되는지 알지 못하죠.

모든 JavaScript 함수는 Pull 시스템입니다.
함수는 데이터 생산자이며, 함수를 호출하는 코드는 호출 시 _하나의_ 리턴 값을 "pull"합니다.

ES2015에서는 Pull 시스템의 또 다른 형태인
[제너레이터 함수와 이터레이터](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*) (`function*`)가 등장했습니다.
이 개념에서는 `iterator.next()`를 호출하는 코드(소비자)가 이터레이터(생산자)에서 _여러 개_ 의 값을 "pull"합니다.

|          | 생산자                             | 소비자                                      |
| -------- | ---------------------------------- | ------------------------------------------- |
| **Pull** | **수동적:** 요청 시 데이터 생산    | **능동적:** 데이터를 요청하는 타이밍을 결정 |
| **Push** | **능동적:** 자체적으로 데이터 생산 | **수동적:** 전달받은 데이터에 반응          |

**Push란?** Push 시스템에서는, 소비자에게 데이터를 보내는 타이밍을 생산자가 결정합니다.
즉, 소비자는 언제 데이터를 전달받을지 알 수 없죠.

JavaScript에서 가장 흔하게 볼 수 있는 Push 시스템에는 Promise가 있습니다.
Promise(생산자)는 resolve된 값을 등록된 콜백 함수(소비자)에 전달합니다.
함수와는 달리, Promise 자체적으로 값이 콜백에 "push"되는 시기를 결정하죠.

RxJS는 JavaScript를 위한 새로운 Push 시스템, 옵저버블을 도입했습니다.
옵저버블은 여러 값들을 생산해, 그 값들을 옵저버(소비자)에게 "push"합니다.

- **함수**는 호출 시 단일 값을 동기적으로 리턴하는 지연 평가 계산입니다.
- **제너레이터**는 호출 시 0부터 (잠재적으로) 무한대까지의 값들을 동기적으로 리턴하는 지연 평가 계산입니다.
- **Promise**는 단일 값을 리턴할 수도 있고 리턴하지 않을 수도 있는 계산입니다.
- **옵저버블**은 호출 시 0부터 (잠재적으로) 무한대까지의 값들을 동기적으로, 또는 비동기적으로 리턴하는 지연 평가 계산입니다.

> 옵저버블을 Promise로 변환하는 것에 대한 자세한 정보가 알고 싶으시다면, [이 가이드 문서](https://rxjs.dev/deprecations/to-promise) 를 참조해 주세요.

## 함수와 옵저버블

옵저버블은 EventEmitter나 여러 값을 다루는 Promise와 같지 않습니다.
옵저버블은 때에 따라 EventEmitter _같은_ 역할을 수행할 수도 있지만, 일반적으로 EventEmitter처럼 작동하지는 않습니다.

> 옵저버블은 인수 없는 함수이지만, 여러 값을 허용하도록 인수들을 일반화합니다.
>
> ~~역: 무슨 말인지 저도 이해 못 함~~

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

추가적으로, "호출"과 "구독"은 분리되어 있는 연산입니다.
두 개의 함수 호출은 두 개의 개별 사이트 이펙트를 유발하고,
두 개의 옵저버블 구독은 두 개의 개별 사이드 이펙트를 유발합니다.
사이드 이펙트를 공유하며 구독자의 존재와 관계없이 실행하는 EventEmitter와 달리,
옵저버블은 실행을 공유하지 않으며 지연적으로 동작합니다.

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

함수는 오직 하나의 값만 리턴할 수 있지요. 하지만 옵저버블은, 이렇게 할 수 있습니다.

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

- `func.call()`은 _동기적으로 하나의 값을 주는 것_ 을 의미합니다.
- `observable.subscribe()`는 _동기적으로든 비동기적으로든 개수 상관없이 값을 주는 것_ 을 의미합니다.

## 옵저버블의 구석구석

옵저버블은 `new Observable`이나 생성 연산자를 통해 **생성**되며,
옵저버를 통해 **구독**되며,
옵저버에게 `next` / `error` / `complete` 알림을 전달하기 위해 **실행**되며,
이 실행은 **해제**될 수 있습니다.
이 4가지 동작들은 모두 옵저버블 인스턴스로 인코딩되지만,
일부는 옵저버 또는 구독과 같은 다른 타입과 관련되어 있습니다.

아래는 옵저버블의 핵심 기능들입니다.

- 옵저버블 **생성**
- 옵저버블 **구독**
- 옵저버블 **실행**
- 옵저버블 **해제**

### 옵저버블 생성

`Observable` 생성자는 하나의 인수, `subscribe` 함수만을 취합니다.

초당 한 번씩 구독자에게 `'안녕!'`문자열을 내보내는 옵저버블을 구현해 보겠습니다.

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next("안녕!");
  }, 1000);
});
```

> 일반적으로는 생성 함수(예: `of`, `from`, `interval` 등)를 이용하지만,
> `new Observable`을 이용해서도 옵저버블을 생성할 수 있습니다.

위의 예제에서, `subscribe` 함수는 옵저버블을 설명하는 데 있어 가장 중요한 부분입니다. 이 "구독"이 무엇을 의미하는지 살펴봅시다.

### 옵저버블 구독

예제의 `observable` 옵저버블은 이렇게 _구독_ 될 수 있습니다.

```ts
observable.subscribe((x) => console.log(x));
```

`observable.subscribe`와 `new Observable(function subscribe(subscriber) {...})`의 `subscribe`가 같은 이름을 가진 건 우연이 아닙니다.
이 둘은 라이브러리 내부에서는 다르지만, 개념적으로 동일하다고 생각할 수 있습니다.

이는 동일한 옵저버블에 대한 여러 개의 옵저버들 사이에서 `subscribe` 호출이 공유되지 않는다는 것을 보여줍니다.
옵저버를 통해 `observable.subscribe`를 호출할 때, 해당 구독자에 대해 `new Observable(function subscribe(subscriber) {...})`의 `subscribe` 함수가 실행됩니다.
`observable.subscribe`에 대한 각 호출은 해당 구독자에 대해 자체적으로 독립된 기반을 발생시킵니다.

> 옵저버블을 구독하는 것은 함수를 호출하여, 데이터가 전달될 콜백을 제공하는 것과 같습니다.

이는 `addEventListener` / `removeEventListener`와 같은 이벤트 핸들러 API와 확연히 차이가 있습니다.
`observable.subscribe`에서, 주어진 옵저버는 옵저버블의 리스너로 등록되지 았습니다.
옵저버블은 등록된 옵저버들의 목록도 갖고 있지 않죠.

`subscribe` 호출은 단순히 "옵저버블의 실행"을 시작하고 이 실행의 옵저버에게 값이나 이벤트를 전달할 뿐입니다.

### 옵저버블 실행

`new Observable(function subscribe(subscriber) {...})` 내부의 코드는 "옵저버블의 실행", 즉 구독한 각 옵저버에서만 발생하는 지연 평가를 나타냅니다.
이 실행은 시간에 지남에 따라 동기적으로, 또는 비동기적으로 여러 값들을 생산합니다.

옵저버블의 실행이 전달할 수 있는 3가지 타입의 값이 있습니다.

- "Next" 알림: 숫자, 문자열, 객체 등의 값들을 전송합니다.
- "Error" 알림: JavaScript Error 또는 예외를 전송합니다.
- "Complete" 알림: 값을 내보내지 않습니다.

"Next" 알림은 가장 중요하고 자주 쓰이는 타입으로, 구독자에게 전달되는 실제 데이터를 나타냅니다. "Error"와 "Complete" 알림은 옵저버블 실행 중 한 번만 발생할 수 있으며, 둘 중 하나만 발생할 수 있습니다.

이러한 제약 조건은 정규 표현식으로 작성된 _옵저버블 문법_ 또는 _약속_ 으로 가장 잘 표현할 수 있습니다.

```none
next*(error|complete)?
```

> 옵저버블 실행에서, 0에서 무한대 개수의 Next 알림이 전달될 수 있습니다. Error 또는 Complete 알림이 전달되면, 이후에는 아무것도 전달할 수 없습니다.

3개의 Next 알림을 전달하고, 완료되는 옵저버블 실행 예제를 보겠습니다.

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
```

옵저버블 약속은 엄격히 준수되므로, 다음 코드는 Next 알림 `4`를 전달하지 않습니다.

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // 약속에 위반되므로 전달되지 않습니다.
});
```

`subscribe` 내부의 코드에서 예외 발생 시 Error 알림이 전달되게끔 `try`/`catch` 블록으로 감싸는 것도 좋은 방법입니다.

```ts
import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // 예외가 발생되면 에러 전달
  }
});
```

### 옵저버블 해제

옵저버블은 무한하게 실행될 수 있으며, 옵저버는 일반적으로 제한된 시간 내에 실행을 중단하길 원하기 때문에, 실행을 취소하기 위한 API가 필요합니다.
각 실행은 하나의 옵저버에만 독점적이므로, 옵저버가 값 수신을 완료하면 연산 또는 메모리 리소스를 낭비하지 않도록 실행을 중지할 수 있는 방법이 있어야 하죠.

`observable.subscribe`가 호출되면, 옵저버는 새로 생성된 옵저버블 실행과 연결됩니다.
이 호출은 `Subscription`이라는 객체도 리턴하죠.

```ts
const subscription = observable.subscribe((x) => console.log(x));
```

`Subscription`은 진행 중인 실행을 나타내며, 실행을 취소할 수 있는 API를 가지고 있습니다.
`Subscription` 타입에 대한 자세한 내용은 [여기](https://rxjs.dev/guide/subscription) 를 참조하세요.
`subscription.unsubscribe()`로 진행 중인 실행을 취소할 수 있습니다.

```ts
import { from } from "rxjs";

const observable = from([10, 20, 30]);
const subscription = observable.subscribe((x) => console.log(x));
// 나중에는-
subscription.unsubscribe();
```

> 구독하면 현재 진행 중인 실행을 나타내는 Subscription을 반환하며, 이 객체의 `unsubscribe()`를 호출해 실행을 취소할 수 있습니다.

`create()`를 이용해 옵저버블을 생성할 때, 각 옵저버블은 해당 실행의 리소스를 해제하는 방법을 정의해야 합니다.
`function subscribe()` 내부의 커스텀 `unsubscribe` 함수를 리턴하는 방식으로 이를 정의할 수 있죠.

`setInterval`을 이용한 예제를 보겠습니다.

```js
const observable = new Observable(function subscribe(subscriber) {
  // 인터벌 리소스에 대한 추적
  const intervalId = setInterval(() => {
    subscriber.next("안녕!");
  }, 1000);

  // 인터벌 리소스를 취소하고 해제하는 방법 정의
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```

`observable.subscribe`가 `new Observable(function subscribe() {...})`과 유사하듯이,
`subscribe`에서 리턴한 `unsubscribe`는 개념적으로 `subscription.unsubscribe`와 유사합니다.
사실, 이러한 개념들을 둘러싼 ReactiveX 타입들을 제거하면 매우 간단한 JavaScript 코드만이 남습니다.

```js
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next("안녕!");
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({ next: (x) => console.log(x) });

// 나중에는-
unsubscribe(); // 리소스 해제
```

옵저버블, 옵저버, 구독과 같은 Rx 타입들을 사용하는 이유는 안정성(예: 옵저버블 약속)과 연산자와의 결합성을 얻기 위해서입니다.
