import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ── Auth ──
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (userData) => API.post("/auth/register", userData);

// ── Books ──
export const getBooks = (search) =>
    API.get("/books", { params: search ? { search } : {} });
export const getBook = (id) => API.get(`/books/${id}`);
export const addBook = (bookData) => API.post("/books", bookData);
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export default API;
