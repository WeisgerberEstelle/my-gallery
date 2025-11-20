import { useEffect, useState } from "react";
import MultiSelectCategories from "../MultiSelect";
import type { Category } from "../../types";
import { getCategories } from "../../api/routes";

interface ArtworkFormProps {
    initialValues?: {
        title: string;
        artistName: string;
        description: string;
        categories: Category[] | string[];
        imageUrl?: string | null;
    };
    onSubmit: (formData: FormData) => Promise<void>;
    submitLabel: string;
}

export default function ArtworkForm({
    initialValues,
    onSubmit,
    submitLabel,
}: ArtworkFormProps) {
    const [title, setTitle] = useState(initialValues?.title ?? "");
    const [artistName, setArtistName] = useState(initialValues?.artistName ?? "");
    const [description, setDescription] = useState(initialValues?.description ?? "");
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [image, setImage] = useState<File | null>(null);

    const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFormValid = title.trim() !== "" && artistName.trim() !== "";

    useEffect(() => {
        (async () => {
            try {
                const categories = await getCategories();
                setAvailableCategories(categories);

                if (initialValues?.categories) {
                    const list = initialValues.categories;
                    const mapped =
                        typeof list[0] === "string"
                            ? (list as string[])
                                  .map((name) => categories.find((c) => c.name === name))
                                  .filter(Boolean) as Category[]
                            : (list as Category[]);
                    setSelectedCategories(mapped);
                }
            } catch {
                setError("Impossible de charger les catégories.");
            }
        })();
    }, [initialValues?.categories]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setImage(file);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isFormValid) return;

        const form = new FormData();
        form.append("artwork[title]", title);
        form.append("artwork[artist_name]", artistName);
        form.append("artwork[description]", description);

        selectedCategories.forEach((cat) =>
            form.append("artwork[category_ids][]", String(cat.id))
        );

        if (image) {
            form.append("artwork[image]", image);
        }

        try {
            setLoading(true);
            setError(null);
            await onSubmit(form);
        } catch {
            setError("Erreur lors de l’envoi du formulaire.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div>
                <label className="text-sm font-medium">Titre *</label>
                <input
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Artiste *</label>
                <input
                    className="input"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                    className="input min-h-[80px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    onChange={handleFileChange}
                />
            </div>

            <button
                type="submit"
                disabled={!isFormValid || loading}
                className="btn mt-2 cursor-pointer"
            >
                {loading ? "Envoi…" : submitLabel}
            </button>
        </form>
    );
}
