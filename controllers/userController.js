const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const userController = {
  register: async (req, res) => {
    const user = await User.create({ ...req.body })

    const accessToken = createAccessToken({ userId: user._id })
    const refreshToken = createRefreshToken({ userId: user._id })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/user/refresh_token',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    })

    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: user.name }, token: accessToken })
  },
  refreshToken: async (req, res) => {
    const ref_token = req.cookies.refreshToken
    if (!ref_token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Please Login or Register' })
    }

    try {
      const user = jwt.verify(ref_token, process.env.REFRESH_TOKEN_SECRET)
      const accessToken = createAccessToken({ userId: user.userId })
      res.status(StatusCodes.OK).json({ token: accessToken })
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Please Login or Register' })
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Please provide email and password' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Invalid credentials' })
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'Invalid credentials' })
    }

    const accessToken = createAccessToken({ userId: user._id })
    const refreshToken = createRefreshToken({ userId: user._id })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/user/refresh_token',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    })

    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name }, token: accessToken })
  },
  logout: async (req, res) => {
    res.clearCookie('refreshToken', { path: '/user/refresh_token' })
    res.status(StatusCodes.OK).json({ msg: 'Logged out' })
  },
  getUser: async (req, res) => {
    const { userId } = req.user

    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User doesn't exist" })
    }

    res.status(StatusCodes.OK).json(user)
  },
  addCart: async (req, res) => {
    const { userId } = req.user

    const user = await User.findById(userId)
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'User does not exist.' })

    await User.findOneAndUpdate(
      { _id: userId },
      {
        cart: req.body.cart,
      }
    )

    return res.status(StatusCodes.OK).json({ msg: 'Added to cart.' })
  },
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userController
