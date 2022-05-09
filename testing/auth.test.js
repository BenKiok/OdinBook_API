const authRouter = require('../routers/auth'),
      {MongoClient} = require('mongodb'),
      request = require('supertest'),
      assert = require('assert'),
      express = require('express'),
      app = express();

app.use(express.urlencoded({extended: false}));
app.use('/api', authRouter);

describe('insert', () => {
  let connection,
      db,
      mockData = {username: 'User1', password: 'aPassword'};

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('POST /signup', () => {
    it('returns new user and JWT', done => {
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
        assert(typeof data.token, 'string');
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