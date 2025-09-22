import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Feed } from "./Components/Feed";
import { NavMenu } from "./Components/NavMenu";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import type { JSX } from "react";
import { Profile } from "./Components/Profile";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// Rota privada
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

// Layout para páginas privadas
const PrivateLayout = ({ children }: { children: JSX.Element }) => (
    <>
        <NavMenu />
        {children}
    </>
);
function App() {
    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/posts"
                            element={
                                <PrivateRoute>
                                    <PrivateLayout>
                                        <Feed />
                                    </PrivateLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <PrivateLayout>
                                        <Profile />
                                    </PrivateLayout>
                                </PrivateRoute>
                            }
                        />

                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
