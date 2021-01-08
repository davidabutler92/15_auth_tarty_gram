const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/Grams');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .create({ ...req.body, userId: req.user.id })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Gram
      .find()
      .then(gram => res.send(gram))
      .catch(next);
  })

//should include all comments when comments route is created
  .get('/:id', ensureAuth, (req, res, next) => {
    Gram
      .findById(req.params.id)
      .then(gram => res.send(gram))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Gram
      .delete(req.params.id, req.user.id)
      .then(gram => res.send(gram))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Gram
      .patch(req.body, req.params.id, req.user.id)
      .then(gram => res.send(gram))
      .catch(next);
  })
;
