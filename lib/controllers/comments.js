const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Comment = require('../models/Comments');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment
      .create({ userId: req.user.id, gramId: req.params.id, ...req.body })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .delete({ id: req.params.id, userId: req.user.id })
      .then(comment => res.send(comment))
      .catch(next);
  })
;
