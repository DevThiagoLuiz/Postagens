import axios from "axios";

const API_URL = "https://localhost:7225/api/auth"; // ajuste conforme seu backend

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    message: string;
}

export const register = async (data: RegisterData) => {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
};

export const login = async (data: LoginData) => {
    const res = await axios.post<LoginResponse>(`${API_URL}/login`, data);

    // Se a API usar HTTP 200 mesmo em erro, valide o retorno
    if (!res.data.token) {
        throw new Error(res.data?.message || "Email ou senha inválidos");
    }

    return res.data;
};

