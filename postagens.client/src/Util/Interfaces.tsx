
export interface Post {
    id: string;
    userId: number;
    user: User;
    title: string;
    content: string;
    createdAt: string;
}


export interface User {
    id: string;
    name: string;
    email: string;
    bio?: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (email: string, password: string) => Promise<void>; // <- atualizado
    logout: () => void;
    updateUser: (updated: Partial<User>) => void;
}

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
    user: User;
}

export interface PropsPostModal {
    open: boolean;
    onClose: () => void;
    token: string;
    user: User;
    onPostCreated: () => void; // callback para atualizar lista de posts
}

