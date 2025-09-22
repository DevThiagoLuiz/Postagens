import { useState } from "react";
import { TextField, Button, Typography, Paper, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { login as loginApi } from "../Api/Auth";
import axios from "axios";
import { toast } from "react-toastify";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            const data = await loginApi({ email, password });
            if (!data.token) {
                toast.error("Login falhou");
                return;
            }

            login(data.token, data.user);
            toast.success("Login realizado com sucesso! 🎉");
            navigate("/posts");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
                setError(err.response?.data?.message);
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
            width={"100vw"}
            bgcolor="#f5f5f5"
            px={2}
        >
            <Paper elevation={6} sx={{ p: 4, borderRadius: 2, width: "100%", maxWidth: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Sistema de posts
                </Typography>

                <hr style={{ margin: "16px 0" }} />

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form>
                    <TextField
                        label="Email"
                        type="text"
                        fullWidth
                        margin="normal"
                        placeholder="Informe seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        placeholder="Informe a senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Box display="flex" gap={2} mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={signIn}
                        >
                            Entrar
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={() => navigate("/register")}
                        >
                            Cadastre-se
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};
