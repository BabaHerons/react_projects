import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

type Props = {
  allowedRoles: Array<"admin" | "user">;
};

export default function RoleProtectedRoute({ allowedRoles }: Props) {
  const role = "user"; // mock
  const navigate = useNavigate();

  const isAllowed = role && allowedRoles.includes(role);

  useEffect(() => {
    if (!isAllowed) {
      toast.error("Not allowed to visit this page");
      navigate("/", { replace: true });
    }
  }, [isAllowed, navigate]);

  if (!isAllowed) {
    return null; // render nothing while redirecting
  }

  return <Outlet />;
}

