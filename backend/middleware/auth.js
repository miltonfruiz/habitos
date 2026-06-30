const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Please authenticate.' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { authenticate };