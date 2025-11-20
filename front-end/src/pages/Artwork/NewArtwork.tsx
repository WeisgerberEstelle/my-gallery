import { useNavigate } from "react-router-dom";
import ArtworkForm from "../../components/Artwork/ArtworkForm";
import { createArtwork } from "../../api/routes";

export default function NewArtworkPage() {
    const navigate = useNavigate();

    async function handleCreate(form: FormData) {
        await createArtwork(form);
        navigate("/admin/gallery");
    }

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Nouvelle œuvre</h1>

            <ArtworkForm submitLabel="Créer l’œuvre" onSubmit={handleCreate} />
        </div>
    );
}
