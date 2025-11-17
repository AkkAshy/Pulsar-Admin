import { ColorModeButton } from "@/components/ui/color-mode";
import Logo from "@/shared/ui/Logo";
import { Box, Container, Flex } from "@chakra-ui/react";

import { NavLink } from "react-router";

const Header = () => {
  return (
    <Box
      position={"sticky"}
      left={0}
      top={0}
      zIndex={10}
      backgroundColor={"white"}
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
      shadow={"sm"}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Container maxW="1400px" py={4}>
        <Flex justify="space-between" align="center">
          <Logo />
          <Flex gap={16}>
            <Flex as={"ul"} gap={8} align="center">
              {[
                { path: "/dashboard", label: "Dashboard" },
                { path: "/charts", label: "Charts" },
              ].map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "normal",
                    color: isActive ? "#319795" : "inherit", // teal.600
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </Flex>
            <ColorModeButton />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
