import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    Divider,
    Alert,
    Button
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { CreatePostModal } from "./CreatePostModal";
import type { Post } from "../Util/Interfaces";
import { EditPostModal } from "./EditPostModal";



export const Feed = () => {
    const { token, user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);

    const fetchPosts = async () => {
        console.log(user);
        try {
            const res = await axios.get<Post[]>(
                "https://localhost:7225/api/posts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setPosts(res.data.reverse());
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar postagens.");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            minWidth="100vw"
            bgcolor="#f5f5f5"
            py={4}
            px={2}
        >
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {posts.length === 0 && !error && (
                <Typography align="center" color="textSecondary" mt={4}>
                    Nenhuma postagem encontrada.
                </Typography>
            )}

            {posts.map((post) => (
                <Paper key={post.id} sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2, maxWidth: 600, width: "100%" }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight={600}>
                            {post.user?.name?.toUpperCase()} - {post.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                    </Grid>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                        {post.content}
                    </Typography>

                    {post.user?.id === user?.id && ( // só mostra se for autor
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() => {
                                setPostToEdit(post);
                                setOpenEditModal(true);
                            }}
                        >
                            Editar
                        </Button>
                    )}
                </Paper>
            ))}

            {postToEdit && user && token && (
                <EditPostModal
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    post={postToEdit}
                    token={token}
                    user={user}
                    onPostCreated={fetchPosts}
                />
            )}

            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, borderRadius: 3 }}
                onClick={() => setOpenModal(true)}
            >
                Adicionar Post
            </Button>

            {user && token && (
                <CreatePostModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    token={token}
                    user={user}
                    onPostCreated={fetchPosts}
                />
            )}


        </Box>
    );
};
