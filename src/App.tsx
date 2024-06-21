import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "./style/theme.ts";
import Layout from "./layout/layout.tsx";
import { GlobalStyle } from "./style/global.ts";
import Weekly from "./pages/Weekly.tsx";
import Daily from "./pages/Daily.tsx";
import Login from "./pages/Login.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/weekly",
    element: (
      <Layout>
        <Weekly />
      </Layout>
    ),
  },
  {
    path: "/daily",
    element: (
      <Layout>
        <Daily />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
