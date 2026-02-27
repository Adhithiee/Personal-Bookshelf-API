import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar__brand">
                <span className="navbar__brand-icon">📚</span>
                Bookshelf
            </Link>

            <div className="navbar__actions">
                {isAuthenticated ? (
                    <button className="btn btn--ghost" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="btn btn--ghost">Login</Link>
                        <Link to="/register" className="btn btn--primary btn--sm">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
