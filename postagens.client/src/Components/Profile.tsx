import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../Util/LinkApi";

export const Profile = () => {
    const { user, updateUser, token } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || ""); // supondo que você tenha bio
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    if (!user || !token) {
        navigate("/login"); // redireciona para login
        return null;        // retorna null enquanto navega
    }

    const handleSave = async () => {
        if (!name.trim()) {
            toast.warn("Nome não pode ficar vazio");
            return;
        }

        try {
            await fetch(`${API_URL}/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, bio }),
            });

            updateUser({ name, bio });
            setSuccess("Perfil atualizado com sucesso!");
            toast.success("Perfil atualizado com sucesso! ✨");
        } catch (err) {
            console.error(err);
            setError("Erro ao atualizar perfil.");
            toast.error("Erro ao atualizar perfil. Tente novamente!");
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
            <Paper sx={{ p: 4, maxWidth: 500, width: "100%", borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Meu Perfil
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <TextField
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => { setName(user.name); setBio(user.bio || ""); }}>
                        Cancelar
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
