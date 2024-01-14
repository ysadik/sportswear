const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filtering() {
    const queryObj = { ...this.queryString }
    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach((el) => delete queryObj[el])

    let querystr = JSON.stringify(queryObj)
    querystr = querystr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    )
    this.query.find(JSON.parse(querystr))
    return this
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('_createdAt')
    }
    return this
  }

  paginating() {
    const page = Number(this.queryString.page) || 1
    const limit = Number(this.queryString.limit) || 9
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

const productController = {
  getProducts: async (req, res) => {
    const features = new APIfeatures(Product.find({}), req.query)
      .filtering()
      .sorting()
      .paginating()

    const products = await features.query
    res
      .status(StatusCodes.OK)
      .json({ products: products, result: products.length })
  },
  createProduct: async (req, res) => {
    if (req.body.images && Object.keys(req.body.images).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'No image uploaded' })
    }

    const product = await Product.create({ ...req.body })
    res.status(StatusCodes.OK).json({ product })
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.id

    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No product with id of: ${productId}` })
    }

    res.status(StatusCodes.OK).json({ msg: 'Deleted a product' })
  },
  updateProduct: async (req, res) => {
    const productId = req.params.id

    if (req.body.images && Object.keys(req.body.images).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'No image uploaded' })
    }

    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No product with id of: ${productId}` })
    }

    res.status(StatusCodes.OK).json({ product })
  },
  getAllProducts: async (req, res) => {
    const products = await Product.find({})
    res
      .status(StatusCodes.OK)
      .json({ products: products, result: products.length })
  },
}

module.exports = productController
