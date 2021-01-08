const pool = require('../lib/utils/pool');
const request = require('supertest');
const fs = require('fs');
const app = require('../lib/app');
const UserService = require('../lib/services/UserServices');
const Gram = require('../lib/models/Grams');
const Comment = require('../lib/models/Comments');

describe('CRUD routes for grams', () => {
  let agent;
  let user;
  
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
  });

  afterAll(() => {
    return pool.end();
  });



  it('should create new gram via POST', async() => {
    const res = await agent
      .post('/api/v1/grams')
      .send({
        photoUrl: 'www.gram.com',
        caption: 'this is the caption',
        tags: ['tag 1', 'tag 2', 'tag 3'],
        userId: user.id
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      photoUrl: 'www.gram.com',
      caption: 'this is the caption',
      tags: ['tag 1', 'tag 2', 'tag 3'],
      userId: user.id
    });
  });

  it('should get grams via GET', async() => {
    const grams = await Promise.all([
      { photoUrl: 'www.gram.com', caption: 'this is the caption', tags: ['tag 1', 'tag 2', 'tag 3'], userId: user.id },
      { photoUrl: 'www.gram.com', caption: 'this is the caption2', tags: ['tag 1', 'tag 2', 'tag 3'], userId: user.id },
      { photoUrl: 'www.gram.com', caption: 'this is the caption3', tags: ['tag 1', 'tag 2', 'tag 3'], userId: user.id }
    ].map(gram => Gram.create(gram)));

    const res = await agent
      .get('/api/v1/grams/');

    expect(res.body).toEqual(expect.arrayContaining(grams));
    expect(res.body).toHaveLength(grams.length);
  });
  
  it('should get get by id via GET', async() => {
    const gram = await Gram.create({ photoUrl: 'www.gram.com', caption: 'this is the caption', tags: ['tag 1', 'tag 2', 'tag 3'], userId: user.id });
    const comment = await Comment.create({ userId: user.id, gramId: gram.id, comment: 'comment for the gram!' });

    const res = await agent
      .get(`/api/v1/grams/${gram.id}`);

    expect(res.body).toEqual({ 
      id: gram.id,
      photoUrl: 'www.gram.com', 
      caption: 'this is the caption', 
      tags: ['tag 1', 'tag 2', 'tag 3'], 
      userId: user.id,
      comments: [comment] 
    }
    );
  });

  it('should remove a gram by id via DELETE', async() => {
    const gram = await Gram.create({ photoUrl: 'www.gram.com', caption: 'this is the caption', tags: ['tag 1', 'tag 2', 'tag 3'], userId: user.id });

    const res = await agent
      .delete(`/api/v1/grams/${gram.id}`);

    expect(res.body).toEqual({ 
      id: gram.id,
      photoUrl: 'www.gram.com', 
      caption: 'this is the caption', 
      tags: ['tag 1', 'tag 2', 'tag 3'], 
      userId: user.id });
  });

  it('should update a gram by id via PATCH', async() => {
    const gram = await Gram.create({ photoUrl: 'www.gram.com', caption: 'this is the caption', tags: ['tag 1', 'tag 2', 'tag 3'], userId: user.id });

    const res = await agent
      .patch(`/api/v1/grams/${gram.id}`)
      .send({ caption: 'updated caption' });

    expect(res.body).toEqual({ 
      id: gram.id,
      photoUrl: 'www.gram.com', 
      caption: 'updated caption', 
      tags: ['tag 1', 'tag 2', 'tag 3'], 
      userId: user.id 
    });
  });
})
;
