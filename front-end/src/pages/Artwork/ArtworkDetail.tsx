import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Artwork } from "../../types";
import { getArtwork } from "../../api/routes";

export default function ArtworkDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

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
            console.error(err);
            setError("Impossible de charger cette œuvre.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [id]);

    if (loading) {
        return <p>Chargement…</p>;
    }

    if (error || !artwork) {
        return (
            <div className="space-y-2">
                <p className="text-red-600">{error}</p>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-sm underline text-gray-600 hover:text-gray-800"
                >
                    Retour à la galerie
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-600"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 4.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Retour
                </button>
            </div>

            {/* Contenu */}
            <div className="grid md:grid-cols-2 gap-6">
                <img src={artwork.image_url ?? ""} alt={artwork.title} className="rounded-2xl" />

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
