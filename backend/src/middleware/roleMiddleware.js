const AppError = require('../utils/AppError');

const requireAccountType = (...accountTypes) => (req, _res, next) => {
  if (!req.auth || !accountTypes.includes(req.auth.accountType)) {
    return next(new AppError('Forbidden - invalid account type', 403));
  }

  return next();
};

module.exports = { requireAccountType };