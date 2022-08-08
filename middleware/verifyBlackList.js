const verifyBlackList = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (await res.locals.store.searchBlackList(token)) {
        return res.status(401).json('Token has expired. Please sign in again');
      }
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: err.message });
  }
};

module.exports = verifyBlackList;
