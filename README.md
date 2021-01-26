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
* 월/일/4일/주 단위로 종합 하기

### DB 구조
* ID(PK)
* 사용날
* 설명
* 금액
* 소비 type(입금, 출금)

### 구현적 요구사항
* vuetify 캘린더 컴포넌트 사용

### 메인 화면 month
<img width="1440" alt="month" src="https://user-images.githubusercontent.com/19687080/105119178-29e03d80-5b13-11eb-906f-59e9761f8745.png">

### 메인 화면 week
<img width="1440" alt="week main" src="https://user-images.githubusercontent.com/19687080/105119204-349ad280-5b13-11eb-867e-28757fae728d.png">

### 메인 화면 4days
<img width="1440" alt="4days" src="https://user-images.githubusercontent.com/19687080/105119091-f1d8fa80-5b12-11eb-911c-bc1e515103e5.png">

### 메인 화면 day
<img width="1436" alt="day" src="https://user-images.githubusercontent.com/19687080/105119150-17fe9a80-5b13-11eb-8721-f9c626035f78.png">

### 가계부 추가 화면
<img width="1433" alt="add new housekeep" src="https://user-images.githubusercontent.com/19687080/105119241-467c7580-5b13-11eb-9b87-a4d64a34d53b.png">

### 수정 페이지
<img width="1440" alt="edit" src="https://user-images.githubusercontent.com/19687080/105119311-657b0780-5b13-11eb-968e-1a19c770c9d7.png">

### delete
<img width="1435" alt="delete check" src="https://user-images.githubusercontent.com/19687080/105119286-58f6af00-5b13-11eb-9e6f-a97d1824bdc3.png">

### 가계부 집계 modal창
<img width="1440" alt="ui변경 집계" src="https://user-images.githubusercontent.com/19687080/105471873-922f4a80-5cde-11eb-8336-16ec03940714.png">

### database 구조
```sql
create table housekeepingbook(
	id int primary key auto_increment,
	use_at datetime default CURRENT_TIMESTAMP NOT NULL,
    spent_type int,
    price int,
    description varchar(150)
);

insert into housekeepingbook(use_at, price, description, spent_type) 
	values("2021-01-02 11:13:55", 1500, "간식", 1),
    ("2021-01-12 11:14:55", 5500, "밥", 1),
    ("2021-01-20 11:43:55", 11500, "술", 1),
    ("2021-01-23 12:13:55", 21500, "간식", 1),
    ("2021-01-02 11:33:55", 4500, "밥", 1),
    ("2021-01-17 16:13:55", 8500, "밥", 1),
    ("2021-01-11 17:13:55", 3500, "간식", 1),
    ("2021-01-15 15:31:55", 2000000, "인턴 실습비", 0);
```
