import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "./style/theme.ts";
import Layout from "./layout/layout.tsx";
import { GlobalStyle } from "./style/global.ts";

import Daily from "./pages/Daily.tsx";
import Login from "./pages/Login.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
import WeeklyTeamNotAchieved from "./pages/WeeklyTeamNotAchieved.tsx";
import WeeklyTeamAchieved from "./pages/WeeklyTeamAchieved.tsx";
import WeeklyPlayerNotAchieved from "./pages/WeeklyPlayerNotAchieved.tsx";
import WeeklyPlayerAchieved from "./pages/WeeklyPlayerAchieved.tsx";
import DailyNotAchieved from "./pages/DailyNotAchieved.tsx";
import DailyAchieved from "./pages/DailyAchieved.tsx";

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
    path: "/weekly/team/achieved",
    element: (
      <Layout>
        <WeeklyTeamAchieved />
      </Layout>
    ),
  },
  {
    path: "/weekly/team/not-achieved",
    element: (
      <Layout>
        <WeeklyTeamNotAchieved />
      </Layout>
    ),
  },
  {
    path: "/weekly/player/achieved",
    element: (
      <Layout>
        <WeeklyPlayerAchieved />
      </Layout>
    ),
  },
  {
    path: "/weekly/player/not-achieved",
    element: (
      <Layout>
        <WeeklyPlayerNotAchieved />
      </Layout>
    ),
  },
  {
    path: "/daily/not-achieved",
    element: (
      <Layout>
        <DailyNotAchieved />
      </Layout>
    ),
  },
  {
    path: "/daily/achieved",
    element: (
      <Layout>
        <DailyAchieved />
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
