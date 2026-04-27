import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/auth";

type Mode = "login" | "register";

export default function LoginPage() {
    const { setUser } = useAuth();
    const [mode, setMode] = useState<Mode>("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"USER" | "ADMIN">("USER");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!username.trim() || !password.trim()) {
                setError("Usuario y contraseña son requeridos");
                setLoading(false);
                return;
            }

            const credentials = { username, password };
            const user = mode === "login"
                ? await authApi.login(credentials)
                : await authApi.register({ ...credentials, role });

            setUser(user);
            setUsername("");
            setPassword("");
            setRole("USER");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error en la autenticación");
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(mode === "login" ? "register" : "login");
        setError("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        MiniPOS
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {mode === "login" ? "Inicia sesión en tu cuenta" : "Crea una nueva cuenta"}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Usuario
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={mode === "login" ? "current-password" : "new-password"}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        {mode === "register" && (
                            <div>
                                <label htmlFor="role" className="sr-only">
                                    Rol
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
                                    disabled={loading}
                                >
                                    <option value="USER">Usuario (USER)</option>
                                    <option value="ADMIN">Administrador (ADMIN)</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Procesando..." : mode === "login" ? "Iniciar sesión" : "Registrarse"}
                    </button>

                    <button
                        type="button"
                        onClick={toggleMode}
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
                    >
                        {mode === "login"
                            ? "¿No tienes cuenta? Regístrate"
                            : "¿Ya tienes cuenta? Inicia sesión"}
                    </button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <p className="text-xs text-gray-600 mb-2">
                        <strong>Demo:</strong>
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Al registrarse, selecciona tu rol (USER o ADMIN)</li>
                        <li>• El menú cambia según el rol</li>
                        <li>• ADMIN ve más opciones que USER</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
