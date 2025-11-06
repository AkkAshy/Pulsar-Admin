import type { ReactNode } from "react";
import { Provider } from "@/components/ui/provider";

type Props = {
  children: ReactNode;
};

const ChakraProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

export default ChakraProvider;
