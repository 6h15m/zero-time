---
title: "[번역] RxJS 공식 문서 #OVERVIEW"
description: "🇰🇷 RxJS가 뭐예요?"
date: 2022-04-06
update: 2022-04-06
tags:
  - RxJS
  - Reactive Programming
series: "RxJS 공식 문서 번역"
---

## 프롤로그

안녕하세요! 제로입니다.
최근 RxJS를 사용할 일이 생겨 열심히 학습하던 중, [Learn RxJS](https://www.learnrxjs.io/) 라는 문서를 발견해 번역해보고 있었어요.
공식 문서보다 조금 더 알기 쉽게 설명되어 있는 것 같아 학습에 큰 도움이 되었지만,
v6 이후로 업데이트되지 않아 deprecated 된 자료들이 꽤 많았습니다.

[저희의 Learn RxJS](https://chasethestar.gitbook.io/ko.learn-rxjs) 가 정확한 학습 자료로 거듭나려면
**공식 문서를 먼저 학습해야겠다**는 판단이 생기게 되었고, [OVERVIEW](https://rxjs.dev/guide/overview)에 해당하는 영역부터 번역~~의역~~해나가 보려고 합니다.

## RxJS 소개

RxJS는 [Observable(옵저버블)](https://6h15m.github.io/rxjs-observable) 시퀀스를 이용해 비동기 및 이벤트 기반 프로그램을 구성하기 위한 라이브러리입니다.
옵저버블, 옵저버블에 종속되는 타입들(Observer, Schedulers, Subjects),
`Array` 메소드(`map`, `filter`, `reduce`, `every` 등)에서 영감받은 Operator(연산자)를 제공하여
비동기 이벤트를 콜렉션처럼 다룰 수 있게 하죠.

> 이벤트 처리를 위한 Lodash, **RxJS**

ReactiveX는 이벤트 시퀀스를 관리하는 이상적인 방법으로 [옵저버 패턴](https://en.wikipedia.org/wiki/Observer_pattern),
[이터레이터 패턴](https://en.wikipedia.org/wiki/Iterator_pattern),
[콜렉션을 다루는 함수형 프로그래밍](http://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions) 을 결합하는 것을 택했습니다.

### 비동기 이벤트를 관리하는 RxJS의 필수 개념

- **Observable** - `옵저버블`: 호출 가능한 미래의 값 또는 이벤트에 대한 집합
- **Observer** - `옵저버`: 옵저버블이 제공하는 값을 소비할 수 있는 콜백 함수의 집합
- **Subscription** - `구독`: 옵저버블의 실행
- **Operators** - `연산자`: `map`, `filter`, `concat`, `reduce` 같은 연산으로 컬렉션을 처리(함수형 프로그래밍 스타일)하는 순수함수
- **Subject** - `서브젝트`: EventEmitter와 동일하게, 값 또는 이벤트를 여러 옵저버에 멀티캐스팅할 수 있게 하는 옵저버블의 한 종류
- **Schedulers** - `스케쥴러`: 동시성을 제어하는 중앙 집중적인 스케쥴러(예: `setTimeout` 또는 `requestAnimationFrame` 등의 연산이 발생했을 때 조정이 가능하게 함)

## 예제로 알아보는 RxJS

보통은, 이벤트 리스너를 등록하죠.

```ts
document.addEventListener("click", () => console.log("클릭하셨네요!"));
```

RxJS를 사용한다면 이벤트 리스너 대신 옵저버블을 생성합니다.

```ts
import { fromEvent } from "rxjs";

fromEvent(document, "click").subscribe(() => console.log("클릭하셨네요!"));
```

### 순수성

RxJS가 강력한 이유는 순수함수를 이용해 값을 생성할 수 있기 때문입니다.
이는 오류가 발생할 가능성이 낮다는 뜻이죠.

일반적으로 우리는 '순수하지 않은', 다른 상태까지 망칠 수 있는 함수를 생성합니다.

```ts
let count = 0;
document.addEventListener("click", () =>
  console.log(`${++count}번이나 클릭하셨군요!`),
);
```

RxJS를 사용한다면 상태는 서로 격리됩니다.

```ts
import { fromEvent, scan } from "rxjs";

fromEvent(document, "click")
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`${count}번이나 클릭하셨군요!`));
```

**scan** 연산자는 배열의 **reduce**와 유사하게 동작해,
리턴된 콜백 함수의 값은 다음 콜백 함수의 매개 변수가 됩니다.

### 유동성

RxJS의 연산자들은 옵저버블을 통과하는 이벤트들의 흐름을 제어합니다. (종류도 다양하죠!)

Plain JavaScript로 초당 최대 한 번으로 클릭을 제한하는 기능을 구현해보겠습니다.

```ts
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener("click", () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`${++count}번 클릭하셨어요!`);
    lastClick = Date.now();
  }
});
```

RxJS로도 구현해볼게요.

```ts
import { fromEvent, throttleTime, scan } from "rxjs";

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0),
  )
  .subscribe((count) => console.log(`${count}번 클릭하셨어요!`));
```

다른 흐름 제어 연산자에는 [**filter**](https://rxjs.dev/api/operators/filter),
[**delay**](https://rxjs.dev/api/operators/delay),
[**debounceTime**](https://rxjs.dev/api/operators/debounceTime),
[**take**](https://rxjs.dev/api/operators/take),
[**takeUntil**](https://rxjs.dev/api/operators/takeUntil),
[**distinct**](https://rxjs.dev/api/operators/distinct),
[**distinctUntilChanged**](https://rxjs.dev/api/operators/distinctUntilChanged) 등이 있습니다.

### 값

RxJS에서는 옵저버블을 통과하는 값들을 변환할 수 있습니다.

Plain JavaScript로 클릭할 때마다 현재 마우스의 x 좌표를 더하는 기능을 구현해보겠습니다.

```ts
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener("click", (event) => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count);
    lastClick = Date.now();
  }
});
```

RxJS로도 구현해볼게요.

```ts
import { fromEvent, throttleTime, map, scan } from "rxjs";

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    map((event) => event.clientX),
    scan((count, clientX) => count + clientX, 0),
  )
  .subscribe((count) => console.log(count));
```

다른 값 관련 연산자에는 [**pluck**](https://rxjs.dev/api/operators/pluck), [**pairwise**](https://rxjs.dev/api/operators/pairwise), [**sample**](https://rxjs.dev/api/operators/sample) 등이 있습니다.
