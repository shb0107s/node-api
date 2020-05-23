# 테스트주도개발(TDD)로 만드는 NodeJS API 서버

Inflearn 강의 "테스트주도개발(TDD)로 만드는 NodeJS API 서버"를 수강하며 작성한 미니 앱입니다.

사용 라이브러리

    Server : Express
    Database : Sqlite
        ORM : Sequelize
    Test : Mocha, Should, SuperTest

API 종류

    사용자 목록 조회 (GET /)
    사용자 조회 (GET /user/:id)
    사용자 삭제 (DELETE /user/:id)
    사용자 추가 (POST /user)
    사용자 수정 (PUT /user:id)

간략한 설명

    ./
        index.js : express app 모듈을 생성한 뒤 exports로 공개
        models.js : DB 설정, User 테이블 정의, Sequelize, sequelize, User 공개

        bin/
            sync-db.js : 정의한 테이블들을 바탕으로 DB 동기화
            www.js : 실질적인 서버 실행부. DB 싱크 이후 서버를 listen상태로 만듬
        
        api/user/
            index.js : 라우팅 처리
            user.ctrl.js : 각 엔드포인트에 수행할 작업을 정의. 컨트롤러
            user.spec.js : user.ctrl.js의 함수들이 요구사항을 충족하는지 테스트
