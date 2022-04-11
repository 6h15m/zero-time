---
title: "RxJS Observer 번역"
description: "🇰🇷 RxJS Observer 공식 문서를 번역해보자!"
date: 2022-04-12
update: 2022-04-11
tags:
  - RxJS
  - Reactive Programming
series: "RxJS 공식 문서 번역"
---

## 프롤로그

안녕하세요! 제로입니다.
이번 게시물에는 공식 문서 가이드의 [Observer](https://rxjs.dev/guide/observer) 문서를 번역해보려 합니다.
저번 문서인 [RxJS Observable 공식 문서 번역](https://6h15m.github.io/rxjs-observable/) 을 읽고 오시면 옵저버에 대해서 훨씬 더 쉽게 이해하실 수 있을 거에요!

## Observer(옵저버) 소개

**옵저버란?** 옵저버는 옵저버블에 의해 전달되는 값의 소비자입니다.
간단히 말하자면 콜백 세트로, 옵저버블에서 제공하는 타입의 알림(: `next`, `error`, `complete`)에 대해 각자 하나씩 제공하게 됩니다.
다음은 일반적인 옵저버 객체의 예시입니다.

```ts
const observer = {
  next: (x) => console.log("옵저버가 next 값을 전달받았습니다: " + x),
  error: (err) => console.error("옵저버가 에러를 전달받았습니다: " + err),
  complete: () => console.log("옵저버가 complete 알림을 전달받았습니다."),
};
```

옵저버를 사용하려면, 옵저버블의 `subscribe`에 전달해야 합니다.

```ts
observable.subscribe(observer);
```

> 옵저버는 옵저버블이 전달할 수 있는 알림 타입에 대해 각 하나씩, 총 세 개의 콜백을 가진 객체입니다.

RxJS의 옵저버는 _부분적일_ 수 있습니다.
콜백 중 하나를 제공하지 않았을 때, 해당 콜백이 없기 때문에 옵저버에서 일부 알림이 무시되는 것을 제외하면 옵저버블의 실행이 정상적으로 수행됩니다.

아래의 예제는 `complete` 콜백을 제공하지 않은 `옵저버`입니다.

```ts
const observer = {
  next: (x) => console.log("옵저버가 next 값을 전달받았습니다: " + x),
  error: (err) => console.error("옵저버가 에러를 전달받았습니다: " + err),
};
```

`옵저버블`을 구독할 때, next 콜백을 `옵저버` 객체에 연결하지 않고 인수로 전달할 수도 있습니다.

```ts
observable.subscribe((x) =>
  console.log("옵저버가 next 값을 전달받았습니다: " + x),
);
```

`observable.subscribe`가 내부적으로 콜백 인수를 `next` 핸들러로 사용하는 `옵저버` 객체를 생성하기에 가능한 일입니다.
