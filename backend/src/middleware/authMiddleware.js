const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Seller = require('../models/Seller');

const protect = async (req, _res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized, token missing', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let account = null;

    if (decoded.accountType === 'seller') {
      account = await Seller.findById(decoded.id).select('-password -passwordResetToken -passwordResetExpires');
    } else {
      account = await User.findById(decoded.id).select('-password -passwordResetToken -passwordResetExpires');
    }

    if (!account || account.isBlocked) {
      return next(new AppError('Account not found or blocked', 401));
    }

    req.user = account;
    req.auth = {
      id: decoded.id,
      role: decoded.role,
      accountType: decoded.accountType || 'user',
    };

    return next();
  } catch (error) {
    return next(new AppError('Not authorized, token failed', 401));
  }
};

const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('Forbidden - insufficient permissions', 403));
  }

  return next();
};

module.exports = { protect, authorizeRoles };