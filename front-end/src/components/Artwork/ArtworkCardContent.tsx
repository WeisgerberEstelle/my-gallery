import type { Artwork } from "src/types";

export default function ArtworkCardContent({ title, artist_name, image_url, categories }: Artwork) {
    return (
        <>
            {image_url ? (
                <img
                    src={image_url}
                    alt={title}
                    className="w-full h-48 object-contain bg-gray-200"
                />
            ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    (Pas d’image)
                </div>
            )}

            <div className="p-3">
                <div className="font-semibold">{title}</div>
                <div className="text-gray-600 text-sm">{artist_name}</div>

                {categories.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <span key={c} className="chip">
                                {c}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
