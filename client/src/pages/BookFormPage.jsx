import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, addBook, updateBook } from "../services/api";

export default function BookFormPage() {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (!isEdit) return;

        const fetchBook = async () => {
            try {
                const { data } = await getBook(id);
                setTitle(data.title || "");
                setAuthor(data.author || "");
                setPublishedYear(data.published_year || "");

            } catch {
                setError("Failed to load book data.");
            } finally {
                setFetching(false);
            }
        };

        fetchBook();
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !author.trim()) {
            setError("Title and Author are required.");
            return;
        }

        setLoading(true);
        try {
            const bookData = {
                title: title.trim(),
                author: author.trim(),
                published_year: publishedYear ? Number(publishedYear) : null,
            };

            if (isEdit) {
                await updateBook(id, bookData);
            } else {
                await addBook(bookData);
            }
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="form-page">
            <div className="form-card animate-in">
                <h1 className="form-card__title">
                    {isEdit ? "Edit Book" : "Add New Book"}
                </h1>

                <form className="form-card__body" onSubmit={handleSubmit}>
                    {error && <div className="error-msg">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            id="title"
                            type="text"
                            className="form-input"
                            placeholder="e.g. The Great Gatsby"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Author *</label>
                        <input
                            id="author"
                            type="text"
                            className="form-input"
                            placeholder="e.g. F. Scott Fitzgerald"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Published Year</label>
                        <input
                            id="year"
                            type="number"
                            className="form-input"
                            placeholder="e.g. 1925"
                            value={publishedYear}
                            onChange={(e) => setPublishedYear(e.target.value)}
                        />
                    </div>

                    <div className="form-card__actions">
                        <button
                            type="button"
                            className="btn btn--secondary"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={loading}
                        >
                            {loading
                                ? isEdit ? "Saving..." : "Adding..."
                                : isEdit ? "Save Changes" : "Add Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
