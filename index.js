const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const morgan = require("morgan");
const requestTimer = require("./middleware/timer");
require("dotenv").config();
const bookRouter = require("./routes/book");

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Personal Bookshelf API',
            version: '1.0.0',
            description: 'A simple API to manage your personal book collection',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(morgan("dev"));
app.use(express.json()); // Middleware to read the data sent in the request body
app.use(requestTimer);

app.use("/books", bookRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the error for the developer

    res.status(err.status || 500).json({
        error: "Internal Server Error",
        message: err.message || "Something went wrong on our side!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
})