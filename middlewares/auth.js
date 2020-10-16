const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ msg: 'No token provide' });
  }

  try {
    jwt.verify(token, 'supersecrettoken', (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: 'Token authenticate is denied' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ errors: 'Server error' });
  }
};
