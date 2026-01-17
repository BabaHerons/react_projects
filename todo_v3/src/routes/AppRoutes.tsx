import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
// import Dashboard from "../pages/Dashboard";
import Todos from "../pages/Todos";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../pages/NotFound";
import RoleProtectedRoute from "./RoleProtectedRoute";
import AdminHome from "../pages/Admin/AdminHome";
import { getTokenData } from "../utils/jwt";


export default function AppRoutes() {
    const tokenData = getTokenData()
    return (
        <Routes>
            {/* For "/" Route */}
            <Route 
                path="/" 
                element={
                    tokenData
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

                {/* Admin Only Routes */}
                <Route element={ <RoleProtectedRoute allowedRoles={['admin']}/> }>
                    <Route path="/admin" element={ <AdminHome /> } />
                </Route>
            </Route>

            {/* Not Found */}
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    )
}