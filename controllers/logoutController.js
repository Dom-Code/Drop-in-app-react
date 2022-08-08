require('dotenv').config();

const handleLogOut = async (req, res) => {
  const authHeader = req.headers.authorization;

  try {
    if (authHeader) {
      const refreshToken = authHeader.split(' ')[1];

      await res.locals.store.addToBlackList(refreshToken);
      return res.status(200).json('Successfully Loged out.');
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

module.exports = handleLogOut;
