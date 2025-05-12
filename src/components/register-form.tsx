import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";
import { useSignUp } from "../hooks/use-sign-up.hook";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/use-auth.hook";

const registerSchema = z
  .object({
    username: z.string().min(1, "El nombre de usuario es obligatorio"),
    password: z
      .string({
        required_error: "La contraseña es obligatoria",
      })
      .min(6, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string({
      required_error: "Debes confirmar tu contraseña",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutateAsync } = useSignUp();
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const res = await mutateAsync({
        username: values.username,
        password: values.password,
      });

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
        if (error.response?.data.message === "USERNAME_ALREADY_IN_USE") {
          form.setError("username", {
            type: "manual",
            message: "El nombre de usuario ya está en uso",
          });

          return;
        }
      }

      form.setError("root", {
        type: "manual",
        message: "Error al crear la cuenta, intenta nuevamente",
      });
    }
  };

  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Regístrate para crear una cuenta</CardTitle>
            <CardDescription>
              ngresa tu nombre de usuario y contraseña para crear tu cuenta
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
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: djerez0" {...field} />
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
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <Input
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
                    Registrarse
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
                Ya tienes un cuenta?{" "}
                <Link to="/" className="underline underline-offset-4">
                  Inicia sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}
