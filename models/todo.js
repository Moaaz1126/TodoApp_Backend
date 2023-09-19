const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  }, 
  user: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('ToDo', todoSchema)