import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import type { JSX } from "react";
import { Feed } from "./Components/Feed";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/posts"
                        element={
                            <PrivateRoute>
                                <Feed />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
