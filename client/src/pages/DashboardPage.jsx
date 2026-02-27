import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "../services/api";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";

export default function DashboardPage() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const { isAuthenticated } = useAuth();

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const { data } = await getBooks(search);
            setBooks(data);
        } catch (err) {
            setError("Failed to load books. Is the backend running?");
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        const debounce = setTimeout(fetchBooks, 300);
        return () => clearTimeout(debounce);
    }, [fetchBooks]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteBook(deleteTarget.id);
            setBooks((prev) => prev.filter((b) => b.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            setError("Failed to delete book.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1 className="dashboard__title">
                    Your <span>Bookshelf</span>
                </h1>

                <div className="search-bar">
                    <span className="search-bar__icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {isAuthenticated && (
                    <Link to="/books/new" className="btn btn--primary">
                        ➕ Add Book
                    </Link>
                )}
            </div>

            {error && <div className="error-msg" style={{ marginBottom: "1.5rem" }}>{error}</div>}

            {loading ? (
                <div className="loader">
                    <div className="spinner"></div>
                </div>
            ) : books.length === 0 ? (
                <div className="book-grid book-grid--empty">
                    <div className="empty-state">
                        <span className="empty-state__icon">📖</span>
                        <p className="empty-state__text">
                            {search ? "No books match your search." : "No books yet. Add your first one!"}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="book-grid">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onDelete={setDeleteTarget}
                        />
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__icon">⚠️</div>
                        <h2 className="modal__title">Delete Book</h2>
                        <p className="modal__text">
                            Are you sure you want to delete <strong>"{deleteTarget.title}"</strong>? This action cannot be undone.
                        </p>
                        <div className="modal__actions">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setDeleteTarget(null)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--danger"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
