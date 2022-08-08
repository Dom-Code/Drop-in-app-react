require('dotenv').config();

const handleLogOut = (req, res) => {
  function logOut() {
    console.log(req.headers.cookie);
  }
  return logOut;
};

module.exports = handleLogOut;
