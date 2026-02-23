const db = require("../db");

const getAllBooks = async (search) => {
    let result;
    if (search) {
        result = await db.query("SELECT * FROM books WHERE title ILIKE $1 or author ILIKE $1", [`%${search}%`]);
    }
    else result = await db.query("SELECT * FROM books");

    return result.rows;
};

const addNewBook = async (title, author, published_year, isbn) => {
    const result = await db.query(
        'INSERT INTO books (title, author, published_year, isbn) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, author, published_year, isbn]
    );
    return result.rows[0];
}

const getOneBook = async (id) => {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0];
}

const updateBook = async (id, title, author, published_year, isbn) => {
    const result = await db.query(
        "UPDATE books SET title = $1, author = $2, published_year = $3, isbn = $4 WHERE id = $5 RETURNING *",
        [title, author, published_year, isbn, id]
    );
    return result.rows[0];
}

const deleteBook = async (id) => {
    const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}
module.exports = { getAllBooks, addNewBook, getOneBook, updateBook, deleteBook };
