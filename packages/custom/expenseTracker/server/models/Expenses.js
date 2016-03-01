var mongoose = require('mongoose');

var ExpenseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  amount: {type: Number, min: 0 },
  date: { type: Date, default: Date.now },
  category: {type: String, default: 'un-categorized'}
});

mongoose.model('Expenses', ExpenseSchema);