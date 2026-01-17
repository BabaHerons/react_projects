import { Navigate, Outlet } from "react-router-dom";
import { getTokenData } from "../utils/jwt";

const ProtectedRoute = () => {
  if (!Boolean(getTokenData())) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
