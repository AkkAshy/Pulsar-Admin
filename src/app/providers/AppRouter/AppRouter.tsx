import { createBrowserRouter, RouterProvider } from "react-router";
import router from "./routes";

const AppRouter = () => {
  return <RouterProvider router={createBrowserRouter(router)} />;
};

export default AppRouter;
