# NestJS Final Assn

## account
계정의 생성 및 관리에 대한 REST API

#### DB Relation
- account - seminar: `OneToOne`
- account - seminar-registration: `OneToMany/ManyToOne`
- account - seminar-progress: `OneToMany/ManyToOne`

## auth
로그인, 로그아웃, 회원가입과 같은 Authorization, Authentication과 관련된 REST API

accountService를 import해서 사용

## seminar
세미나의 생성 및 관리에 대한 REST API

#### DB Relaiton
- seminar - account: `OneToOne`
- seminar - seminar-registration: `OneToMany/ManyToOne`
- seminar - seminar-progress: `OneToMany/ManyToOne`

## seminar-registration
세미나 신청 및 상태 관리와 관련된 REST API

#### DB Relation
- seminar-registration - account: `OneToMany/ManyToOne`
- seminar-registration - seminar: `OneToMany/ManyToOne`

## seminar-progress
세미나 출석 및 과제와 관련된 REST API

#### DB Relation
- seminar-progress - account: `OneToMany/ManyToOne`
- seminar-progress - seminar: `OneToMany/ManyToOne`

<hr>

## 페이지 구성

- `/`: 로그인/회원가입 화면
- `/home`: 수강중인 세미나의 현황을 보거나 세미나 신청 페이지로 이동할 수 있음
- `/seminar`: 현재 개설되어 있는 세미나에 신청할 수 있고, 신청 현황을 확인할 수 있음
- `/seminar-instructor`: 세미나의 생성, 업데이트, 세미나 신청, 출결 및 과제 관리 등 세미나에 대한 전반적인 관리 페이지
- `/account-admin`: 계정 관리(지금은 delete만) 페이지

<hr> 

## 보완할 점

1. 현재에는 account와 seminar가 `OneToOne`으로 한 명의 담장자(instructor)가 하나의 세미나만을 진행할 수 있도록 하였음. 담당자가 여러 세미나를 운영할 수 있도록 확장할 수 있으면 좋을 것 같음.
2. 구현되어 있는 모든 REST API들에 대해 frontend단에서 접근할 수 있는 페이지를 구상하지 않았음.
3. frontend 페이지에서 버튼을 눌렀을 때 redirect 시키는 코드를 구현하였으나 왠지 모르겠는 이유로 refresh가 되지 않음. 추후 수정하면 좋을듯.
4. 현재 세미나/수강생 관리 frontend로직이 세미나를 생성한 유저의 계정으로만 접속 가능하게 구현되어 있어서 admin으로 접속하였을 때 front단에서는 API 요청을 보낼 수가 없음... postman으로 요청을 보냈을 때에는 정상으로 작동하기 때문에 front단의 로직 수정이 필요함.
5. Authorization에서 Cookie를 받아오는 로직이 조금 엉성해서 이부분 다른 코드들 참고해서 보완해야 할듯.

<hr>

## 후기

- 실은 기간이 넉넉한 편이었는데, 방학 시작하고 여유부리다가 마지막에 몰아서 하느라 조금 퀄리티가 떨어지는 감이 없지않아 있는 것 같음.
- 과제 자체의 난이도는 어렵지 않지만, front와 back 연동을 해보지 않은 사람이라면 어느 정도 여유를 가지고 하면 좋을 듯.(근데 확실히 하면서 배우는게 많기 때문에 의미있는 삽질들이었다)
- 생각보다 서비스 하나를 구현함에 있어서 고려해야 할 사안들이 많았음.
- 특히 Authorization부분에서 살짝 시간을 잡아먹었음. Cookie 처리가 미숙해서 발생한 문제.
  