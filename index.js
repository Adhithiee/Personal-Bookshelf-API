const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const bookRouter = require("./routes/book");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json()); // Middleware to read the data sent in the request body

app.use("/books", bookRouter);

app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the error for the developer

    // Send a clean, professional JSON response to the user
    res.status(err.status || 500).json({
        error: "Internal Server Error",
        message: err.message || "Something went wrong on our side!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})