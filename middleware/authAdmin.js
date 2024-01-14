const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const authAdmin = async (req, res, next) => {
  const { userId } = req.user

  const user = await User.findById(userId)

  if (user.role === 'user') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Admin resources access denied' })
  }
  next()
}

module.exports = authAdmin
