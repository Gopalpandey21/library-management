const express = require("express");
const router = express.Router();
const controller = require("../controllers/libraryController");

router.post("/add-user", controller.addUser);
router.get("/get-user/:userId", controller.getUser);
router.get("/get-all-users", controller.getAllUsers);

router.post("/add-book", controller.addBook);
router.get("/get-book/:id", controller.getBook);
router.get("/get-all-books", controller.getAllBooks);
router.put("/update-book", controller.updateBook);
router.delete("/delete-book/:id", controller.deleteBook);

router.post("/borrow", controller.borrowBook);
router.post("/return", controller.returnBook);
router.get("/history/:userId", controller.getUserHistory);

module.exports = router;
