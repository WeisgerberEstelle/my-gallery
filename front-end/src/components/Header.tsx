import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";
import { useState } from "react";

const linkBase = "px-3 py-2 rounded-xl hover:bg-gray-100";
const linkActive = "bg-gray-100 font-semibold";

export default function Header() {
    const { isAuthenticated, setToken, user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const canModify = isAuthenticated && (user?.role === "gallery_owner" || user?.role === "admin");

    const handleLogout = () => {
        logout();
        setToken(null);
        setUser(null);
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <NavLink to="/" className="text-lg font-bold cursor-pointer">
                    My Gallery
                </NavLink>

                <nav className="flex items-center gap-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? linkActive : ""}`
                        }
                        end
                    >
                        Galerie
                    </NavLink>

                    {!isAuthenticated && (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : ""}`
                            }
                        >
                            Se connecter
                        </NavLink>
                    )}

                    {isAuthenticated && (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer"
                            >
                                {/* Avatar */}
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                                    U
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${
                                        isMenuOpen ? "rotate-180" : ""
                                    }`}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 7L10 12L15 7"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-100 bg-white shadow-lg py-1 text-sm cursor-pointer z-50">
                                    {canModify && (
                                        <NavLink
                                            to="/admin/gallery"
                                            className={({ isActive }) =>
                                                `block px-3 py-2 hover:bg-gray-50 ${
                                                    isActive ? "font-semibold" : ""
                                                }`
                                            }
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Gérer les oeuvres
                                        </NavLink>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-red-600 cursor-pointer"
                                    >
                                        Se déconnecter
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
