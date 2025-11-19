import type { Artwork, Category } from "../types";
import api from "./api";

export async function getArtworks(): Promise<Artwork[]>{
    const res = await api.get("/artworks");
    return res.data;
}

export async function createArtwork(formData: FormData) {
    const res = await api.post("/artworks", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
}

export async function getCategories(): Promise<Category[]> {
    const res = await api.get("/categories");
    return res.data;
}
