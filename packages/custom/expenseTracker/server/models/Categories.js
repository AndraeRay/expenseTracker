var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  categories: [String]
});

mongoose.model('Categories', CategorySchema);