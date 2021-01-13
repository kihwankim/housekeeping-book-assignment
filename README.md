# 가계부 작성 프로그램 제작

## Backend : CodeIgniter 4

## Frontend : Vuejs

## 구현 항목
### 도메인 요구사항 : 달력에 입출금
* 금액
* 사용 내용
* 시간

### 기능적 요구사항
* 항목 수정
* 항목 추가
* 항목 삭제

### DB 구조
* ID(PK)
* 사용날
* 설명
* 금액

### 구현적 요구사항
* vuetify 캘린더 컴포넌트 사용

### 메인 화면
<img width="1439" alt="main화면" src="https://user-images.githubusercontent.com/19687080/104290550-d2801300-54fd-11eb-9afa-3b003f2fffa4.png">

### 가계부 추가 화면
<img width="1140" alt="create화면" src="https://user-images.githubusercontent.com/19687080/104290571-d875f400-54fd-11eb-9a68-aff4d15d9109.png">

### 수정 페이지
<img width="1437" alt="edit 화면" src="https://user-images.githubusercontent.com/19687080/104400934-8fbe4980-5596-11eb-8953-cb9bf8b8a59a.png">

### detail 페이지
<img width="1440" alt="디테일 화면" src="https://user-images.githubusercontent.com/19687080/104400961-9c42a200-5596-11eb-9cb2-fcb1bbd84a50.png">

### database 구조
```sql
create table housekeepingbook(
	id int primary key auto_increment,
	use_at datetime default CURRENT_TIMESTAMP NOT NULL,
    price int,
    description varchar(150)
);

insert into housekeepingbook(use_at, price, description) 
	values("2021-01-02 11:13:55", 1500, "간식"),
    ("2021-01-12 11:14:55", 5500, "밥"),
    ("2021-01-20 11:43:55", 11500, "술"),
    ("2021-01-23 12:13:55", 21500, "간식"),
    ("2021-01-02 11:33:55", 4500, "밥"),
    ("2021-01-17 16:13:55", 8500, "밥"),
    ("2021-01-11 17:13:55", 3500, "간식");
```