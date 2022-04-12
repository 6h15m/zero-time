---
title: "[번역] RxJS 공식 문서 #Subscription"
description: "🇰🇷 구독과 좋아요, 알림 설정까지-"
date: 2022-04-14
update: 2022-04-14
tags:
  - RxJS
  - Reactive Programming
series: "RxJS 공식 문서 번역"
---

## Subscription(구독) 소개

**구독**은 일회성 리소스 객체로, RxJS에서는 옵저버블의 실행을 나타냅니다.
구독에는 매우 중요한 메소드인 `unsubscribe`가 존재합니다.
이 메소드는 구독에서 사용되고 있는 리소스를 해제합니다.
RxJS의 예전 버전들에서 구독의 이름은 "Disposable(일회성)"이었습니다.

```ts
import { interval } from "rxjs";
const observable = interval(1000);
const subscription = observable.subscribe((x) => console.log(x));
// 밑의 코드는 옵저버의 구독 호출로 시작된,
// 현재까지 진행 중인 옵저버블 실행을 취소합니다.
subscription.unsubscribe();
```

> 구독에는 리소스를 해제하거나 옵저버블 실행을 취소하는 `unsubscribe()` 함수가 있습니다.

한 구독에서 `unsubscribe()`를 호출해 여러 구독을 취소하고 싶다면,
하나의 구독을 다른 구독에 "추가"하기만 하면 되죠.

```ts
import { interval } from "rxjs";
const observable1 = interval(400);
const observable2 = interval(300);
const subscription = observable1.subscribe((x) => console.log("첫 번째: " + x));
const childSubscription = observable2.subscribe((x) =>
  console.log("두 번째: " + x),
);
subscription.add(childSubscription);
setTimeout(() => {
  // subscription과 childSubscription 모두 구독 취소
  subscription.unsubscribe();
}, 1000);
```

콘솔에서 실행 결과를 확인해볼까요?

```none
두 번째: 0
첫 번째: 0
두 번째: 1
첫 번째: 1
두 번째: 2
```

구독 객체는 하위 구독의 추가를 취소하기 위한 `remove(otherSubscription)` 메소드도 갖고 있습니다.
