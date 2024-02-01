const winston = require('winston');

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);
  // RETURNING MSG TO USER
  if (err.name === "ValidationError") {
    let errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).json({ status: false, msg: errors });
  }
  else if (err.code == 11000) {
    let key = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: false,
      msg: `${key[0].toUpperCase() + key.substring(1)} must be unique.`,
      err: { [key]: `${key[0].toUpperCase() + key.substring(1)} must be unique.` }
    });
  }
  return res.status(500).json({ status: false, msg: err.message });
}