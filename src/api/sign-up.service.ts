import axios from "axios";

interface SignUpService {
  username: string;
  password: string;
}

export const signUpService = (data: SignUpService) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/auth/sign-up`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
