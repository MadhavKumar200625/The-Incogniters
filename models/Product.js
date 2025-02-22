const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true // URL of product image
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tradeOptions: {
    type: [String], 
    default: [] // Items user is willing to exchange for
  },
  location: {
    type: String,
    required: true 
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;