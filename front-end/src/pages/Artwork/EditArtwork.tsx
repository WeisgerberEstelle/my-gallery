import { useNavigate, useParams } from "react-router-dom";
import { getArtwork, updateArtwork } from "../../api/routes";
import ArtworkForm from "../../components/Artwork/ArtworkForm";
import { useEffect, useState } from "react";
import type { Artwork } from "../../types";

export default function EditArtworkPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [artwork, setArtwork] = useState<Artwork | null>(null);

    useEffect(() => {
        (async () => {
            const data = await getArtwork(id!);
            setArtwork(data);
        })();
    }, [id]);

    if (!artwork) return <p>Chargement…</p>;

    async function handleUpdate(form: FormData) {
        if (!artwork) {
            return;
        }
        await updateArtwork(artwork.id, form);
        navigate("/admin/gallery");
    }

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Modifier l’œuvre</h1>

            <ArtworkForm
                initialValues={{
                    title: artwork.title,
                    artistName: artwork.artist_name,
                    description: artwork.description ?? "",
                    categories: artwork.categories,
                    imageUrl: artwork.image_url,
                }}
                submitLabel="Mettre à jour"
                onSubmit={handleUpdate}
            />
        </div>
    );
}
