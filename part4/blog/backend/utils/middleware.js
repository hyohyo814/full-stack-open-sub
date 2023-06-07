const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.message === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.message === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(err)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}
