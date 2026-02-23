const bookServices = require("../services/bookServices");

const getBooks = async (req, res, next) => {
    try {
        const { search } = req.query;
        const books = await bookServices.getAllBooks(search);
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

const addBook = async (req, res, next) => {
    try {
        const { title, author, published_year, isbn } = req.body;
        // Basic validation
        if (!title || !author) {
            return res.status(400).json({ error: "Title and Author are required" });
        }
        const newBook = await bookServices.addNewBook(title, author, published_year, isbn);
        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
};

const getBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return next();

        const book = await bookServices.getOneBook(id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

const modifyBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author, published_year, isbn } = req.body;
        if (isNaN(id)) return next();

        const updatedBook = await bookServices.updateBook(id, title, author, published_year, isbn);
        if (!updatedBook) return res.status(404).json({ error: "Book not found" });
        res.status(200).json(updatedBook);
    } catch (err) {
        next(err);
    }
};

const removeBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return next();

        const deletedBook = await bookServices.deleteBook(id);
        if (!deletedBook) return res.status(404).json({ error: "Book not found" });
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (err) {
        next(err);
    }
};

module.exports = { getBooks, addBook, getBook, modifyBook, removeBook };