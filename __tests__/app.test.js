const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('15_auth_teddy_gram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should signup a user using POST', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'test@test.com', password: 'test' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'test@test.com',
          password: 'test'
        });
      });
  });
});
