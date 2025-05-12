import { PlusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useAddTask } from "../hooks/use-add-task.hook";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/use-auth.hook";
import { Loader2 } from "lucide-react";

const addTaskSchema = z.object({
  title: z
    .string({
      required_error: "El titulo es requerido",
    })
    .max(100, "El titulo no puede tener mas de 100 caracteres")
    .nonempty("El titulo no puede estar vacio"),
  description: z.string().optional(),
});

const CustomForm = () => {
  const { mutateAsync } = useAddTask();
  const { logout } = useAuth();
  const form = useForm<z.infer<typeof addTaskSchema>>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(addTaskSchema),
  });

  const onSubmit = async (data: z.infer<typeof addTaskSchema>) => {
    try {
      await mutateAsync({
        title: data.title,
        description: data.description ?? "",
      });
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          logout();
          return;
        }
      }

      form.setError("root", {
        type: "manual",
        message: "Error al agregar la tarea. Inténtelo nuevamente.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        autoComplete="off"
        className="absolute bottom-4 z-10 w-[95%] mx-auto left-0 right-0 p-4 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col md:flex-row items-stretch md:items-start gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full md:flex-1">
              <FormControl>
                <input
                  type="text"
                  id="task-title"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  {...field}
                  placeholder="Título de la tarea"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full md:flex-1">
              <FormControl>
                <input
                  type="text"
                  id="task-description"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  {...field}
                  placeholder="Descripción de la tarea"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
          aria-label="Add Task"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
        </button>
      </form>
    </Form>
  );
};

export default CustomForm;
