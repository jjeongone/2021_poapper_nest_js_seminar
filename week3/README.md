# NestJS Data Base

## Homework(2)

`OneToOne`
- user의 개인정보

`OneToMany`/`ManyToOne`
- 온라인 쇼핑몰에서의 주문/구매 내역
- 채팅기록

`ManyToMany`
- SNS의 좋아요 기록

<hr>

## Connect Database
다음과 같은 코드를 이용하여 sqlite3을 설치할 수 있다.

```bash
npm install --save @nestjs/typeorm typeorm sqlite3
```
그 후 module에 database를 import해주면 해당 database를 사용할 수 있다. sqlite3에서는 `.sqlite` 파일이 하나의 database 역할을 하기 때문에 해당 directory에 (여기에서는) `db-dev.sqlite` 파일을 생성해 주어야 한다.
```javascript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: "db-dev.sqlite",
      entities: ["dist/**/*.entity{.ts,.js}"]
      synchronize: true,
    }),
  ],
})
export class AppModule {}
```

<br>

## Create Entity File

:bulb: Entity란?

database에 저장될 column을 entity를 통해 정의할 수 있다. 

다음과 같이 column의 type에 대한 decorator를 사용한 뒤 column의 name, type을 차례로 작성하면 된다.
```javascript
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Board, board => board.user)
    boards: Board[];
}
```

<br>

## CRUD API

`POST` API에서 `Body()`를 이용하기 위해서는 `dto` 파일을 작성해 주어야 한다. dto 파일에서는 POST API에서 받아올 property의 key와 value type을 정해준다.
```javascript
export class UserDto{
    readonly name: string;
}
```

<br>

## Database Relation

### OneToOne

두 객체가 **1:1 관계**를 가질 때 OneToOne relationship을 가진다. `@OneToOne` decorator를 이용하여 구현할 수 있다. 만약 response에서 OneToOne relationship에 있는 객체를 같이 출력하고 싶다면, 다음과 같이 find 함수에 relations를 추가해 주면 된다.
```javascript
.find({ relations: ["user"] })
```

### OneToMany/ManyToOne

두 객체가 **1:N 관계**를 가질 때 OneToMany/ManyToOne relationship을 가진다. OneToMany/ManyToOne은 항상 1:N 관계에 있는 객체에 쌍으로 존재해야 한다. `@OneToMany`와 `@ManyToOne` decorator를 이용하여 구현할 수 있다. OneToOne과 마찬가지로 relations를 추가하면 response에서 같이 값을 확인할 수 있다.

### ManyToMany

두 객체가 **N:M 관계**를 가질 때 ManyToOne relationship을 가진다. ManyToOne은 단방향(uni-directional) ManyToOne과 양방향(bi-directional) 관계가 존재한다. `@ManyToOne` decorator를 이용하여 구현할 수 있다. 실제로 ManyToMany는 앞의 OneToOne이나 OneToMany/ManyToOne에 비해 실무에서 활용도가 떨어진다고 한다.(직접 구현하는 것이 편하다고 함)

#### Tips

OneToMany/ManyToOne, ManyToMany relationship에서는 list를 적절히 이용해야 한다. list를 다루다 보니 for loop을 사용하게 되었고, JS에서 for loop을 사용할 때 비동기 처리를 위해서는 다음과 같은 방식을 이용해야 했다.
```javascript
for (let user_id of dto.user_ids) {
            const existUser = await this.userService.findOne(user_id)
            existUsers.push(existUser);
        }
```
for ...of loop는 객체가 `Symbol.iterator` 속성을 가져야 사용할 수 있으며, array에서 사용할 시 각각의 element값을 받아온다. 외에도 for ...in loop를 이용할 수 있고, array에 한해 foreach loop를 사용할 수 있다.

<hr>

## NestJS Tips

### CLI 사용하기
CLI를 사용하면, 모듈을 만드는 데 편리하다.
```bash
nest g {module_type} {module_name}
```
