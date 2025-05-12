import axios from "axios";

export const addTaskService = (data: Omit<Task, "id">) => {
  const token = localStorage.getItem("token");
  return axios.post(`${import.meta.env.VITE_API_URL}/tasks`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
