import type { Artwork, Category } from "../types";
import api from "./api";

export async function getArtworks(): Promise<Artwork[]> {
    const res = await api.get("/artworks");
    return res.data;
}

export async function createArtwork(formData: FormData) {
    const res = await api.post("/artworks", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
}

export async function updateArtwork(id: number, formData: FormData) {
    const res = await api.put(`/artworks/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
}

export async function deleteArtwork(id: number) {
    return api.delete(`/artworks/${id}`);
}

export async function getCategories(): Promise<Category[]> {
    const res = await api.get("/categories");
    return res.data;
}

export async function getArtwork(id: number | string): Promise<Artwork> {
    const res = await api.get(`/artworks/${id}`);
    return res.data;
}
