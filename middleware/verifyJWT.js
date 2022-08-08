const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(404).json({ success: false, msg: 'Token not found' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, null, (err) => {
      if (err) {
        return res.status(403).json({ success: false, msg: err.message });
      }
      next();
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = verifyJWT;
