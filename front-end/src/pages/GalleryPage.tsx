import { useEffect, useState } from "react";
import type { Artwork } from "../types";
import ArtworkCard from "../components/ArtworkCard";
import { MOCK_ARTWORKS } from "../mocks/artworks";

export default function GalleryPage() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setArtworks(MOCK_ARTWORKS);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 mt-8">Chargement...</div>;
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {artworks.map((a) => (
                <ArtworkCard key={a.id} artwork={a} />
            ))}
        </div>
    );
}
