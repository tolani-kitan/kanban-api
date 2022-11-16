const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./options');

const cardSchema = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  position: {
    type: Number
  }
}, schemaOptions);

module.exports = mongoose.model('Card', cardSchema);