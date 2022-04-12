---
title: "[번역] RxJS 공식 문서 #Operators"
description: "🇰🇷 Operator, 너는 진짜 누구냐-"
date: 2022-04-12 04:00:00
update: 2022-04-12 04:00:00
tags:
  - RxJS
  - Reactive Programming
series: "RxJS 공식 문서 번역"
---

## 프롤로그

안녕하세요! 제로입니다.
저번의 [RxJS 공식 문서 번역 #Observer](https://6h15m.github.io/rxjs-observer/) 에 이어,
공식 문서 가이드의 [Operators](https://rxjs.dev/guide/operators) 문서를 번역해보려 합니다.

## RxJS Operator(연산자) 소개

RxJS는 _연산자_ 덕분에 유용합니다. 옵저버블 기반인데도 말이죠.
연산자는 복잡한 비동기 코드를 쉽게 선언적으로 구성할 수 있도록 해주는 필수적 요소입니다.

## 연산자란?

연산자는 **함수**입니다. RxJS에는 두 종류의 연산자들이 존재하는데요,

**파이프형 연산자**는 `observableInstance.pipe(operator())` 구문을 사용해 옵저버블에 연결할 수 있는 연산자들입니다.
[`filter(...)`](https://rxjs.dev/api/operators/filter) 나 [`mergeMap(...)`](https://rxjs.dev/api/operators/mergeMap) 같은 것들이 포함되죠.
이 연산자들을 호출해도 기존의 옵저버블 인스턴스는 _변경되지 않습니다_.
대신, 첫 번째 옵저버블을 기반으로 _새로운_ 옵저버블을 리턴합니다.

> 파이프형 연산자는 옵저버블을 입력 값처럼 사용하고 다른 옵저버블을 리턴하는 함수입니다. 이 연산자는 순수함수로, 이전 옵저버블은 수정되지 않은 채로 유지됩니다.

파이프형 연산자는 기본적으로 하나의 옵저버블을 입력 값으로 사용하며, 다른 옵저버블을 출력 값으로 생성하는 순수함수입니다.
출력 옵저버블을 구독하면 입력 옵저버블도 구독됩니다.

**생성 연산자**는 새로운 옵저버블을 생성하기 위한 독립형 함수입니다.
예를 들어, `of(1, 2, 3)`은 1, 2, 3을 차례대로 방출하는 옵저버블을 생성합니다.
생성 연산자에 대해서는 뒷부분에서 더 자세히 다뤄보겠습니다.

[`map`](https://rxjs.dev/api/operators/map) 이라고 하는 연산자를 함께 보겠습니다.
이 연산자는 동일한 이름의 Array 메소드와 유사하죠.
`[1, 2, 3].map(x => x * x)`이 `[1, 4, 9]`를 생성하듯이, 옵저버블은 다음과 같이 생성됩니다.

```ts
import { of, map } from "rxjs";
of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(`값: ${v}`));
// 로그:
// 값: 1
// 값: 4
// 값: 9
```

`1`, `4`, `9`를 방출하죠. 다른 유용한 연산자인 [`first`](https://rxjs.dev/api/operators/first)도 소개해 드리겠습니다.

```ts
import { of, first } from "rxjs";
of(1, 2, 3)
  .pipe(first())
  .subscribe((v) => console.log(`값: ${v}`));
// 로그:
// 값: 1
```

논리적으로 생각해 보면, `map`은 매핑 기능을 제공해야 하므로 즉시 생성되어야 합니다.
그러나 `first`는 상수가 될 수 있음에도 불구하고 똑같이 즉시 생성되죠.
일반적으로 모든 연산자는 인수 필요 여부에 관계없이 구성되어 있습니다.

## 파이핑

파이프형 연산자들은 함수이기 때문에, 일반 함수들처럼 사용할 _수_ 있습니다.

`op()(obs)`

그러나, 많은 양의 함수들이 합성되면 가독성이 떨어지게 됩니다. 이렇게요.

`op4()(op3()(op2()(op1()(obs))))`

이러한 이유로 옵저버블은 `.pipe()` 메소드를 사용해 동일한 작업을 수행하되, 가독성까지 챙겼죠.

```ts
obs.pipe(op1(), op2(), op3(), op4());
```

하나의 연산자만 사용하더라도 `op()(obs)` 형태로는 사용되지 않고, `obs.pipe(op())` 형태가 주로 선호됩니다.

## 생성 연산자

**생성 연산자**는 파이프형 연산자와 달리, 몇 가지 사전 정의된 동작을 이용하거나 다른 옵저버블과 결합함으로써 옵저버블을 생성할 수 있는 함수입니다.

생성 연산자의 대표적인 예시는 `interval` 함수입니다.
입력 인수로 (옵저버블이 아닌) 숫자를 받고, 출력으로 옵저버블을 생성합니다.

```ts
import { interval } from "rxjs";
const observable = interval(1000 /* 밀리초 */);
```

[여기](#생성-연산자) 에 모든 정적 생성 연산자들을 참조해두었습니다.

## 고차원 옵저버블

옵저버블은 보통 문자열이나 숫자 같은 일반적인 값들을 방출하지만, 가끔 옵저버블 _의_ 옵저버블, 소위 고차원 옵저버블을 다뤄야 할 때가 있습니다.
예를 들어, 파일의 URL로 구성된 문자열 옵저버블이 있다고 가정해 봅시다.

```ts
const fileObservable = urlObservable.pipe(map((url) => http.get(url)));
```

`http.get()`은 개별 URL에 대해 (문자열 또는 문자열 배열) 옵저버블을 리턴합니다.
이제 옵저버블 _의_ 옵저버블, 고차원 옵저버블이 준비되었습니다.

고차원 옵저버블을 다루려면 어떻게 해야 할까요?
일반적으로는, _flattening(평탄화 작업)_ 을 거쳐 고차원 옵저버블을 일반 옵저버블로 변환합니다.

```ts
const fileObservable = urlObservable.pipe(
  map((url) => http.get(url)),
  concatAll(),
);
```

[`concatAll()`](https://rxjs.dev/api/operators/concatAll) 연산자는 "외부" 옵저버블에서 방출되는 "내부" 옵저버블을 구독하고,
해당 옵저버블이 완료될 때까지 방출된 모든 값을 복사해 다음 옵저버블로 이동합니다.
모든 값이 이런 방식으로 연결되어 있죠.
유용한 평탄화 연산자([결합 연산자](#결합-연산자))에는,

- [`mergeAll()`](https://rxjs.dev/api/operators/mergeAll) — 내부 옵저버블이 도착할 때 구독해서, 다음 값이 도착할 때 방출합니다.
- [`switchAll()`](https://rxjs.dev/api/operators/switchAll) — 첫 번째 내부 옵저버블이 도착하면 첫 번째 내부 옵저버블을 구독하고, 값이 도착하면 방출합니다.
  하지만 다음 내부 옵저버블이 도착하면, 이전 내부 값을 구독 해제하고 새 값을 구독합니다.
- [`exhaustAll()`](https://rxjs.dev/api/operators/exhaustAll) — 첫 번째 내부 옵저버블이 도착하면 첫 번째 내부 옵저버블을 구독하고, 값이 도착하면 방출합니다.
  첫 번째 내부 옵저버블이 완료될 때까지 새로 도착하는 모든 내부 옵저버블을 버리고 다음 내부 옵저버블을 기다립니다.

대부분의 배열 라이브러리에서 [`map()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 과
[`flat()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) (또는 `flatten()`) 을 합쳐
[`flatMap()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) 으로 제공하듯이,
모든 RxJS의 평탄화 연산자에는 [`concatMap()`](https://rxjs.dev/api/operators/concatMap), [`mergeMap()`](https://rxjs.dev/api/operators/mergeMap), [`switchMap()`](https://rxjs.dev/api/operators/switchMap), [`exhaustMap()`](https://rxjs.dev/api/operators/exhaustMap)
과 같이 매핑할 수 있는 연산자가 제공됩니다.

## Marble diagrams(마블 다이어그램)

연산자의 작동 방식을 텍스트로만 설명하기는 어렵습니다.
많은 연산자들의 동작은 시간과 관련되어 있는데 (예: delay, sample, throttle, debounce)
이 동작들은 텍스트보단 다이어그램으로 표현하는 게 나은 방법입니다.
_마블 다이어그램_ 은 연산자의 작동을 시각적으로 표현한 것으로,
입력 옵저버블(들), 연산자와 연산자의 매개 변수, 출력 옵저버블을 포함하고 있습니다.

> 마블 다이어그램에서 시간은 오른쪽으로 흐르며,
> 옵저버블에서 값("마블")이 방출되는 방식을 설명합니다.

아래는 마블 다이어그램의 설명도입니다.

![마블 다이어그램 설명도](https://raw.githubusercontent.com/ReactiveX/rxjs/467c4e89ce6f3fcedcf6127ea38d7ce79d32d0f6/docs_app/src/assets/images/guide/marble-diagram-anatomy.svg)

이 문서 사이트(역: RxJS 공식 문서)에서, 마블 다이어그램은 연산자의 작동 방식을 설명하기 위해 광범위하게 사용됩니다.
물론 다른 컨텍스트(예: 화이트보드, 유닛 테스트)에서도 유용하게 사용될 수 있습니다.

## 연산자 카테고리

목적 단위로 연산자를 구분하면, 생성, 변환, 필터링, 결합, 멀티캐스팅, 에러 처리, 유틸리티 등으로 분류할 수 있습니다.
아래의 목록에서 모든 연산자를 카테고리별로 구분해두었습니다.

전체 목록은 [이 페이지](https://rxjs.dev/api) 에서 볼 수 있습니다.

### <a id="생성-연산자"></a>생성 연산자

- [`ajax`](https://rxjs.dev/api/ajax/ajax)
- [`bindCallback`](https://rxjs.dev/api/index/function/bindCallback)
- [`bindNodeCallback`](https://rxjs.dev/api/index/function/bindNodeCallback)
- [`defer`](https://rxjs.dev/api/index/function/defer)
- [`empty`](https://rxjs.dev/api/index/function/empty)
- [`from`](https://rxjs.dev/api/index/function/from)
- [`fromEvent`](https://rxjs.dev/api/index/function/fromEvent)
- [`fromEventPattern`](https://rxjs.dev/api/index/function/fromEventPattern)
- [`generate`](https://rxjs.dev/api/index/function/generate)
- [`interval`](https://rxjs.dev/api/index/function/interval)
- [`of`](https://rxjs.dev/api/index/function/of)
- [`range`](https://rxjs.dev/api/index/function/range)
- [`throwError`](https://rxjs.dev/api/index/function/throwError)
- [`timer`](https://rxjs.dev/api/index/function/timer)
- [`iif`](https://rxjs.dev/api/index/function/iif)

### <a id="결합-생성-연산자"></a>결합 생성 연산자

결합 생성 연산자는 결합 기능을 갖고 있는 옵저버블 생성 연산자들입니다.
여러 소스 옵저버블의 값들을 방출하죠.

- [`combineLatest`](https://rxjs.dev/api/index/function/combineLatest)
- [`concat`](https://rxjs.dev/api/index/function/concat)
- [`forkJoin`](https://rxjs.dev/api/index/function/forkJoin)
- [`merge`](https://rxjs.dev/api/index/function/merge)
- [`partition`](https://rxjs.dev/api/index/function/partition)
- [`race`](https://rxjs.dev/api/index/function/race)
- [`zip`](https://rxjs.dev/api/index/function/zip)

### 변형 연산자

- [`buffer`](https://rxjs.dev/api/operators/buffer)
- [`bufferCount`](https://rxjs.dev/api/operators/bufferCount)
- [`bufferTime`](https://rxjs.dev/api/operators/bufferTime)
- [`bufferToggle`](https://rxjs.dev/api/operators/bufferToggle)
- [`bufferWhen`](https://rxjs.dev/api/operators/bufferWhen)
- [`concatMap`](https://rxjs.dev/api/operators/concatMap)
- [`concatMapTo`](https://rxjs.dev/api/operators/concatMapTo)
- [`exhaust`](https://rxjs.dev/api/operators/exhaust)
- [`exhaustMap`](https://rxjs.dev/api/operators/exhaustMap)
- [`expand`](https://rxjs.dev/api/operators/expand)
- [`groupBy`](https://rxjs.dev/api/operators/groupBy)
- [`map`](https://rxjs.dev/api/operators/map)
- [`mapTo`](https://rxjs.dev/api/operators/mapTo)
- [`mergeMap`](https://rxjs.dev/api/operators/mergeMap)
- [`mergeMapTo`](https://rxjs.dev/api/operators/mergeMapTo)
- [`mergeScan`](https://rxjs.dev/api/operators/mergeScan)
- [`pairwise`](https://rxjs.dev/api/operators/pairwise)
- [`partition`](https://rxjs.dev/api/operators/partition)
- [`pluck`](https://rxjs.dev/api/operators/pluck)
- [`scan`](https://rxjs.dev/api/operators/scan)
- [`switchScan`](https://rxjs.dev/api/operators/switchScan)
- [`switchMap`](https://rxjs.dev/api/operators/switchMap)
- [`switchMapTo`](https://rxjs.dev/api/operators/switchMapTo)
- [`window`](https://rxjs.dev/api/operators/window)
- [`windowCount`](https://rxjs.dev/api/operators/windowCount)
- [`windowTime`](https://rxjs.dev/api/operators/windowTime)
- [`windowToggle`](https://rxjs.dev/api/operators/windowToggle)
- [`windowWhen`](https://rxjs.dev/api/operators/windowWhen)

### 필터링 연산자

- [`audit`](https://rxjs.dev/api/operators/audit)
- [`auditTime`](https://rxjs.dev/api/operators/auditTime)
- [`debounce`](https://rxjs.dev/api/operators/debounce)
- [`debounceTime`](https://rxjs.dev/api/operators/debounceTime)
- [`distinct`](https://rxjs.dev/api/operators/distinct)
- [`distinctUntilChanged`](https://rxjs.dev/api/operators/distinctUntilChanged)
- [`distinctUntilKeyChanged`](https://rxjs.dev/api/operators/distinctUntilKeyChanged)
- [`elementAt`](https://rxjs.dev/api/operators/elementAt)
- [`filter`](https://rxjs.dev/api/operators/filter)
- [`first`](https://rxjs.dev/api/operators/first)
- [`ignoreElements`](https://rxjs.dev/api/operators/ignoreElements)
- [`last`](https://rxjs.dev/api/operators/last)
- [`sample`](https://rxjs.dev/api/operators/sample)
- [`sampleTime`](https://rxjs.dev/api/operators/sampleTime)
- [`single`](https://rxjs.dev/api/operators/single)
- [`skip`](https://rxjs.dev/api/operators/skip)
- [`skipLast`](https://rxjs.dev/api/operators/skipLast)
- [`skipUntil`](https://rxjs.dev/api/operators/skipUntil)
- [`skipWhile`](https://rxjs.dev/api/operators/skipWhile)
- [`take`](https://rxjs.dev/api/operators/take)
- [`takeLast`](https://rxjs.dev/api/operators/takeLast)
- [`takeUntil`](https://rxjs.dev/api/operators/takeUntil)
- [`takeWhile`](https://rxjs.dev/api/operators/takeWhile)
- [`throttle`](https://rxjs.dev/api/operators/throttle)
- [`throttleTime`](https://rxjs.dev/api/operators/throttleTime)

### <a id="결합-연산자"></a>결합 연산자

위의 [결합 생성 연산자](#결합-생성-연산자) 카테고리도 살펴보세요.

- [`combineLatestAll`](https://rxjs.dev/api/operators/combineLatestAll)
- [`concatAll`](https://rxjs.dev/api/operators/concatAll)
- [`exhaustAll`](https://rxjs.dev/api/operators/exhaustAll)
- [`mergeAll`](https://rxjs.dev/api/operators/mergeAll)
- [`switchAll`](https://rxjs.dev/api/operators/switchAll)
- [`startWith`](https://rxjs.dev/api/operators/startWith)
- [`withLatestFrom`](https://rxjs.dev/api/operators/withLatestFrom)

### 멀티캐스팅 연산자

- [`multicast`](https://rxjs.dev/api/operators/multicast)
- [`publish`](https://rxjs.dev/api/operators/publish)
- [`publishBehavior`](https://rxjs.dev/api/operators/publishBehavior)
- [`publishLast`](https://rxjs.dev/api/operators/publishLast)
- [`publishReplay`](https://rxjs.dev/api/operators/publishReplay)
- [`share`](https://rxjs.dev/api/operators/share)

### 에러 처리 연산자

- [`catchError`](https://rxjs.dev/api/operators/catchError)
- [`retry`](https://rxjs.dev/api/operators/retry)
- [`retryWhen`](https://rxjs.dev/api/operators/retryWhen)

### 유틸리티 연산자

- [`tap`](https://rxjs.dev/api/operators/tap)
- [`delay`](https://rxjs.dev/api/operators/delay)
- [`delayWhen`](https://rxjs.dev/api/operators/delayWhen)
- [`dematerialize`](https://rxjs.dev/api/operators/dematerialize)
- [`materialize`](https://rxjs.dev/api/operators/materialize)
- [`observeOn`](https://rxjs.dev/api/operators/observeOn)
- [`subscribeOn`](https://rxjs.dev/api/operators/subscribeOn)
- [`timeInterval`](https://rxjs.dev/api/operators/timeInterval)
- [`timestamp`](https://rxjs.dev/api/operators/timestamp)
- [`timeout`](https://rxjs.dev/api/operators/timeout)
- [`timeoutWith`](https://rxjs.dev/api/operators/timeoutWith)
- [`toArray`](https://rxjs.dev/api/operators/toArray)

### 조건부 연산자

- [`defaultIfEmpty`](https://rxjs.dev/api/operators/defaultIfEmpty)
- [`every`](https://rxjs.dev/api/operators/every)
- [`find`](https://rxjs.dev/api/operators/find)
- [`findIndex`](https://rxjs.dev/api/operators/findIndex)
- [`isEmpty`](https://rxjs.dev/api/operators/isEmpty)

### 수학 연산자

- [`count`](https://rxjs.dev/api/operators/count)
- [`max`](https://rxjs.dev/api/operators/max)
- [`min`](https://rxjs.dev/api/operators/min)
- [`reduce`](https://rxjs.dev/api/operators/reduce)

## 커스텀 연산자 생성하기

### 새 연산자를 생성하려면...

`pipe()` 함수를 사용하세요.

코드에 일반적으로 사용되는 연산자 시퀀스가 있는 경우,
`pipe()` 함수를 이용해 시퀀스를 새 연산자로 추출하세요.
흔하지 않은 시퀀스여도 단일 연산자로 나누면 가독성이 향상될 수 있습니다.

예를 들어, 홀수 값을 삭제하고 짝수 값을 두 배로 하는 함수를 만들어봅시다.

```ts
import { pipe, filter, map } from "rxjs";
function discardOddDoubleEven() {
  return pipe(
    filter((v) => !(v % 2)),
    map((v) => v + v),
  );
}
```

(`pipe()` 함수는 옵저버블의 `.pipe()` 메서드와 유사하지만 같지는 않습니다.)

### 처음부터 새 연산자 생성하기

더 복잡하지만, 기존 연산자의 조합으로 만들 수 없는 연산자가 필요한 경우에는
다음과 같이 옵저버블 생성자를 사용해 처음부터 연산자를 작성할 수 있습니다.

```ts
import { Observable, of } from "rxjs";
function delay<T>(delayInMillis: number) {
  return (observable: Observable<T>) =>
    new Observable<T>((subscriber) => {
      // 이 함수는 옵저버블이 구독될 때마다 호출됩니다.
      const allTimerIDs = new Set();
      let hasCompleted = false;
      const subscription = observable.subscribe({
        next(value) {
          // 타이머를 시작하여 다음 값을 지연합니다.
          const timerID = setTimeout(() => {
            subscriber.next(value);
            // 값을 push한 후 타이머를 정리합니다.
            allTimerIDs.delete(timerID);
            // 소스가 완료되고, 실행 중인 타이머가 더 이상 없으면
            // 결과 옵저버블을 완료할 수 있습니다.
            if (hasCompleted && allTimerIDs.size === 0) {
              subscriber.complete();
            }
          }, delayInMillis);
          allTimerIDs.add(timerID);
        },
        error(err) {
          // 에러를 전파하고 있는지 확인해야 합니다.
          subscriber.error(err);
        },
        complete() {
          hasCompleted = true;
          // 타이머가 아직 작동 중이라면, 이 코드는 작동되지 않겠죠!
          if (allTimerIDs.size === 0) {
            subscriber.complete();
          }
        },
      });
      // 해제 로직을 반환합니다.
      // 결과 오류, 완료, 또는 구독 취소 시에 호출됩니다.
      return () => {
        subscription.unsubscribe();
        // 타이머를 정리합니다.
        for (const timerID of allTimerIDs) {
          clearTimeout(timerID);
        }
      };
    });
}
// 한 번 실행해보세요!
of(1, 2, 3).pipe(delay(1000)).subscribe(console.log);
```

다음 사항들을 주의하세요.

1. `next()`, `error()`, `complete()`의 세 가지 옵저버 기능을 모두 구현하세요.
2. 옵저버블이 완료되었을 때 정리하는 "해제" 기능을 구현하세요(보류 중인 timeout을 구독 취소하고 지울 수 있게요!).
3. 옵저버블 생성자에 전달된 함수에서 해당 함수를 반환하세요.

위의 예제는 당연히 예시일 뿐이고, [`delay()`](https://rxjs.dev/api/operators/delay) 연산자가 이미 준비되어 있습니다.
