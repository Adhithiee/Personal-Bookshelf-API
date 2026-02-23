const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authServices = require("../services/authServices");

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Missing fields", message: "Username, email, and password are required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await authServices.createUser(username, email, hashedPassword);
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Request body is missing. Ensure you are sending JSON and have set 'Content-Type: application/json' header."
            });
        }

        const { email, password } = req.body;
        const user = await authServices.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        next(err);
    }
}

module.exports = { register, login };
