import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import {LoginPage} from "../pages/login";
import {HomePage} from "../pages/home";
import { ProtectedRoute } from "./protected.route";
import { RegisterPage } from "../pages/register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    index: true,
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterPage />,
  }
]);

export default router;
