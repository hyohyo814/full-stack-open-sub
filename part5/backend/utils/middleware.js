const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '');
    // console.log(req)
  }

  next();
};

const userExtractor = async (req, res, next) => {
  console.log(req.token);
  if (!req.token) {
    return res.status(401).json({ error: 'jwt must be provided' });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  // console.log(decodedToken.id);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  const target = await User.findById(decodedToken.id);
  req.user = target;
  return next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: err.message });
  }

  next(err);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
