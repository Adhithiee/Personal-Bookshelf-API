import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BookCard({ book, onDelete }) {
    const { isAuthenticated } = useAuth();

    return (
        <div className="book-card animate-in">
            <h3 className="book-card__title">{book.title}</h3>
            <p className="book-card__author">by {book.author}</p>

            <div className="book-card__meta">
                {book.published_year && (
                    <span className="book-card__tag">📅 {book.published_year}</span>
                )}
            </div>

            {isAuthenticated && (
                <div className="book-card__actions">
                    <Link to={`/books/${book.id}/edit`} className="btn btn--secondary btn--sm">
                        ✏️ Edit
                    </Link>
                    <button
                        className="btn btn--danger btn--sm"
                        onClick={() => onDelete(book)}
                    >
                        🗑️ Delete
                    </button>
                </div>
            )}
        </div>
    );
}
