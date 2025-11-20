import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login, logout } from "../api/auth";

export default function Login() {
    const navigate = useNavigate();
    const { setToken, isAuthenticated, setUser } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        try {
            const { user, token } = await login(email, password);
            setToken(token);
            setUser(user);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    }

    const handleLogout = (): void => {
        logout();
        setToken(null);
        setUser(null);
        navigate("/");
    };

    const validateEmail = (value: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const isFormValid = validateEmail(email) && password.trim().length > 0;

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Connexion</h1>

            {isAuthenticated ? (
                <div className="space-y-3">
                    <p className="text-green-600">Connecté ✅</p>
                    <button className="btn" onClick={handleLogout}>
                        Se déconnecter
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="grid gap-3">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="galleriste@example.com"
                        required
                    />

                    <label htmlFor="password" className="text-sm font-medium">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`btn mt-2 ${
                            !isFormValid
                                ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-400 border-gray-300 hover:bg-gray-200 active:scale-100"
                                : ""
                        }`}
                    >
                        Se connecter
                    </button>
                </form>
            )}
        </div>
    );
}
