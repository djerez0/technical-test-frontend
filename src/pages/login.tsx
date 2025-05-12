import { Navigate } from "react-router-dom";
import { LoginForm } from "../components/login-form";
import { useAuth } from "../hooks/use-auth.hook";

export const LoginPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};
