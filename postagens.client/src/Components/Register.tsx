import { useState } from "react";
import { TextField, Button, Typography, Paper, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../Api/Auth";
import axios from "axios";
import { toast } from "react-toastify";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();



    const handleRegister = async () => {
        try {
            await registerApi({ name, email, password });
            toast.success("Cadastro realizado com sucesso! 🎉");

            // redireciona pro login após um pequeno delay
            setTimeout(() => navigate("/login"), 1500);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Erro ao cadastrar");
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Erro desconhecido");
            }
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            bgcolor="#f0f2f5"
            px={2}
        >
            <Paper
                elevation={8}
                sx={{
                    p: 5,
                    borderRadius: 3,
                    bgcolor: "#fff",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    width: "100%",
                    maxWidth: 400,
                }}
            >
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Criar Conta
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Preencha os campos abaixo para se cadastrar
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <form>
                    <TextField
                        label="Nome"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite uma senha segura"
                    />

                    <Box display="flex" gap={2} mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleRegister}
                            sx={{ py: 1.5, fontWeight: 600 }}
                        >
                            Registrar
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={() => navigate("/login")}
                            sx={{ py: 1.5, fontWeight: 600 }}
                        >
                            Voltar
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};
