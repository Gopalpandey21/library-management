const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book");
const User = require("./models/User");

const bookTree = require("./data/bookTree");
const userTable = require("./data/userTable");
const LinkedList = require("./structures/linkedList");

const libraryRoutes = require("./routes/libraryRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/library", libraryRoutes);

// app.use(express.static("public"));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Load Books into AVL Tree
    const books = await Book.find();
    books.forEach(book => bookTree.insert(book));
    console.log(`📚 ${books.length} books loaded into AVL Tree`);

    // Load Users into Hash Table
    const users = await User.find();
    users.forEach(user => {
      const linkedList = new LinkedList();
      user.history.forEach(entry => linkedList.add(entry.bookId));
      userTable.add({
        id: user.userId,
        name: user.name,
        courseId: user.courseId,
        semester: user.semester,
        history: linkedList
      });
    });
    console.log(`👤 ${users.length} users loaded into Hash Table`);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
