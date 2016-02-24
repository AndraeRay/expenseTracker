var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  categories: [String]
});

mongoose.model('Categories', CategorySchema);