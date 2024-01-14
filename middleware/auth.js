const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Authentication invalid' })
  }

  try {
    // payload
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = { userId: user.userId }
    next()
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Authentication invalid' })
  }
}

module.exports = auth
