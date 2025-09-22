import axios from "axios";
import type { LoginData, LoginResponse, RegisterData } from "../Util/Interfaces";
import { toast } from "react-toastify";

const API_URL = "https://localhost:7225/api/auth"; // ajuste conforme seu backend



export const register = async (data: RegisterData) => {
    try {
        const res = await axios.post(`${API_URL}/register`, data);
        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        toast.error(err.response?.data?.message);
        throw err; // mantém erro pra quem chamou também tratar se quiser
    }
};

export const login = async (data: LoginData) => {
    try {
        const res = await axios.post<LoginResponse>(`${API_URL}/login`, data);

        if (!res.data.token) {
            toast.error(res.data?.message || "Email ou senha inválidos");
            throw new Error(res.data?.message || "Email ou senha inválidos");
        }
        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        toast.error(err.response?.data?.message || "Erro ao fazer login!");
        throw err;
    }
};

