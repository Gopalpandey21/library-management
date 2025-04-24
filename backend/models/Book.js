const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  author: String,
  quantity: Number
});

module.exports = mongoose.model("Book", BookSchema);
