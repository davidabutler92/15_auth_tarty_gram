const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserServices');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .insert(req.body)
      .then(user => res.send(user))
      .catch(next);
  })
  
  .post('/login', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => res.send(user))
  });
