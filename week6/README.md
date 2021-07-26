## NestJS Week6

깃에서 코드 받아서 `npm install` 해보기

> 주제: 코드가 잘 짜였는지 **코드로** testing하는 것이 목적

어떤 상황이 input으로 들어갔을 때 output이 잘 나오는지 code level로 testing

<hr>

### 시작하기

`npm run start:dev`를 해서 API가 잘 돌아가는지 확인. postman을 이용하여서 확인하면 된다. DB값이 잘 들어가 있는지

<hr>

### 코드 작성하기

#### `app.controller.spec.ts`

이때까지는 testing을 하지 않아서 사용하지 않고 지우던 파일이었음.

- describe: test case를 정의. test의 제목 정의
- it: describe와 유사함. describe 내부에 정의되어서 testcase를 정의. `expect`안에 test해보고자 하는 값이 들어가고, 그 값이 `toBe` 속의 값이 나와야 한다.(`export`가 `toBe` 속의 값을 기대한다는 의미)
- beforeEach: testcase를 실행하기 전에 실행. 임시로 testing module을 정의.

webstorm 기준으로 왼쪽에 초록 화살표 눌러서 실행하면 된다.

terminal에 `npm run test:cov` 실행해보기: code coverage를 출력해 주는 명령어.

*code coverage: testing이 우리가 작성하는 코드를 얼마나 cover하느냐. 정의되어 있는 함수들 중에 몇개나 cover하는지*

<br>

#### `cat.controller.spec.ts`

`getAll()`이 promise를 반환하기 때문에 async/await을 통해서 resolve 시켜줘야 한다.

<br>

#### Mocking

Unit Test: 외부 의존


<hr>

## HW

**1.  PUT, DELETE test case**

Q. `PUT` 관련된 test만들 때 기존의 `this.catRepo.update()` 함수의 return값을 `toEqual()`에 어떤 형식으로 받아주어야 할지를 몰라서 임의로 `cat.service.ts` 파일 속의 `update`함수의 return값을 dto.name을 줘서 testing하였는데 더 현명한 방식이 있을지.

<br>

**2.  Mocking의 의의 찾아보기**
