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
      .send({ email: 'test@test.com', password: 'test', profilePhoto: 'photo.jpg' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'test@test.com',
          profilePhoto: 'photo.jpg'
        });
      });
  });

  it('should login a user viq POST', async() => {
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'test',
      profilePhoto: 'photo.jpg'
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
      profilePhoto: 'photo.jpg'
    });
  });

  it('should verify that a user is logged in', async() => {
    const agent = request.agent(app);
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'test',
      profilePhoto: 'photo.jpg'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'test',
        profilePhoto: 'photo.jpg'
      });

    const res = await agent
      .get('/api/v1/auth/verify');

    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      profilePhoto: 'photo.jpg'
    });
  });
  
});
