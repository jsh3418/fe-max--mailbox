## 비동기 프로그래밍

### call stack

개발자도구의 call stack 확인해보기

```jsx
const baseData = [1, 2, 3, 4, 5, 6, 100];

function foo() {
  baseData.forEach((v, i) => {
    // (anonymous)
    console.log("sync ", i);
    bar();
  });
}

function bar() {
  baseData.forEach((v, i) => {
    // (anonymous)
    debugger;
    console.log("sync 2", i);
  });
}

foo(); // (anonymous)
```

<img width="513" alt="Untitled" src="https://user-images.githubusercontent.com/57666791/227987915-811a223d-92ff-478f-a8e9-676993d4545c.png">

### setTimeout과 비동기, call stack & callback queue

만약 setTimeout이 동기적으로 실행되면 어떻게 될까?

- setTimeout 함수가 기다릴 시간 동안 자바스크립트는 블로킹(blocking)되어 코드가 멈추고 setTimeout을 실행한 뒤에야 뒤에 있는 코드를 실행된다.

setTimeout함수의 callback 함수는 어떻게 동작할까?

- setTimeout 함수가 실행되면 콜백함수를 브라우저로 바로 넘긴다.
- 브라우저는 두번째로 들어온 시간만큼 기다린 후 콜백 큐에 콜백함수를 넣는다.
- 이벤트 루프가 콜 스택과 콜백 큐를 모니터링하고 콜 스택이 비면 이벤트 루프가 콜백 큐에 있던 함수를 콜 스택에 이동시킨다.
- 콜 스택은 이동한 함수를 실행시킨다.

### **비동기 상황 예**

```jsx
const baseData = [1, 2, 3, 4, 5, 6, 100];

const asyncRun = (arr, fn) => {
  for (var i = 0; i < arr.length; i++) {
    setTimeout(() => fn(i), 1000);
  }
};

asyncRun(baseData, (idx) => console.log(idx));
```

'var'를 'let' 으로 변경하면??

var의 경우는 7이 7번 찍힌다. let의 경우 0,1,2,3,4,5,6이 찍힌다. 왜 다를까?

var의 경우 함수 스코프(local scope)로 i가 갱신되어 console.log가 실행될 땐 i가 7이 된다.

<img width="253" alt="image" src="https://user-images.githubusercontent.com/57666791/227990241-23c64b6b-7ed9-467a-bf27-9d899a720af8.png">

let의 경우 블록 스코프(block scope)로 i가 클로저 되어 console.log엔 블록 스코프에 있는 i를 표시한다.

<img width="249" alt="image" src="https://user-images.githubusercontent.com/57666791/227987819-de064de5-4594-4df2-88a4-aac7bc69fc8f.png">

### REF

[자바스크립트 대표적 클로저 실수를 let으로 해결?](https://www.youtube.com/watch?v=RZ3gXcI1MZY)

[What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://youtu.be/8aGhZQkoFbQ)
