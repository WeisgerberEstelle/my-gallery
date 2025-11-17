import type { Artwork } from "../types";

export const MOCK_ARTWORKS: Artwork[] = [
    {
        id: 1,
        title: "Impression, soleil levant",
        artist_name: "Claude Monet",
        description: "Peinture emblématique du mouvement impressionniste.",
        categories: ["peinture", "impressionnisme"],
        image_url:
            "https://upload.wikimedia.org/wikipedia/commons/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
    },
    {
        id: 2,
        title: "La Joconde",
        artist_name: "Léonard de Vinci",
        description: "Portrait mythique de la Renaissance italienne.",
        categories: ["peinture", "portrait"],
        image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
    },
    {
        id: 3,
        title: "La persistance de la mémoire",
        artist_name: "Salvador Dalí",
        description: "Tableau célèbre pour ses montres molles.",
        categories: ["surréalisme"],
        image_url: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    },
    {
        id: 4,
        title: "Guernica",
        artist_name: "Pablo Picasso",
        description: "Chef-d’œuvre cubiste dénonçant la guerre civile espagnole.",
        categories: ["peinture", "cubisme", "guerre"],
        image_url: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
    },
    {
        id: 5,
        title: "La jeune fille à la perle",
        artist_name: "Johannes Vermeer",
        description: "Portrait célèbre surnommé la 'Mona Lisa du Nord'.",
        categories: ["portrait", "baroque"],
        image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
    },
];

/**
 * Retourne une œuvre mockée par son ID.
 */
export function getMockArtwork(id: number): Artwork | undefined {
    return MOCK_ARTWORKS.find((a) => a.id === id);
}
