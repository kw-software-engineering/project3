# project3
project3

##기본세팅
1. npm init -y

npm install express mysql2 dotenv body-parser

2.table 세팅
서버에 접속 (localhost나 다른 DB 서버)

왼쪽 Management → Data Import/Restore 클릭

Management가 안 보이면 Server → Data Import 메뉴로 들어가도 됨.

Import 옵션 선택: Import from Self-Contained File 선택
→ 내보낸 .sql 파일 경로 지정

Default Schema to be Imported To: academic_system 등 → 기존 DB 선택 or 새로 만들기

하단의 Start Import 버튼 클릭
→ 이러면 .sql 파일 안에 있던 테이블 구조 + 데이터가 복원됨.

<<mysql 비밀번호 1234 필수>>

##사용법
1. 서버 실행: node server/server.js
2. 브라우저: http://localhost:3000/html/login.html
