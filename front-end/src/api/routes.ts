import api from "./api";

export async function createArtwork(formData: FormData) {
    const res = await api.post("/artworks", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
}
