import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "./style/theme.ts";
import Layout from "./layout/layout.tsx";
import { GlobalStyle } from "./style/global.ts";
import Login from "./pages/Login.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
import WeeklyTeamNotAchieved from "./pages/WeeklyTeamNotAchieved.tsx";
import WeeklyTeamAchieved from "./pages/WeeklyTeamAchieved.tsx";
import WeeklyPlayerNotAchieved from "./pages/WeeklyPlayerNotAchieved.tsx";
import WeeklyPlayerAchieved from "./pages/WeeklyPlayerAchieved.tsx";
import DailyNotAchieved from "./pages/DailyNotAchieved.tsx";
import DailyAchieved from "./pages/DailyAchieved.tsx";
import RecordLayout from "./layout/RecordLayout.tsx";
import Join from "./pages/Join.tsx";

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
    path: "/join",
    element: (
      <Layout>
        <Join />
      </Layout>
    ),
  },
  {
    path: "/weekly/team/achieved",
    element: (
      <Layout>
        <RecordLayout title="달성 팀 기록 관리">
          <WeeklyTeamAchieved />
        </RecordLayout>
      </Layout>
    ),
  },
  {
    path: "/weekly/team/not-achieved",
    element: (
      <Layout>
        <RecordLayout title="미달성 팀 기록 관리">
          <WeeklyTeamNotAchieved />
        </RecordLayout>
      </Layout>
    ),
  },
  {
    path: "/weekly/player/achieved",
    element: (
      <Layout>
        <RecordLayout title="달성 개인 기록 관리">
          <WeeklyPlayerAchieved />
        </RecordLayout>
      </Layout>
    ),
  },
  {
    path: "/weekly/player/not-achieved",
    element: (
      <Layout>
        <RecordLayout title="미달성 개인 기록 관리">
          <WeeklyPlayerNotAchieved />
        </RecordLayout>
      </Layout>
    ),
  },
  {
    path: "/daily/not-achieved",
    element: (
      <Layout>
        <RecordLayout title="미달성 개인 기록 관리">
          <DailyNotAchieved />
        </RecordLayout>
      </Layout>
    ),
  },
  {
    path: "/daily/achieved",
    element: (
      <Layout>
        <RecordLayout title="달성 개인 기록 관리">
          <DailyAchieved />
        </RecordLayout>
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
