const mongoose = require('mongoose');

// create schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], // displayed error when missing
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// create model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
