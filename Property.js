const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  url: String,
  images: Array,
  amenities: Array,
  description: String,
  guests: Number,
  bedroom: Number,
  bed: Number,
}, {strict: false});

module.exports = mongoose.model('property', userSchema);
