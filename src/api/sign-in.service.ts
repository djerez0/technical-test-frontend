import axios from "axios";

interface SignInService {
  username: string;
  password: string;
}

export const signInService = (data: SignInService) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/auth/sign-in`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
