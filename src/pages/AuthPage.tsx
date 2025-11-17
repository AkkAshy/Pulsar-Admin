import { Outlet } from "react-router";
import { Box, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import Logo from "@/shared/ui/Logo";

const AuthPage = () => {
  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        p={8}
        rounded="2xl"
        shadow="lg"
        width="full"
        maxW="500px"
        position="relative"
      >
        <Box position="absolute" top={4} right={4}>
          <ColorModeButton />
        </Box>

        {/* Logo and Title */}
        <Flex gap={4} justifyContent={"center"} alignItems={"center"} mb={8}>
          <Logo />
        </Flex>

        <Outlet />
      </Box>
    </Flex>
  );
};

export default AuthPage;
