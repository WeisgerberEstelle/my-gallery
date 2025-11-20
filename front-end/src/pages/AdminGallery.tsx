import { useEffect, useMemo, useState } from "react";
import type { Artwork, Category } from "../types";
import SkeletonCard from "../components/SkeletonCard";
import ErrorBanner from "../components/ErrorBanner";
import { getArtworks, getCategories, deleteArtwork } from "../api/routes";
import { useNavigate } from "react-router-dom";
import ArtworkCard from "../components/Artwork/ArtworkCard";

export default function AdminGallery() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    const navigate = useNavigate();

    // Charger les données
    async function fetchData(): Promise<void> {
        try {
            setError(null);
            setLoading(true);

            const artworksData = await getArtworks();
            const categoriesData = await getCategories();

            setArtworks(artworksData);
            setCategories(categoriesData);
        } catch {
            setError("Erreur lors du chargement des œuvres.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Supprimer cette œuvre ?")) return;

        try {
            await deleteArtwork(id);
            setArtworks((prev) => prev.filter((a) => a.id !== id));
        } catch {
            alert("Erreur lors de la suppression.");
        }
    }

    // Filtres
    const filteredItems = useMemo(() => {
        return artworks.filter((a) => {
            const matchCategory = !category || a.categories.includes(category);

            const lowerQ = query.toLowerCase().trim();
            const matchQuery =
                !lowerQ ||
                a.title.toLowerCase().includes(lowerQ) ||
                a.artist_name.toLowerCase().includes(lowerQ);

            return matchCategory && matchQuery;
        });
    }, [artworks, category, query]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {error && <ErrorBanner message={error} onRetry={fetchData} />}

            <h1 className="text-2xl font-bold mb-4">Gestion des œuvres</h1>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <select
                        className="input sm:max-w-xs"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <input
                        className="input flex-1"
                        type="search"
                        placeholder="Rechercher (titre ou artiste)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/new")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-600"
                    >
                        <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    </svg>
                    Ajouter
                </button>
            </div>

            {/* Contenu */}
            {loading ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center text-gray-600 py-20">Aucune œuvre trouvée.</div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {filteredItems.map((a) => (
                        <ArtworkCard
                            key={a.id}
                            artwork={a}
                            showAdminActions
                            onEdit={(artwork) => navigate(`/edit/${artwork.id}`)}
                            onDelete={() => handleDelete(a.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
