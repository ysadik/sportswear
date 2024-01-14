const Category = require('../models/Category')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const categoryController = {
  getCategories: async (req, res) => {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json(categories)
  },
  createCategory: async (req, res) => {
    const category = await Category.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ msg: 'Created a category' })
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryName = req.params.name

      // Check if any products are associated with the category name
      const products = await Product.find({ category: categoryName })

      if (products.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: `Cannot delete category with associated products` })
      }

      // If no associated products, delete the category
      const category = await Category.findOneAndDelete({ name: categoryName })

      if (!category) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: `No category with name: ${categoryName}` })
      }

      res.status(StatusCodes.OK).json({ msg: 'Deleted category' })
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
  },
  updateCategory: async (req, res) => {
    const { name } = req.body
    const categoryId = req.params.id

    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Name cannot be empty' })
    }

    const category = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { name },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!category) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `No category found with id of: ${categoryId}` })
    }

    res.status(StatusCodes.OK).json({ msg: 'Updated a category' })
  },
}

module.exports = categoryController
