const pool = require('../lib/utils/pool');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');
const Gram = require('../lib/models/Grams');
const Comment = require('../lib/models/Comments');


describe('CRUD routes for comments', () => {
  let agent;
  let user;
  let gram;

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    agent = request.agent(app);
    
    user = await UserService.create({
      email: 'test@test.com',
      password: 'test',
      profilePhoto: 'photo.jpg'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'test'
      });

    gram = await Gram.create({
      photoUrl: 'www.gram.com',
      caption: 'this is the caption',
      tags: ['tag 1', 'tag 2', 'tag 3'],
      userId: user.id
    });
  });

  afterAll(() => {
    return pool.end();
  });

  it('should create new a comment on an existing gram via POST', async() => {
    const res = await agent
      .post('/api/v1/comments')
      .send({
        userId: user.id,
        gramId: gram.id,
        comment: 'comment for the gram!'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: user.id,
      gramId: gram.id,
      comment: 'comment for the gram!'
    });
  });

  it('should delete a comment on an exsisting gram via DELETE', async() => {
    const comment = await Comment.create({ userId: user.id, gramId: gram.id, comment: 'comment for the gram!' });
      
    const res = await agent
      .delete(`/api/v1/comments/${comment.id}`);

    expect(res.body).toEqual({ 
      id: expect.any(String),
      userId: user.id, 
      gramId: gram.id, 
      comment: 'comment for the gram!' 
    });
  });
})
;
