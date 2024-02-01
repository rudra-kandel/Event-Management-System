// ======================= MODULES =====================
// THIRD PARTY/CORE MODULES
const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');

// For authenticating the request user
module.exports.authentication = (req, res, next) => {
  const bearerToken = req.header('Authorization') || req.header('RefreshToken');
  if (!bearerToken)
    return res.status(403).json({ status: false, message: 'Unauthorized/Token not valid', });

  try {
    const token = bearerToken.split(" ");
    if (token[1]) {
      req.user = jwt.verify(token[1], process.env.APP_PRIVATE_KEY);
      return next();
    }
    return res.status(403).json({ status: false, message: 'Token required' });
  }
  catch (err) {
    if (err instanceof TokenExpiredError)
      return res.status(401).json({ status: false, message: 'Token Expired' });
    return res.status(403).json({ status: false, message: 'Token not valid' });
  }
}

// For authenticating the request user
module.exports.authenticationForAll = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (bearerToken) {
    try {
      const token = bearerToken.split(" ");
      if (token[1]) {
        req.user = jwt.verify(token[1], process.env.APP_PRIVATE_KEY);
      }
    }
    catch (err) { }
  }
  next();
}

// For Authorization the user
module.exports.authorization = (...roles) => (req, res, next) => {
  if (roles.includes(req.user.role))
    return next();
  return res.status(406).json({ status: false, msg: `Unauthorized, must be a ${roles.join(' or ')}, to access this route` });
}