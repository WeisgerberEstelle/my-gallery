import { useEffect, useMemo, useState } from "react";
import type { Artwork } from "../types";
import SkeletonCard from "../components/SkeletonCard";
import ErrorBanner from "../components/ErrorBanner";
import ArtworkCard from "../components/ArtworkCard";
import { MOCK_ARTWORKS, getMockCategories } from "../mocks/artworks";

export default function GalleryPage() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    const fetchData = async (): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            await new Promise((r) => setTimeout(r, 400));
            setArtworks(MOCK_ARTWORKS);
            setCategories(getMockCategories());
        } catch (e) {
            setError("Une erreur est survenue lors du chargement des œuvres.");
        } finally {
            setLoading(false);
        }
    };

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
            {error && <ErrorBanner message={error} onRetry={()=>{}} />}

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <select
                    className="input sm:max-w-xs"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Toutes les catégories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

                <input
                    className="input"
                    type="search"
                    placeholder="Rechercher (titre ou artiste)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center text-gray-600 py-20">
                    Aucune œuvre ne correspond à vos critères.
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {filteredItems.map((a) => (
                        <ArtworkCard key={a.id} artwork={a} />
                    ))}
                </div>
            )}
        </div>
    );
}
