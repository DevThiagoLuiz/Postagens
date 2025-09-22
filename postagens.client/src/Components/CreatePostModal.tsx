import { useState } from "react";
import { Box, Modal, Typography, TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import type { PropsPostModal } from "../Util/Interfaces";
import { toast } from "react-toastify";

export const CreatePostModal = ({ open, onClose, token, user, onPostCreated }: PropsPostModal) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleCreatePost = async () => {
        if (!title.trim() || !content.trim()) {
            toast.warn("Preencha todos os campos antes de postar!");
            return;
        }

        try {
            await axios.post(
                "https://localhost:7225/api/posts",
                { title, content, userId: user?.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTitle("");
            setContent("");
            onClose();
            onPostCreated(); // atualiza lista no Feed

            toast.success("Post criado com sucesso! 🎉");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao criar postagem. Tente novamente!");
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute" as const,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h5"
                    align="center"

                    sx={{ color: "black" }}
                >
                    Nova postagem
                </Typography>


                <hr style={{ margin: "16px 0" }} />

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    label="Autor"
                    value={user?.name || ""}
                    disabled
                    fullWidth
                />

                <TextField
                    label="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Conteúdo"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleCreatePost}>
                        Publicar
                    </Button>

                    <Button variant="outlined" color="error" onClick={onClose}>
                        Cancelar
                    </Button>

                </Box>
            </Box>
        </Modal>
    );
};
