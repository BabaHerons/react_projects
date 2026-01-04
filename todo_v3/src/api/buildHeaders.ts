export const buildHeaders = (isJson = false) => {
  const headers: Record<string, string> = {
    token: localStorage.getItem("token") || "",
    // "user-position": localStorage.getItem("user_position") || "",
    // "login-otp": localStorage.getItem("login_otp") || "",
    // subscription: localStorage.getItem("subscription") || "",
    // name: localStorage.getItem("name") || "",
  };

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};
