import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import ChartsPage from "@/pages/ChartsPage";

const router = [
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/main",
    Component: MainPage,
  },
  {
    path: "/charts",
    Component: ChartsPage,
  },
];

export default router;
