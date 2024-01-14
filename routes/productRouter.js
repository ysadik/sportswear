const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router
  .route('/products')
  .get(productController.getProducts)
  .post(auth, authAdmin, productController.createProduct)

router.route('/all').get(productController.getAllProducts)

router
  .route('/products/:id')
  .delete(auth, authAdmin, productController.deleteProduct)
  .patch(auth, authAdmin, productController.updateProduct)

module.exports = router
