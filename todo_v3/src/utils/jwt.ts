import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  user_id: number;
  role: "admin" | "user";
  name: string;
  exp: number;
};

export const getTokenData = (): JwtPayload | null => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // exp is in seconds
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};
