const initializeMongoServer = require('./mongoTestConfig'),
      authRouter = require('../routers/auth'),
      request = require('supertest'),
      assert = require('assert'),
      express = require('express'),
      app = express();
require('../passport');

app.use(express.urlencoded({extended: false}));
app.use('/api', authRouter);

describe('insert', () => {
  let mockData = {username: 'User1', password: 'aPassword'},
      database;

  beforeAll(async () => {
    database = initializeMongoServer();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  describe('POST /signup', () => {
    it('returns new user', done => {
      request(app)
      .post('/api/signup')
      .send(JSON.stringify(mockData))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        let data = JSON.parse(res.body);

        assert(data.user.username, mockData.username);
        assert(typeof data.user.password, 'string');
        done();
      })
      .catch(err => done(err));
    });
  });

  describe('POST /login', () => {
    it('returns user and JWT', done => {
      request(app)
      .post('/api/login')
      .send(JSON.stringify(mockData))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        let data = JSON.parse(res.body);

        assert(data.user.username, mockData.username);
        assert(typeof data.user.password, 'string');
        assert(typeof data.token, 'string');
        done();
      })
      .catch(err => done(err));
    });
  });
});