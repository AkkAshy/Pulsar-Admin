import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";

const router = [
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/main",
    Component: MainPage,
  },
];

export default router;
