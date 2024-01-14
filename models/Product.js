const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: [true, 'Please provide an id'],
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    images: {
      type: Object,
      required: [true, 'Please provide image'],
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)

productSchema.pre('save', function () {
  this.title = this.title.toLowerCase()
})
