const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookControllers");
const authenticateToken = require("../middleware/authMiddleware"); // New!

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book to the collection (Protected)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Book created successfully.
 */
router.post("/", authenticateToken, bookController.addBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books (Public)
 *     responses:
 *       200:
 *         description: A list of books.
 */
router.get("/", bookController.getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID (Public)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single book object.
 */
router.get("/:id", bookController.getBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book (Protected)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated book object.
 */
router.put("/:id", authenticateToken, bookController.modifyBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book from the collection (Protected)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Confirmation message.
 */
router.delete("/:id", authenticateToken, bookController.removeBook);

module.exports = router;
