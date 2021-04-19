# NestJS Document - Overview(1)

## File hierarchy

`src` 아래에 core file들이 존재한다.

- `app.controller.ts`: A basic controller with a single route
- `app.controller.spec.ts`: The unit tests for controller
- `app.module.ts`: The root module of the application
- `app.service.ts`: A basic service with a single method
- `main.ts`: The entry file of the application which uses the core function `NestFactory` to create a Nest application instance

`main.ts`에는 async function이 존재한다. 아래 코드를 통해 간단한 HTTP listener를 구현할 수 있다.
```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```
`NestFactory`에는 application instance를 만들 수 있는 static method가 존재한다. 그중 `create` method는 application object를 return한다.


<hr>

## Controllers

`Controller`는 request를 받아 response를 반환하는 역할을 한다. `routing`을 통해 어떤 controller가 request를 받고 처리를 할지 결정한다. `class`와 `decorator`를 이용하여 basic controller를 만들 수 있다.(decorator가 class를 연결하는 역할 -> routing map을 구성할 수 있음)

<br>

### Routing

`@Controller()` decorator는 기본적인 controller를 구성하는 데 사용된다. `@Controller()`의 pretix를 이용하면 연관된 routing을 쉽게 그룹화할 수 있다.

<br>

### Request Object

Express의 `Request`를 이용하여 **request object**에 접근할 수 있다. request object는 HTTP request와 request query string, parameters, HTTP headers, body 등의 특징을 나타낸다. decorator를 이용하여 이러한 특징에 접근할 수 있다. 타입에 관한 library(`@types/express`)를 imort하면 더 많은 정보를 얻을 수 있다.

*이 부분에 대해서는 직접 사용해봐야 이해가 잘 될듯?*

<br>

### Resources

NestJS에서는 HTTP의 기본 method들에 대해 다음과 같은 decorator를 제공한다.

`@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, `@Head()`

`@ALL()`을 이용하면 위의 모든 것을 handling하는 endpoint를 만들 수 있다.

<br>

### Route wildcards

NestJS에서는 pattern에 기반한 route도 가능하다. `'ab*cd'`와 같은 형태로 route path를 지정하면 `abcd`, `ab_cd`, `abecd` 등의 path를 인식할 수 있다.

<br>

### Status code

POST request일 때에는 상태코드가 `201`이고, 그 외에는 `200`이 기본 상태이다. 상태코드는 `@HttpCode(...)` decorator를 통해 변경할 수 있다.

<br>

### Headers

`@Header()` decorator를 이용하여 header를 custom할 수 있다.

*header는 어디에 쓰이지?*


<br>

### Redirection
`@Redirect()` decorator를 이용하거나, library-specific한 방식(`res.redirect()`)을 이용하여 redirection을 구현할 수 있다.`@Redirect()`는 **url**과 **StatusCode**를 요소로 가지고, StatusCode의 기본값은 302이다.
redirected URL이나 StatusCode를 dynamic하게 설정하기 위해서는 다음과 같은 형식으로 object를 return해주면 된다. return된 value는 기존의 값을 override한다.
```javascript
{
    "url": string,
    "statusCode": numbr
}
```

<br>

### Route Parameters
request에서 dynamic하게 데이터를 받기 위해서는 route parameter token을 추가하여 사용할 수 있다. `Get()` decorator에서 다음과 같이 parameter를 나타내고, `@Param()` decorator를 통해 parameter에 접근할 수 있다.
```javascript
@Get(':id')
findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
}
```
혹은 `@Param()` decorator에 parameter를 특정하여 접근하는 방법도 있다.
```javascript
@Get(':id')
findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
}
```

<br>

### Sub-Domain Routing

`@Controller()` decorator는 다음과 같이 host 옵션을 설정하여 request를 특정하게 받을 수 있다.
```javascript
@Controller({ host: 'admin.example.com' })
export class AdminController {
    @Get()
    getInfo(@HostParam('account') account: string){
        return account;
    }
}
```
*요것도 써봐야 알듯하다*

<br>

### Asynchronicity

JS가 asynchronous하기 때문에 NestJS 또한 `async` function을 지원한다.
```javascript
@Get()
async findAll(): Promise<any[]> {
    return [];
}
```
```javascript
@Get()
findAll(): Observable<any[]> {
    return of([]);
}
```

<hr>

## Providers

**Provider**는 NestJS의 핵심적인 개념으로, 대부분의 class들(services, repositories, factories, helpers 등)이 provider이다. Provider의 주된 개념은 dependency를 부여할 수 있다는 점이다.

<br>

### Services

간단한 `CatService`를 다음과 같이 구성할 수 있다.
```javascript

import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
```
위와 같이 만들어낸 service를 controller에 끼워넣을 수 있다.
```javascript

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}
```

<br>

### Dependency injection(DI)

DI는 design pattern으로, class의 dependence를 외부에서 받아오는 것을 말한다. `@Injectable()` decorator는 이 class를 DI system에 사용할 수 있음을 명시한다.


NestJS에서는 다음과 같이 type을 이용하여 간단하게 dependency injection을 구현할 수 있다.
```javascript
constructor(private catsService: CatsService){}
```

<br>

### Optional providers

`@Optional()` decorator를 이용하여 dependency를 optional하게 설정할 수 있다.
```javascript
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
    constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

<br>

### Property-based injection
이전까지는 constructor를 통해 provider가 주입되는 constructor-based injection에 대해 살펴보았다면, 몇몇 케이스에서는 **property-based injection**이 유용할 수 있다. top-level class의 dependency가 복잡할 때 property level에서 `@Inject()` decorator를 사용할 수 있다.
```javascript
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
    @Inject('HTTP_OPTIONS')
    private readonly httpClient: T;
}
```

<br>

### Provider registration

위와 같이 새로운 provider(`CatsService`)와 service의 consumer(`CatsController`)를 정의하였을 때 이를 `app.moduel.ts`에 추가해 주어야 한다.

<hr>

## Modules
module은 `@Module()` decorator를 통해 나타낼 수 있고, NestJS에서 application structure를 구성할 때 metadata를 제공한다. 각각의 application은 최소한 하나의 module(**root module**)을 갖는다. root module은 NestJS에서 application graph(내부적인 data structure. module과 provider relationship, dependencie 등을 다룸)를 그릴 때의 시작점에 위치한다. 아주 작고 간단한 application의 경우에는 root module만을 이용하여 구성할 수도 있지만, 관련된 각각의 기능을 encapsulating하여 **multi-module로 구현하는 것을 강력하게 권장**한다.

`@Module()` decorator는 다음과 같은 property를 가진다.
- providers: 최소한 해당 module에서 사용되는 provider
- controllers: 해당 module에서 정의된 controller
- imports: import된 module
- exports: 해당 module에서 제공하게 되는 provider의 subset

module은 기본적으로 provider를 **encapsulate**하기 때문에, API나 public interface에서 사용될 provider를 export해주어야 한다.

<hr>

참고자료

- [NestJS Document](https://docs.nestjs.com/first-steps)
- [Dependency injection in Angular](https://angular.io/guide/dependency-injection)

<hr>