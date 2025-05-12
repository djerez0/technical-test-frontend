import { Navigate } from "react-router-dom";
import { RegisterForm } from "../components/register-form";
import { useAuth } from "../hooks/use-auth.hook";

export const RegisterPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};
