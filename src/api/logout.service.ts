import axios from "axios";

export const logoutService = () => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${import.meta.env.VITE_API_URL}/auth/logout`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
