import Header from "@/widgets/Header/Header";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <Flex
      direction="column"
      height="100vh"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Header />
      <Box flex="1" overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
