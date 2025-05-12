import axios from "axios";

export const deleteTaskService = (id: number) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
