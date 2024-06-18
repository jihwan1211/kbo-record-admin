import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme.ts";
import Layout from "./layout/layout.tsx";
import { GlobalStyle } from "./style/global.ts";
import Weekly from "./pages/Weekly.tsx";
import Daily from "./pages/Daily.tsx";
import Login from "./pages/Login.tsx";

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
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
