const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const { StatusCodes } = require('http-status-codes')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const removeTmp = (file) => {
  if (file.buffer) {
    file.buffer = null
  }
}

router.post('/upload', auth, authAdmin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'No files uploaded.' })
    }

    const file = req.file

    if (file.size > 1024 * 1024) {
      removeTmp(file)
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'File too large' })
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Incorrect file format' })
    }

    cloudinary.v2.uploader
      .upload_stream({ folder: 'sportswear' }, async (err, result) => {
        if (err) throw err
        removeTmp(file)
        res
          .status(StatusCodes.OK)
          .json({ public_id: result.public_id, url: result.secure_url })
      })
      .end(file.buffer)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message })
  }
})

router.post('/destroy', auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body

    if (!public_id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'No image selected' })
    }

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err
      res.status(StatusCodes.OK).json({ msg: 'Deleted image' })
    })
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message })
  }
})

module.exports = router
