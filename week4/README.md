# NestJS API

## Middleware

request를 받아와서 route에 보내기 전에 중간에 존재하는 작업으로, 인증이나 log를 찍는 등의 역할을 한다. middleware를 구현하는 방법에는 **class**를 이용하는 방식과 **function**을 이용하는 방식이 존재한다.

### class를 이용하여 middleware 구성하기

class를 이용한 middleware 구현은 `NestMiddleware` 키워드를 이용한다. `req` 와 `res` 의 값을 중간에 받아서 처리를 한 후 `next`로 넘겨주는 방식으로 작동한다.
```javascript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```
<br>


`module.ts` 파일에 다음과 같이 middleware module을 추가해주면, 해당 module 전체에 middleware가 적용된다. `consumer.exclude`를 이용하면 일부 명령에 대해 middleware를 제외할 수 있다.
```javascript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('cats');
  }
}
```

<br>

`main.ts`에서 다음과 같이 middleware를 구성해 주면 전체 module에 대해 global middleware를 설정해 줄 수 있다.
```javascript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

### function을 이용하여 middleware 구성하기

function을 이용한 middleware 구현은 다음과 같이 함수의 인자로 `req`, `res`, `next`를 주어 구현할 수 있다.

```javascript
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

<hr>

## Exception Filters

Controller로 요청을 받았을 때 **잘못된 요청** 혹은 **error**가 발생하였을 때의 처리법을 말한다. 구현되어 있는 exception filter를 활용하면 편하다. custom하여서 원하는 문구가 출력되도록 할 수도 있다.

```javascript
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

<hr>

## Pipes/Validation

middleware 다음단계로, router 들어가기 직전에 수행할 수 있는것을 말한다.

### Transformation

요청의 형식을 바꾸어주는 역할을 한다. 아래 코드에서 `@Param` 키워드를 통해 id값을 받아오는데, `ParseIntPipe`를 같이 적어주어 int형으로 값을 변환하여 받을 수 있다. 

```javascript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

### Validation

보내준 값의 형식이 valid한지 확인한다. dto를 이용하여 값을 받아오기 때문에 `class validator` 사용하는 것을 추천한다.

```bash
$ npm i --save class-validator class-transformer
```

위와  같은 코드로 class validator를 설치하면, dto 파일에서 decorator를 이용하여 편하게 validation을 적용할 수 있다.

```javascript
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
```

<hr>

## Guards

인증이나 로그인 여부(admin or user)를 판단한다. middleware 직후, pipe 이전에 실행된다.


다음과 같이 `CanActivate` 키워드를 이용하여 인증을 처리할 수 있다. boolean값을 어떻게 잘 통과시켜서..?(함 해보기!)

```javascript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

이렇게 만든 guard는 `controller.ts` 에서 원하는 method(ex. GET, POST) 위에 decorator를 써서 사용할 수 있다. 혹은 controller 전체 위에다 작성하여 전체에 적용할 수도 있다. 혹은 `main.ts`에서 global로 사용해 줄 수도 있다.( 각 module의 provider에서 해당 guard를 사용할 것이라는 표시를 해 주어야 제대로 작동함.)

<hr>

## Swagger

만든 함수에 대한 문서화를 편하게 할 수 있는 library로, 공식문서의 `OPENAPI` 부분에 자세히 적혀져 있다. library 다운받고 `main.ts` 에 조금만 코드를 추가해주면 쉽게 사용할 수 있다. 직접 써보면 왕편한거 알 수 있음 :+1:

```bash
$ npm install --save @nestjs/swagger swagger-ui-express
```
```javascript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

<hr>

참고자료

- [NestJS Document](https://docs.nestjs.com/first-steps)

<hr>
