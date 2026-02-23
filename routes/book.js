const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res, next) => {
    const { title, author, published_year, isbn } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            error: "Validation Failed",
            message: "Title and Author are required fields."
        });
    }

    if (published_year && isNaN(published_year)) {
        return res.status(400).json({
            error: "Validation Failed",
            message: "Published year must be a number."
        });
    }

    try {
        const result = await db.query("INSERT INTO books(title,author,published_year,isbn) VALUES ($1,$2,$3,$4) RETURNING *", [title, author, published_year, isbn]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        next(err); // Pass error to the global handler
    }
});

router.get("/", async (req, res, next) => {
    try {
        const result = await db.query("SELECT * FROM books");
        res.status(200).json(result.rows);
    }
    catch (err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params; //Fetch id from the URL

    try {
        const result = await db.query("SELECT * FROM books WHERE id=$1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Book not Found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { title, author, published_year, isbn } = req.body;

    try {
        const result = await db.query("UPDATE books SET title=$1, author=$2, published_year=$3, isbn=$4 WHERE id=$5 RETURNING *", [title, author, published_year, isbn, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Book not Found" });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await db.query("DELETE FROM books where id=$1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book deleted successfully", deletedBook: result.rows[0] });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;