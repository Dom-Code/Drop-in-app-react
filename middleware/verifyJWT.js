const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(404).json({success: false, msg: "Token not found"});
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, null, (err, data) => {
      if (err) {
        return res.status(403).json({success: false, msg: err.message});
      } else {
        next()
      }
    });

  } catch(err) {
    console.log(err.message)
  }

};

module.exports = verifyJWT;
