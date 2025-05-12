import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth.provider";
import router from "./routes/index.route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query-client";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
