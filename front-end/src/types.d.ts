export interface Artwork {
    id: number;
    title: string;
    artist_name: string;
    description?: string;
    categories: string[];
    image_url?: string | null;
}

export interface Category {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    role: "gallery_owner" | "admin" | "visitor";
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
