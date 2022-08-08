const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleAuth = async (req, res) => {
  const { email, pw } = req.body;

  if (!email || !pw) {
    return res.status(400).json({ auth: false, message: 'Email and password are required.' });
  }

  // Here we require both an email and a pw to log in.

  const foundUser = (await res.locals.store.getEmail(email))[0];

  if (!foundUser) {
    return res.status(401).json({ auth: false, message: 'User not found' });
  }

  // if email is not stored in database, return 401 error.

  const adjustPw = foundUser.pw.slice(1, foundUser.pw.length);
  const pwMatch = await bcrypt.compare(pw, adjustPw);

  if (!pwMatch) {
    return res.status(401).json({ auth: false, message: 'Incorrect email or password' });
  }

  // We use bcrypt to compare the entered pw with the one saved in the database.

  if (pwMatch) {
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20' },
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '45m' },
    );
    return res.status(200).json({ status: 'Logged in', accessToken, refreshToken });
    // The access token expires in 3 min. At expiration the frontend will send the refresh
    // token and recieve a new access token.
  }
};

module.exports = handleAuth;
