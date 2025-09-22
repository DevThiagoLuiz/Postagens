import { useState } from "react";
import { AppBar, Toolbar, Typography, Menu, MenuItem, Box, Avatar, IconButton, Button } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const NavMenu = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/posts")}>
                        Postagens
                    </Typography>
                    <Button color="inherit" onClick={() => navigate("/posts")}>Feed</Button>
                    <Button color="inherit" onClick={() => navigate("/profile")}>Perfil</Button>
                </Box>

                {user && (
                    <Box>
                        <IconButton onClick={handleMenuOpen} color="inherit">
                            <Avatar>{user.name[0].toUpperCase()}</Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                                Perfil
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    logout();
                                    handleMenuClose();
                                }}
                            >
                                Sair
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};
