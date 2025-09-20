import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { register as registerApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerApi({ name, email, password });
            navigate("/login"); // redireciona para login após registro
        } catch (err: any) {
            setError(err.response?.data || "Erro ao registrar");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5">Registrar</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="Nome"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Registrar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
