import { createBrowserRouter, redirect } from "react-router";
import LoginPage from "@/pages/LoginPage";
import ChartsPage from "@/pages/ChartsPage";
import AuthPage from "@/pages/AuthPage";
import Layout from "@/app/Layout";
import Dashboard from "@/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: () => redirect("/dashboard"),
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/charts",
        Component: ChartsPage,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthPage,
    children: [
      {
        index: true,
        loader: () => redirect("/auth/login"),
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: LoginPage,
      },
    ],
  },
]);

export default router;
