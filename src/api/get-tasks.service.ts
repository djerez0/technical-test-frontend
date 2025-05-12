import axios from "axios";

export const getTaskService = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
}
