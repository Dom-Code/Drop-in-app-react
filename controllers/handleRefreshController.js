const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.headers.authorization.split(' ')[1];

  try {
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, null, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: err.message });
        }
        const newAccessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '2m' },
        );

        return res.status(200).json({ accessToken: newAccessToken });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleRefreshToken;
