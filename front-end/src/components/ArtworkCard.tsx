import { Link } from "react-router-dom";
import type { Artwork } from "../types";

interface ArtworkCardProps {
    artwork: Artwork
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
	const { id, title, artist_name, image_url, categories } = artwork;

	return (
		<Link
			to={`/artworks/${id}`}
			className="card block no-underline text-gray-900 hover:shadow-sm transition"
		>
			{image_url ? (
				<img
					src={image_url}
					alt={title}
					className="w-full h-48 object-cover"
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
		</Link>
	);
}
