const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/Grams');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .insert({ ...req.body, userId: req.user.id })
      .then(gram => res.send(gram))
      .catch(next);
  });
