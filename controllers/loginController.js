const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function handleAuth(req, res) {
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
      { expiresIn: '3m' },
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    res.status(200).json({ status: 'Logged in', accessToken: accessToken, refreshToken: refreshToken });
  }
}

module.exports = handleAuth;
