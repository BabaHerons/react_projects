import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getTokenData } from "../utils/jwt";

type Props = {
  allowedRoles: Array<"admin" | "user">;
};

export default function RoleProtectedRoute({ allowedRoles }: Props) {
  const tokenData = getTokenData()
  const role = tokenData?.role;
  const navigate = useNavigate();

  const isAllowed = role && allowedRoles.includes(role);

  useEffect(() => {
    if (!isAllowed) {
      toast.error("Not allowed to visit this page");
      navigate("/todos", { replace: true });
    }
  }, [isAllowed, navigate]);

  if (!isAllowed) {
    return null; // render nothing while redirecting
  }

  return <Outlet />;
}

