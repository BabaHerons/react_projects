import { Navigate, Outlet } from "react-router-dom";
import { getTokenData } from "../utils/jwt";

const PublicRoute = () => {
  if (getTokenData()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
