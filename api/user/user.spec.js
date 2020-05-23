// test code
const app = require('../../index');
const should = require('should');
const request = require('supertest');
const models = require('../../models');


describe('GET /users는', () => {
  const users = [{name: 'alice'}, {name: 'bob'}, {name: 'chris'}];
  // mocha에서는 promise를 return하면 자동으로 완료되는 것을 보장해준다.
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('성공시', () => {
    it('유저 객체를 담은 배열로 응답함', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    
    it('최대 limit 갯수만큼 응답한다', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다', (done) => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done);
    });
    /*
    it('offset이 숫자형이 아니면 400을 응답한다.', (done) => {
      미구현
    });
    */
  });
});

describe('GET /users/:id는', () => {
  const users = [{name: 'alice'}, {name: 'bob'}, {name: 'chris'}];
  // mocha에서는 promise를 return하면 자동으로 완료되는 것을 보장해준다.
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('성공시', () => {
    it('id가 1인 유저 객체를 반환한다.', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done);
    });

    it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done) => {
      request(app)
        .get('/users/999')
        .expect(404)
        .end(done);
    });
  });
});

describe('DELETE /users/:id는', () => {
  const users = [{name: 'alice'}, {name: 'bob'}, {name: 'chris'}];
  // mocha에서는 promise를 return하면 자동으로 완료되는 것을 보장해준다.
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('성공시', () => {
    it('204를 응답한다.', (done) => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done);
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done);
    });
  });
});

describe('POST /users는', () => {
  const users = [{name: 'alice'}, {name: 'bob'}, {name: 'chris'}];
  // mocha에서는 promise를 return하면 자동으로 완료되는 것을 보장해준다.
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('성공시', () => {
    let name = 'daniel',
        body;
    before((done) => {
      request(app)
        .post('/users')
        .send({name: name})  // send로 body 값을 입력할 수 있다. JSON형식으로 입력
        .expect(201)  // 201 상태 코드를 반환한다.
        .end((err,res) => {
          body = res.body;
          done();
        });
    });
    
    it('생성된 유저 객체를 반환한다.', () => {
      body.should.be.have.property('id');
    });

    it('입력한 name을 반환한다.', () => {
      body.should.be.have.property('name', name);
    });
  });

  describe('실패시', () => {
    it('name 파라미터 누락시 400을 반환한다.', (done) => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done);
    });

    it('name이 중복일 경우 409를 반환한다.', (done) => {
      request(app)
        .post('/users')
        .send({name: 'daniel'})
        .expect(409)
        .end(done);
    });
  });
});

describe('PUT /users/:id는', () => {
  const users = [{name: 'alice'}, {name: 'bob'}, {name: 'chris'}];
  // mocha에서는 promise를 return하면 자동으로 완료되는 것을 보장해준다.
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('성공시', () => {
    it('변경된 정보를 응답한다.', (done) => {
      const name = 'Charlie';
      request(app)
        .put('/users/3')
        .send({name: name})
        .end((err, res) => {
          res.body.should.have.property('name', name);
          done();
        });
    });
  });

  describe('실패시', () => {
    let name = 'Steve';
    it('정수가 아닌 id일 경우 400응답', (done) => {
      request(app)
        .put('/users/three')
        .send({name: name})
        .expect(400)
        .end(done);
    });
    
    it('name이 없는 경우 400응답', (done) => {
      request(app)
        .put('/users/3')
        .send({})
        .expect(400)
        .end(done);
    });

    it('없는 유저일 경우 404응답', (done) => {
      request(app)
        .put('/users/999')
        .send({name: name})
        .expect(404)
        .end(done);
    });

    it('이름이 중복일 경우 409응답', (done) => {
      name = 'bob';
      request(app)
        .put('/users/3')
        .send({name: name})
        .expect(409)
        .end(done);
    });
  });
});