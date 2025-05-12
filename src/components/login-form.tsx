import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useSignIn } from "../hooks/use-sign-in.hook";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/use-auth.hook";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
    })
    .nonempty("El nombre de usuario es requerido"),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .nonempty("La contraseña es requerida"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutateAsync } = useSignIn();
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await mutateAsync(data);

      const decodeToken = jwtDecode<{ username: string; sub: string }>(
        res.data.access_token
      );
      form.reset();
      login(
        {
          username: decodeToken.username,
          sub: decodeToken.sub,
        },
        res.data.access_token
      );
      navigate("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data === "Unauthorized") {
          form.setError("root", {
            type: "manual",
            message: "Usuario o contraseña incorrectos",
          });

          return;
        }
      }

      form.setError("root", {
        type: "manual",
        message: "Error al iniciar sesión, intenta nuevamente",
      });
    }
  };
  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Inicia sesión en tu cuenta</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              noValidate
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>
                        Nombre de usuario
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Ej: djerez0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    variant={
                      form.formState.errors.root ? "destructive" : "default"
                    }
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="animate-spin" />
                    )}
                    Iniciar sesión
                  </Button>
                  {Boolean(form.formState.errors.root) && (
                    <p
                      data-slot="form-message"
                      className={cn("text-destructive text-sm", className)}
                    >
                      {form.formState.errors.root?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                No tienes una cuenta?{" "}
                <Link to="/sign-up" className="underline underline-offset-4">
                  Registrate
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}
