const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');

describe('15_auth_teddy_gram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('should signup a user using POST', async() => {
    return await request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'test@test.com', password: 'test' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'test@test.com',
          passwordHash: expect.any(String)
        });
      });
  });

  it('should login a user viq POST', async() => {
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'test'
    });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'test'
      });

    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      passwordHash: expect.any(String)
    });
  });

});
