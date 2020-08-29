const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    res.status(401).json({errors: 'Not authenticated'})
  }

  const token = authHeader.split(' ')[1];
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
