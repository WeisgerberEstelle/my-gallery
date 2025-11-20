import type { User } from "../types";
import api from "./api";

interface LoginResponse {
    token: string;
    user: User;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post("/login", {
        user: { email, password },
    });

    const authHeader = response.headers["authorization"] || response.headers["Authorization"];

    if (!authHeader) {
        throw new Error("No Authorization header returned from server");
    }

    const [, token] = authHeader.split(" ");
    if (!token) {
        throw new Error("Invalid Authorization header format");
    }
    const user: User = response.data.user;

    return { token, user };
}

export async function logout() {
    try {
        await api.delete("/logout");
    } catch (e) {
        throw new Error();
    }
}
