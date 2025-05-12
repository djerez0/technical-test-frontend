import { createContext } from "react";

export interface AuthContextType {
  user: TokenPayload | null;
  login: (userData: TokenPayload, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export interface TokenPayload {
  username: string;
  sub: string;
}


