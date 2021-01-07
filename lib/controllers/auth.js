const { Router } = require('express');
const UserService = require('../services/UserServices');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        res.cookie('session', UserService.authToken(user), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          sameSite: 'none',
          // secure: process.env.NODE_ENV === 'production'
        });
        res.send(user);
      })
      .then(() => console.log(res.cookies, 'INSIDE SIGNUP!'))
      .catch(next);
  })
  
  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        res.cookie('session', UserService.authToken(user), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          sameSite: 'none',
          // secure: process.env.NODE_ENV === 'production'
        });
        res.send(user);
      })
      .catch(next);
  })
  
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
