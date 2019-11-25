const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')
const userSchema = new Schema({
  url: String,
  images: Array,
  amenities: Array,
  description: String,
  guests: Number,
  bedroom: Number,
  bed: Number,
  timestamp: {type: String, default: moment().format()}
}, {strict: false});

module.exports = mongoose.model('property', userSchema);
