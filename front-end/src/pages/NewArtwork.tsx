import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArtwork } from "../api/routes";
import type { JSX } from "react/jsx-runtime";
import { getMockCategories } from "../mocks/artworks";
import MultiSelectCategories from "../components/MultiSelect";

export default function NewArtworkPage(): JSX.Element {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [artistName, setArtistName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);

    const isFormValid = title.trim() !== "" && artistName.trim() !== "";

    useEffect(() => {
        setAvailableCategories(getMockCategories());
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isFormValid) return;

        setLoading(true);
        setError(null);

        try {
            const form = new FormData();
            form.append("artwork[title]", title);
            form.append("artwork[artist_name]", artistName);
            form.append("artwork[description]", description);

            selectedCategories.forEach((cat) => {
                form.append("artwork[categories][]", cat);
            });

            if (image) {
                form.append("artwork[image]", image);
            }

            await createArtwork(form);

            setSuccess(true);
            setTimeout(() => navigate("/"), 800);
        } catch (err) {
            setError("Erreur lors de la création de l’œuvre.");
        } finally {
            setLoading(false);
        }
    }

    function toggleCategory(cat: string): void {
        setSelectedCategories((prev) =>
            prev.includes(cat)
                ? prev.filter((c) => c !== cat)
                : [...prev, cat]
        );
    }    

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Nouvelle œuvre</h1>

            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm">
                    Créée avec succès !
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                    <label className="text-sm font-medium">Titre *</label>
                    <input
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Le nom de l’œuvre"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Artiste *</label>
                    <input
                        className="input"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Nom de l’artiste"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        className="input min-h-[80px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description optionnelle"
                    />
                </div>

                <MultiSelectCategories
                    options={availableCategories}
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                />

                <div>
                    <label className="text-sm font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="input"
                        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`btn mt-2 ${
                        (!isFormValid || loading)
                            ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-400 border-gray-300"
                            : ""
                    }`}
                >
                    {loading ? "Envoi..." : "Créer l’œuvre"}
                </button>
            </form>
        </div>
    );
}
