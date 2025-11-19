export interface Artwork {
    id: number;
    title: string;
    artist_name: string;
    description?: string;
    categories: string[];
    image_url?: string | null;
    created_at: string;
}

export interface Category {
    id: number;
    name: string;
}