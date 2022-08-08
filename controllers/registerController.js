const bcrypt = require('bcrypt');

async function handleReg(req, res) {
  const { firstName, lastName, pw } = req.body;
  const email = req.body.email.toLowerCase();

  const isDuplicate = await res.locals.store.checkDuplicate(email);

  if (!isDuplicate) {
    try {
      const hashedPw = await bcrypt.hash(pw, 10);
      await res.locals.store.addUser(firstName, lastName, email, hashedPw);
      res.json('Success: User registered.');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(409).json('You already have an account');
  }
}

// checks if user already has an account.
// if not, we uses bcrypt to encript the password and save it to the db along
// with the users information. 

module.exports = handleReg;
