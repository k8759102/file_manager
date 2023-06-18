# file_manager

## 설치 시, 문제 발생
1. vue create UnauthorizedAccess - vue.cmd create 프로젝트명
2. Parsing error: No Babel config file detected - Ctrl + , 키 누른 후, JSON 설정 파일에서 "eslint.workingDirectories": [{ "mode": "auto" }] 추가

## 서버 sequelize 설정
1. 관련 사항 설치
- npm install --save sequelize
- npm i -g sequelize-cli sequelize-auto mysql2
3. sequelize.cmd init로 초기화
4. 기존 생성한 테이블을 불러와서 설정 - sequelize-auto -o "./models" -d [db이름] -h [host이름] -u [사용자] -p [포트] -x [비밀번호] -e [데이터베이스종류]

## 기능 정의

1. 회원가입 및 로그인 기능
2. 파일 업로드 및 다운로드 기능 
3. 파일 휴지통 및 완전 삭제 기능
4. 파일 및 폴더 공유 기능 
5. 권한 관리
6. 용량 제한 기능 (용량 랜덤 또는 임의 부여)
