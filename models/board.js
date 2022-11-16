const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./options');

const boardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  description: {
    type: String,
    default: `Add description here`
  },
  position: {
    type: Number
  },
  favourite: {
    type: Boolean,
    default: false
  },
  favouritePosition: {
    type: Number,
    default: 0
  }
}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema)