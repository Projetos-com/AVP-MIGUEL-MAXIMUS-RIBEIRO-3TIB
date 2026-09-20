import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { getToken, removeToken } from "../services/auth.js";

export default function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loadProfile() {
    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setLoading(true);
      const response = await api.get("/perfil", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        removeToken();
        navigate("/login", { replace: true });
        return;
      }

      setError(error.response?.data?.message || "Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    removeToken();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <section className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">Perfil</h1>

        {loading && <p role="status" className="mb-4 text-gray-600">Carregando perfil...</p>}
        {error && <p role="alert" className="mb-4 text-red-600">{error}</p>}

        <div className="mb-6 space-y-2 rounded-md border border-gray-200 p-4 text-gray-700">
          <h2 className="font-semibold text-gray-900">Dados do usuário</h2>
          <p><strong>ID:</strong> {user?.id ?? "Aguardando perfil"}</p>
          <p><strong>Nome:</strong> {user?.name ?? "Aguardando perfil"}</p>
          <p><strong>Email:</strong> {user?.email ?? "Aguardando perfil"}</p>
          <p><strong>Perfil de acesso:</strong> {user?.role ?? "Aguardando perfil"}</p>
        </div>

        <button type="button" onClick={handleLogout} className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          Sair
        </button>
      </section>
    </main>
  );
}
