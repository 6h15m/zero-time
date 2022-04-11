---
title: "[번역] RxJS 공식 문서 #Operators"
description: "🇰🇷 Operator, 너는 진짜 누구냐-"
date: 2022-04-13
update: 2022-04-13
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

[여기](#생성-연산자-리스트) 에 모든 정적 생성 연산자들을 참조해두었습니다.

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
모든 값이 그러한 방식으로 연결되어 있죠.
유용한 평탄화 연산자([결합 연산자](#결합-연산자))에는, 

- [`mergeAll()`](https://rxjs.dev/api/operators/mergeAll) — 내부 옵저버블이 도착할 때 구독해서, 다음 값이 도착할 때 방출합니다.
- [`switchAll()`](https://rxjs.dev/api/operators/switchAll) — 첫 번째 내부 옵저버블이 도착하면 첫 번째 내부 옵저버블을 구독하고, 값이 도착하면 방출합니다. 
  하지만 다음 내부 옵저버블이 도착하면, 이전 내부 값을 구독 해제하고 새 값을 구독합니다.
- [`exhaustAll()`](https://rxjs.dev/api/operators/exhaustAll) — 첫 번째 내부 옵저버블이 도착하면 첫 번째 내부 옵저버블을 구독하고, 값이 도착하면 방출합니다. 
  첫 번째 내부 옵저버블이 완료될 때까지 새로 도착하는 모든 내부 옵저버블을 버리고 다음 내부 옵저버블을 기다립니다.

Just as many array libraries combine [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [`flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) (or `flatten()`) into a single [`flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap), there are mapping equivalents of all the RxJS flattening operators [`concatMap()`](/api/operators/concatMap), [`mergeMap()`](/api/operators/mergeMap), [`switchMap()`](/api/operators/switchMap), and [`exhaustMap()`](/api/operators/exhaustMap).

## Marble diagrams

To explain how operators work, textual descriptions are often not enough. Many operators are related to time, they may for instance delay, sample, throttle, or debounce value emissions in different ways. Diagrams are often a better tool for that. _Marble Diagrams_ are visual representations of how operators work, and include the input Observable(s), the operator and its parameters, and the output Observable.

<span class="informal">In a marble diagram, time flows to the right, and the diagram describes how values ("marbles") are emitted on the Observable execution.</span>

Below you can see the anatomy of a marble diagram.

<img src="assets/images/guide/marble-diagram-anatomy.svg">

Throughout this documentation site, we extensively use marble diagrams to explain how operators work. They may be really useful in other contexts too, like on a whiteboard or even in our unit tests (as ASCII diagrams).

## Categories of operators

There are operators for different purposes, and they may be categorized as: creation, transformation, filtering, joining, multicasting, error handling, utility, etc. In the following list you will find all the operators organized in categories.

For a complete overview, see the [references page](/api).

### <a id="생성-연산자-리스트"></a>생성 연산자 리스트

- [`ajax`](/api/ajax/ajax)
- [`bindCallback`](/api/index/function/bindCallback)
- [`bindNodeCallback`](/api/index/function/bindNodeCallback)
- [`defer`](/api/index/function/defer)
- [`empty`](/api/index/function/empty)
- [`from`](/api/index/function/from)
- [`fromEvent`](/api/index/function/fromEvent)
- [`fromEventPattern`](/api/index/function/fromEventPattern)
- [`generate`](/api/index/function/generate)
- [`interval`](/api/index/function/interval)
- [`of`](/api/index/function/of)
- [`range`](/api/index/function/range)
- [`throwError`](/api/index/function/throwError)
- [`timer`](/api/index/function/timer)
- [`iif`](/api/index/function/iif)

### <a id="join-creation-operators"></a>Join Creation Operators

These are Observable creation operators that also have join functionality -- emitting values of multiple source Observables.

- [`combineLatest`](/api/index/function/combineLatest)
- [`concat`](/api/index/function/concat)
- [`forkJoin`](/api/index/function/forkJoin)
- [`merge`](/api/index/function/merge)
- [`partition`](/api/index/function/partition)
- [`race`](/api/index/function/race)
- [`zip`](/api/index/function/zip)

### Transformation Operators

- [`buffer`](/api/operators/buffer)
- [`bufferCount`](/api/operators/bufferCount)
- [`bufferTime`](/api/operators/bufferTime)
- [`bufferToggle`](/api/operators/bufferToggle)
- [`bufferWhen`](/api/operators/bufferWhen)
- [`concatMap`](/api/operators/concatMap)
- [`concatMapTo`](/api/operators/concatMapTo)
- [`exhaust`](/api/operators/exhaust)
- [`exhaustMap`](/api/operators/exhaustMap)
- [`expand`](/api/operators/expand)
- [`groupBy`](/api/operators/groupBy)
- [`map`](/api/operators/map)
- [`mapTo`](/api/operators/mapTo)
- [`mergeMap`](/api/operators/mergeMap)
- [`mergeMapTo`](/api/operators/mergeMapTo)
- [`mergeScan`](/api/operators/mergeScan)
- [`pairwise`](/api/operators/pairwise)
- [`partition`](/api/operators/partition)
- [`pluck`](/api/operators/pluck)
- [`scan`](/api/operators/scan)
- [`switchScan`](/api/operators/switchScan)
- [`switchMap`](/api/operators/switchMap)
- [`switchMapTo`](/api/operators/switchMapTo)
- [`window`](/api/operators/window)
- [`windowCount`](/api/operators/windowCount)
- [`windowTime`](/api/operators/windowTime)
- [`windowToggle`](/api/operators/windowToggle)
- [`windowWhen`](/api/operators/windowWhen)

### Filtering Operators

- [`audit`](/api/operators/audit)
- [`auditTime`](/api/operators/auditTime)
- [`debounce`](/api/operators/debounce)
- [`debounceTime`](/api/operators/debounceTime)
- [`distinct`](/api/operators/distinct)
- [`distinctUntilChanged`](/api/operators/distinctUntilChanged)
- [`distinctUntilKeyChanged`](/api/operators/distinctUntilKeyChanged)
- [`elementAt`](/api/operators/elementAt)
- [`filter`](/api/operators/filter)
- [`first`](/api/operators/first)
- [`ignoreElements`](/api/operators/ignoreElements)
- [`last`](/api/operators/last)
- [`sample`](/api/operators/sample)
- [`sampleTime`](/api/operators/sampleTime)
- [`single`](/api/operators/single)
- [`skip`](/api/operators/skip)
- [`skipLast`](/api/operators/skipLast)
- [`skipUntil`](/api/operators/skipUntil)
- [`skipWhile`](/api/operators/skipWhile)
- [`take`](/api/operators/take)
- [`takeLast`](/api/operators/takeLast)
- [`takeUntil`](/api/operators/takeUntil)
- [`takeWhile`](/api/operators/takeWhile)
- [`throttle`](/api/operators/throttle)
- [`throttleTime`](/api/operators/throttleTime)

### <a id="결합-연산자"></a>결합 연산자

Also see the [Join Creation Operators](#join-creation-operators) section above.

- [`combineLatestAll`](/api/operators/combineLatestAll)
- [`concatAll`](/api/operators/concatAll)
- [`exhaustAll`](/api/operators/exhaustAll)
- [`mergeAll`](/api/operators/mergeAll)
- [`switchAll`](/api/operators/switchAll)
- [`startWith`](/api/operators/startWith)
- [`withLatestFrom`](/api/operators/withLatestFrom)

### Multicasting Operators

- [`multicast`](/api/operators/multicast)
- [`publish`](/api/operators/publish)
- [`publishBehavior`](/api/operators/publishBehavior)
- [`publishLast`](/api/operators/publishLast)
- [`publishReplay`](/api/operators/publishReplay)
- [`share`](/api/operators/share)

### Error Handling Operators

- [`catchError`](/api/operators/catchError)
- [`retry`](/api/operators/retry)
- [`retryWhen`](/api/operators/retryWhen)

### Utility Operators

- [`tap`](/api/operators/tap)
- [`delay`](/api/operators/delay)
- [`delayWhen`](/api/operators/delayWhen)
- [`dematerialize`](/api/operators/dematerialize)
- [`materialize`](/api/operators/materialize)
- [`observeOn`](/api/operators/observeOn)
- [`subscribeOn`](/api/operators/subscribeOn)
- [`timeInterval`](/api/operators/timeInterval)
- [`timestamp`](/api/operators/timestamp)
- [`timeout`](/api/operators/timeout)
- [`timeoutWith`](/api/operators/timeoutWith)
- [`toArray`](/api/operators/toArray)

### Conditional and Boolean Operators

- [`defaultIfEmpty`](/api/operators/defaultIfEmpty)
- [`every`](/api/operators/every)
- [`find`](/api/operators/find)
- [`findIndex`](/api/operators/findIndex)
- [`isEmpty`](/api/operators/isEmpty)

### Mathematical and Aggregate Operators

- [`count`](/api/operators/count)
- [`max`](/api/operators/max)
- [`min`](/api/operators/min)
- [`reduce`](/api/operators/reduce)

## Creating custom operators

### Use the `pipe()` function to make new operators

If there is a commonly used sequence of operators in your code, use the `pipe()` function to extract the sequence into a new operator. Even if a sequence is not that common, breaking it out into a single operator can improve readability.

For example, you could make a function that discarded odd values and doubled even values like this:

```ts
import { pipe, filter, map } from "rxjs";
function discardOddDoubleEven() {
  return pipe(
    filter((v) => !(v % 2)),
    map((v) => v + v),
  );
}
```

(The `pipe()` function is analogous to, but not the same thing as, the `.pipe()` method on an Observable.)

### Creating new operators from scratch

It is more complicated, but if you have to write an operator that cannot be made from a combination of existing operators (a rare occurrance), you can write an operator from scratch using the Observable constructor, like this:

```ts
import { Observable, of } from "rxjs";
function delay<T>(delayInMillis: number) {
  return (observable: Observable<T>) =>
    new Observable<T>((subscriber) => {
      // this function will be called each time this
      // Observable is subscribed to.
      const allTimerIDs = new Set();
      let hasCompleted = false;
      const subscription = observable.subscribe({
        next(value) {
          // Start a timer to delay the next value
          // from being pushed.
          const timerID = setTimeout(() => {
            subscriber.next(value);
            // after we push the value, we need to clean up the timer timerID
            allTimerIDs.delete(timerID);
            // If the source has completed, and there are no more timers running,
            // we can complete the resulting observable.
            if (hasCompleted && allTimerIDs.size === 0) {
              subscriber.complete();
            }
          }, delayInMillis);
          allTimerIDs.add(timerID);
        },
        error(err) {
          // We need to make sure we're propagating our errors through.
          subscriber.error(err);
        },
        complete() {
          hasCompleted = true;
          // If we still have timers running, we don't want to complete yet.
          if (allTimerIDs.size === 0) {
            subscriber.complete();
          }
        },
      });
      // Return the finalization logic. This will be invoked when
      // the result errors, completes, or is unsubscribed.
      return () => {
        subscription.unsubscribe();
        // Clean up our timers.
        for (const timerID of allTimerIDs) {
          clearTimeout(timerID);
        }
      };
    });
}
// Try it out!
of(1, 2, 3).pipe(delay(1000)).subscribe(console.log);
```

Note that you must

1. implement all three Observer functions, `next()`, `error()`, and `complete()` when subscribing to the input Observable.
2. implement a "finalization" function that cleans up when the Observable completes (in this case by unsubscribing and clearing any pending timeouts).
3. return that finalization function from the function passed to the Observable constructor.

Of course, this is only an example; the [`delay()`](/api/operators/delay) operator already exists.
