import { useState, useEffect } from "react";
import { Box, Modal, Typography, TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import type { Post, PropsPostModal } from "../Util/Interfaces";

interface PropsEditPostModal extends PropsPostModal {
    post: Post; // post que vamos editar
}

export const EditPostModal = ({ open, onClose, token, user, post, onPostCreated }: PropsEditPostModal) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [error, setError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleEditPost = async () => {
        if (!title.trim() || !content.trim()) return;

        try {
            await axios.put(
                `https://localhost:7225/api/posts/${post.id}`,
                { title, content, userId: user?.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setError("");
            onClose();
            onPostCreated(); // atualiza lista no Feed
        } catch (err) {
            console.error(err);
            setError("Erro ao atualizar postagem.");
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
                <Typography variant="h5" align="center" sx={{ color: "black" }}>
                    Editar postagem
                </Typography>

                <hr style={{ margin: "16px 0" }} />

                {error && <Alert severity="error">{error}</Alert>}

                <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                <TextField
                    label="Conteúdo"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleEditPost}>
                        Salvar
                    </Button>
                    <Button variant="outlined" color="error" onClick={onClose}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
