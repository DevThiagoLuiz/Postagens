import { useState } from "react";
import { TextField, Button, Typography, Paper, Grid, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { login as loginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const signIn = async () => {
        setError("");
        try {
            const data = await loginApi({ email, password });
            login(data.token);
            navigate("/posts");
        } catch (err: any) {
            setError(err.response?.data || "Erro ao fazer login");
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100vh", width: "180vh", bgcolor: "#f5f5f5", px: 2 }}
        >
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Sistema de cadastro
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

                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={signIn}
                                >
                                    Entrar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={() => navigate("/registro")}
                                >
                                    Cadastre-se
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};
