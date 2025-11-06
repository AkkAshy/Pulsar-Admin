import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";

const router = [
  {
    path: "/",
    Component: MainPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
];

export default router;
