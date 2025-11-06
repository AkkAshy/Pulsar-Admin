import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "@/app/providers/AppRouter/AppRouter";
import ChakraProvider from "@/app/providers/ChakraProvider/ChakraProvider";
import StoreProvider from "@/app/providers/StoreProvider/StoreProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </StoreProvider>
  </StrictMode>
);
