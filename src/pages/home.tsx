import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import CustomForm from "../components/custom-form";
import TaskList from "../components/task-list";
import { useGetTasks } from "../hooks/use-get-task.hook";
import { useEffect } from "react";
import type { AxiosError } from "axios";
import { useAuth } from "../hooks/use-auth.hook";

export const HomePage = () => {
  const { isLoading, isError, data, error } = useGetTasks();
  const { logout } = useAuth();

  useEffect(() => {
    if (!isLoading && isError) {
      if ((error as AxiosError).response?.data === "Unauthorized") {
        logout();
      }
    }
  }, [isLoading, isError, error, logout]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">TO-DO APP</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full w-full">
              <div
                className="w-12 h-12 rounded-full animate-spin
              border-2 border-solid border-blue-500 border-t-transparent"
              />
            </div>
          ) : isError ? (
            <div className="text-center mt-10 space-y-4">
              <h1 className="text-red-600 text-xl font-semibold">
                Ha ocurrido un error. Inténtelo nuevamente.
              </h1>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
                onClick={handleRetry}
              >
                Reintentar
              </button>
            </div>
          ) : !(data?.data as { tasks: Task[] }).tasks.length ? (
            <h1 className="text-center text-gray-500 text-xl font-medium mt-10">
              No tienes tareas pendientes
            </h1>
          ) : (
            <TaskList tasks={(data?.data as { tasks: Task[] }).tasks} />
          )}
          <CustomForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
