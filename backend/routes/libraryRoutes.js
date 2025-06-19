const express = require("express");
const router = express.Router();
const controller = require("../controllers/libraryController");

// 📚 Book Routes
router.post("/add-book", controller.addBook);
router.get("/get-all-books", controller.getAllBooks);

// 👤 User Routes
router.post("/add-user", controller.addUser);
router.get("/get-all-users", controller.getAllUsers);

// 🔁 Borrow / Return
router.post("/borrow", controller.borrowBook);
router.post("/return", controller.returnBook);

// 📜 History
router.get("/history/:userId", controller.getUserHistory);

// 📊 Admin - Grouped Views
router.get("/all-books-by-department", controller.getBooksGroupedByDept);
router.get("/all-users-by-department", controller.getUsersGroupedByDept);

module.exports = router;
