const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }

  // handle duplicate errors
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `Duplicate value in ${Object.keys(err.keyValue)} field`
  }

  // handle validation errors
  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
  }

  // handle cast errors
  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `No item found with id of: ${err.value}`
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandler
