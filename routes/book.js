const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookControllers");

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book to the collection
 *     responses:
 *       201:
 *         description: Book created successfully.
 */
router.post("/", bookController.addBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     responses:
 *       200:
 *         description: A list of books.
 */
router.get("/", bookController.getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
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
 *     summary: Update an existing book
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
router.put("/:id", bookController.modifyBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book from the collection
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
router.delete("/:id", bookController.removeBook);

module.exports = router;
