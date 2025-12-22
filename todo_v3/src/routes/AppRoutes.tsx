import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
import Todos from "../pages/Todos";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { isAuthenticated } from "../utils/auth";
import NotFound from "../pages/NotFound";


export default function AppRoutes() {
    return (
        <Routes>
            {/* For "/" Route */}
            <Route 
                path="/" 
                element={
                    isAuthenticated()
                    ? <Navigate to="/todos" replace />
                    : <Navigate to="/login" replace />
                }
            />

            {/* Public Routes */}
            <Route element={ <PublicRoute /> }>
                <Route path="/login" element={ <Login /> } />
            </Route>
            
            {/* Protected Routes */}
            <Route element={ <ProtectedRoute /> }>
                <Route path="/todos" element={ <Todos /> } />
            </Route>

            {/* Not Found */}
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    )
}