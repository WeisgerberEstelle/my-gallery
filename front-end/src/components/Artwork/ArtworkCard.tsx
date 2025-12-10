import { Link } from "react-router-dom";
import type { Artwork } from "src/types";
import ArtworkCardContent from "src/components/Artwork/ArtworkCardContent";

interface ArtworkCardProps {
    artwork: Artwork;
    showAdminActions?: boolean;
    onEdit?: (artwork: Artwork) => void;
    onDelete?: (artwork: Artwork) => void;
}

export default function ArtworkCard({
    artwork,
    showAdminActions = false,
    onEdit,
    onDelete,
}: ArtworkCardProps) {
    const { id } = artwork;

    const hasAdminActions =
        showAdminActions && (typeof onEdit === "function" || typeof onDelete === "function");

    return (
        <div className="card block no-underline text-gray-900 hover:shadow-sm transition">
            <Link to={`/artworks/${id}`} className="block no-underline text-gray-900">
                <ArtworkCardContent {...artwork} />
            </Link>

            {hasAdminActions && (
                <div className="flex justify-end gap-3 px-3 pb-3 pt-2 border-t border-gray-100 text-sm">
                    {onEdit && (
                        <button
                            type="button"
                            onClick={() => onEdit(artwork)}
                            className="p-2 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                            title="Modifier"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-blue-500 hover:text-blue-600 transition"
                            >
                                <path d="M15.586 3.586a2 2 0 0 0-2.828 0L5 11.343V15h3.657l7.758-7.758a2 2 0 0 0-2.829-2.828Z" />
                                <path d="M4 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                            </svg>
                        </button>
                    )}

                    {onDelete && (
                        <button
                            type="button"
                            onClick={() => onDelete(artwork)}
                            className="p-2 rounded-lg hover:bg-red-50 transition cursor-pointer"
                            title="Supprimer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-red-500 hover:text-red-600 transition"
                            >
                                <path d="M6 7a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Zm4 1v7a1 1 0 1 1-2 0V8a1 1 0 1 1 2 0Z" />
                                <path d="M4 5h12v2H4V5Z" />
                                <path d="M8 3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1H8V3Z" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
