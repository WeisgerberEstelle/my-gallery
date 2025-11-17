import { useParams } from "react-router-dom";
import { getMockArtwork } from "../mocks/artworks";
import type { Artwork } from "../types";

export default function ArtworkDetail() {
    const { id } = useParams();
    const artwork: Artwork | undefined = getMockArtwork(Number(id));

    if (!artwork) return <div>Œuvre introuvable</div>;

    return (
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
    );
}
