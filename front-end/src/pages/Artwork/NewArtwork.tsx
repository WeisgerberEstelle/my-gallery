import { useNavigate } from "react-router-dom";
import ArtworkForm from "src/components/Artwork/ArtworkForm";
import { createArtwork } from "src/api/routes";

export default function NewArtworkPage() {
    const navigate = useNavigate();

    async function handleCreate(form: FormData) {
        await createArtwork(form);
        navigate("/admin/gallery");
    }

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Nouvelle œuvre</h2>

            <ArtworkForm submitLabel="Créer l’œuvre" onSubmit={handleCreate} />
        </div>
    );
}
