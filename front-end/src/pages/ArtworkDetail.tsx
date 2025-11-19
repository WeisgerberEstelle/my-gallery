import { Link, useParams } from "react-router-dom";
import type { Artwork } from "../types";
import { useEffect, useState } from "react";
import { getArtwork } from "../api/routes";

export default function ArtworkDetail() {
    const { id } = useParams<{ id: string }>();
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const data = await getArtwork(id);
            setArtwork(data);
        } catch (err) {
            setError("Impossible de charger cette œuvre.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [id]);

    if (loading) return <p>Chargement…</p>;

    if (error || !artwork) {
        return (
            <div className="space-y-2">
                <p className="text-red-600">{error}</p>
                <Link to="/" className="back-link">← Retour à la galerie</Link>
            </div>
        );
    }

    return (
        <>
            <Link to="/" className="back-link">← Retour à la galerie</Link>
            <div className="grid md:grid-cols-2 gap-6">
                <img
                    src={artwork.image_url ?? ""}
                    alt={artwork.title}
                    className="rounded-2xl"
                />

                <div>
                    <h1 className="text-2xl font-bold">{artwork.title}</h1>
                    <h3 className="text-gray-600">{artwork.artist_name}</h3>
                    <p className="mt-3">{artwork.description}</p>

                    <div className="mt-3 flex gap-2 flex-wrap">
                        {artwork.categories.map((cat: string) => (
                            <span key={cat} className="chip">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
