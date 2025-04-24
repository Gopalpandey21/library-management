const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  bookId: Number,
  date: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: String,
  courseId: String,
  semester: Number,
  history: [HistorySchema]
});

module.exports = mongoose.model("User", UserSchema);
