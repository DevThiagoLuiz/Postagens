import axios from "axios";

const API_URL = "https://localhost:7255/api/auth"; // ajuste conforme seu backend

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
}

export const register = async (data: RegisterData) => {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
};

export const login = async (data: LoginData) => {
    const res = await axios.post<LoginResponse>(`${API_URL}/login`, data);
    return res.data;
};
