const BookModel = require("../models/Book");
const UserModel = require("../models/User");

const bookTree = require("../data/bookTree");
const userTable = require("../data/userTable");
const LinkedList = require("../structures/linkedList");

// Add Book
exports.addBook = async (req, res) => {
  const { id, title, author, quantity } = req.body;
  if (bookTree.search(id)) return res.status(400).json({ message: "Book already exists" });

  const book = { id, title, author, quantity };
  bookTree.insert(book);
  await BookModel.create(book);
  res.json({ message: "Book added" });
};

// Get Book
exports.getBook = (req, res) => {
  const book = bookTree.search(parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

// Get All Books
exports.getAllBooks = (req, res) => {
  const books = [];
  bookTree.inOrderTraversal(bookTree.root, book => books.push(book));
  res.json(books);
};

// Update Book
exports.updateBook = async (req, res) => {
  const { id, ...updates } = req.body;
  const success = bookTree.update(id, updates);
  if (!success) return res.status(404).json({ message: "Book not found" });

  await BookModel.findOneAndUpdate({ id }, updates);
  res.json({ message: "Book updated" });
};

// Delete Book
exports.deleteBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const found = bookTree.search(id);
  if (!found) return res.status(404).json({ message: "Book not found" });

  bookTree.delete(id);
  await BookModel.deleteOne({ id });
  res.json({ message: "Book deleted" });
};

// Add User
exports.addUser = async (req, res) => {
  const { userId, name, courseId, semester } = req.body;
  if (userTable.find(userId)) return res.status(400).json({ message: "User already exists" });

  const history = new LinkedList();
  const user = { id: userId, name, courseId, semester, history };
  userTable.add(user);

  await UserModel.create({ userId, name, courseId, semester, history: [] });
  res.json({ message: "User added" });
};

// Get User
exports.getUser = (req, res) => {
  const user = userTable.find(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Get All Users
exports.getAllUsers = (req, res) => {
  res.json(userTable.getAllUsers());
};

// Borrow Book
exports.borrowBook = async (req, res) => {
  const { userId, bookId } = req.body;
  const user = userTable.find(userId);
  const book = bookTree.search(bookId);

  if (!user || !book) return res.status(404).json({ message: "User or book not found" });
  if (book.quantity <= 0) return res.status(400).json({ message: "Book not available" });

  book.quantity--;
  user.history.add(bookId);

  await BookModel.updateOne({ id: bookId }, { quantity: book.quantity });
  await UserModel.updateOne(
    { userId },
    { $push: { history: { bookId } } }
  );

  res.json({ message: "Book borrowed" });
};

// Return Book
exports.returnBook = async (req, res) => {
  const { userId, bookId } = req.body;
  const user = userTable.find(userId);
  const book = bookTree.search(bookId);

  if (!user || !book) return res.status(404).json({ message: "User or book not found" });

  book.quantity++;
  user.history.remove(bookId);

  await BookModel.updateOne({ id: bookId }, { quantity: book.quantity });
  await UserModel.updateOne(
    { userId },
    { $pull: { history: { bookId: bookId } } }
  );

  res.json({ message: "Book returned" });
};

// Get User History
exports.getUserHistory = async (req, res) => {
  const user = userTable.find(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const history = [];
  let node = user.history.head;
  while (node) {
    history.push({ bookId: node.bookId, date: node.date });
    node = node.next;
  }

  res.json(history);
};
