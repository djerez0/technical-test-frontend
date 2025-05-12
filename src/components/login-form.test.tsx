import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./login-form";
import { BrowserRouter } from "react-router-dom";
import { AxiosError, type InternalAxiosRequestConfig } from "axios";

vi.mock("../hooks/use-sign-in.hook", () => ({
  useSignIn: () => ({
    mutateAsync: vi.fn().mockRejectedValue(
      new AxiosError(
        "Unauthorized",
        "401",
        {} as InternalAxiosRequestConfig<unknown>,
        null,
        {
          data: "Unauthorized",
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config: {} as InternalAxiosRequestConfig<unknown>,
        }
      )
    ),
  }),
}));

vi.mock("../hooks/use-auth.hook", () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}));

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("jwt-decode", () => ({
  jwtDecode: () => ({
    username: "djerez0",
    sub: 123,
  }),
}));

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza los campos de formulario", () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it("muestra errores si se envía vacío", async () => {
    renderWithRouter(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/nombre de usuario es requerido/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  it("muestra error si las credenciales son inválidas", async () => {
    const { useSignIn } = await import("../hooks/use-sign-in.hook");
    useSignIn().mutateAsync = vi.fn().mockRejectedValue(
      new AxiosError(
        "Unauthorized",
        "401",
        {} as InternalAxiosRequestConfig<unknown>,
        null,
        {
          data: "Unauthorized",
          status: 401,
          statusText: "Unauthorized",
          headers: {},
          config: {} as InternalAxiosRequestConfig<unknown>,
        }
      )
    );

    console.log(useSignIn().mutateAsync);
  
    renderWithRouter(<LoginForm />);
  
    fireEvent.change(screen.getByLabelText(/nombre de usuario/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "wrongpass" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
  
    await screen.findByText(/usuario o contraseña incorrectos/i);
  });
  
});
