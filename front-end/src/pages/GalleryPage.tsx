import { useEffect, useState } from "react";
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
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {error && <ErrorBanner message={error} onRetry={()=>{}} />}

            {loading ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : artworks.length === 0 ? (
                <div className="text-center text-gray-600 py-20">
                    Aucune œuvre disponible pour le moment.
                </div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {artworks.map((a) => (
                        <ArtworkCard key={a.id} artwork={a} />
                    ))}
                </div>
            )}
        </div>
    );
}
