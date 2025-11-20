import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";

const linkBase = "px-3 py-2 rounded-xl hover:bg-gray-100";
const linkActive = "bg-gray-100 font-semibold";

export default function Header() {
    const { isAuthenticated, setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setToken(null);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <NavLink to="/" className="text-lg font-bold">
                    My Gallery
                </NavLink>

                <nav className="flex gap-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
                        end
                    >
                        Galerie
                    </NavLink>

                    {isAuthenticated && (
                        <NavLink
                            to="/new"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : ""}`
                            }
                        >
                            Ajouter
                        </NavLink>
                    )}

                    {isAuthenticated ? (
                        <button onClick={handleLogout} className={linkBase}>
                            Se déconnecter
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : ""}`
                            }
                        >
                            Se connecter
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}
