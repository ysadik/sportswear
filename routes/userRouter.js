const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

router.post('/register', userController.register)
router.get('/refresh_token', userController.refreshToken)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/info', auth, userController.getUser)
router.patch('/addcart', auth, userController.addCart)

module.exports = router
