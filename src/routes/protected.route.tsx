import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.hook";

export function ProtectedRoute({ children }: Readonly<{ children: React.ReactNode }>) {
 const {user} = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
