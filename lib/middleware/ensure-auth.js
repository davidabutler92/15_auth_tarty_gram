const UserService = require('../services/UserServices');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    req.user = UserService.verifyAuthToken(token);
    next();
  } catch(err) {
    err.status = 401;
    next(err);
  }
};
