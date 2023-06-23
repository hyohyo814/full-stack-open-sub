const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const errorHandler = (err, req, res, next) => {
  // logger.error(err.message);

  if (err.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: err.message });
  }

  next(err);
};

const getTokenFrom = (req) => {
  const auth = req.get('Authorization')
  console.log(`Authorization ${auth}`)
  if (auth === undefined) {
    return null;
  }
  console.log(`substring ${auth.substring(7)}`)
  return auth.substring(7);
};

const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req);
  next();
};

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req);
  console.log(`token: ${token}`);
  if (!token) {
    return res.status(401).json({ error: 'jwt must be provided' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  // console.log(decodedToken.id);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  req.user = await User.findById(decodedToken.id);
  // console.log(req.user);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
