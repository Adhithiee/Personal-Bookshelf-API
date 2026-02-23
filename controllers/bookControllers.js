const bookServices = require("../services/bookServices");

const getBooks = async (req, res, next) => {
    try {
        const { search } = req.query;
        const books = await bookServices.getAllBooks(search);
        res.status(200).json(books);
    }
    catch (err) {
        next(err);
    }
};

const addBook = async (req, res, next) => {
    try {
        const { title, author, published_year, isbn } = req.body;
        const books = await bookServices.addNewBook(title, author, published_year, isbn);
        res.status(200).json(books);
    }
    catch (err) {
        next(err);
    }
};

const getBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const books = await bookServices.getOneBook(id);
        res.status(200).json(books);
    }
    catch (err) {
        next(err);
    }
}

const modifyBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author, published_year, isbn } = req.body;
        const books = await bookServices.updateBook(id, title, author, published_year, isbn);
        res.status(200).json(books);
    }
    catch (err) {
        next(err);
    }
}

const removeBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const books = await bookServices.deleteBook(id);
        res.status(200).json(books);
    }
    catch (err) {
        next(err);
    }
}

module.exports = { getBooks, addBook, getBook, modifyBook, removeBook };