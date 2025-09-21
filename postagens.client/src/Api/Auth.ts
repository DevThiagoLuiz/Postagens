import axios from "axios";
import type { LoginData, LoginResponse, RegisterData } from "../Util/Interfaces";

const API_URL = "https://localhost:7225/api/auth"; // ajuste conforme seu backend



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

