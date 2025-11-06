// src/pages/LoginPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Heading, Text, Input, Button, VStack } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "@/app/providers/StoreProvider/hook";
import { getIsAuthenticated, getAuthLoading, getAuthError } from "@/entities/auth/model/selectors";
import loginThunk from "@/entities/auth/model/thunks/loginThunk";
import { ColorModeButton } from "@/components/ui/color-mode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const loading = useAppSelector(getAuthLoading);
  const error = useAppSelector(getAuthError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ username, password }));
  };

  return (
    <Box
      minH="100vh"
      display="flex"
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
        {/* Theme Toggle */}
        <Box position="absolute" top={4} right={4}>
          <ColorModeButton />
        </Box>

        {/* Logo and Title */}
        <Box textAlign="center" mb={8}>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            bg="teal.100"
            _dark={{ bg: "teal.900" }}
            rounded="xl"
            p={4}
            mb={4}
          >
            <Box
              fontSize="32px"
              color="teal.600"
              _dark={{ color: "teal.400" }}
              fontWeight="bold"
            >
              +
            </Box>
          </Box>
          <Heading
            size="2xl"
            color="teal.600"
            _dark={{ color: "teal.400" }}
            mb={2}
          >
            Pulsar
          </Heading>
        </Box>

        {/* Form Title */}
        <Heading
          size="xl"
          textAlign="center"
          mb={8}
          color="gray.800"
          _dark={{ color: "white" }}
        >
          Вход в систему
        </Heading>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <VStack gap={6}>
            {/* Username Input */}
            <Box width="full">
              <Text
                mb={2}
                fontWeight="medium"
                color="gray.700"
                _dark={{ color: "gray.300" }}
              >
                Имя пользователя
              </Text>
              <Input
                placeholder="Введите имя пользователя"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                bg="gray.50"
                _dark={{ bg: "gray.700", borderColor: "gray.600" }}
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "teal.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)",
                }}
              />
            </Box>

            {/* Password Input */}
            <Box width="full">
              <Text
                mb={2}
                fontWeight="medium"
                color="gray.700"
                _dark={{ color: "gray.300" }}
              >
                Пароль
              </Text>
              <Input
                type="password"
                placeholder="Введите пароль"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                bg="gray.50"
                _dark={{ bg: "gray.700", borderColor: "gray.600" }}
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "teal.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)",
                }}
              />
            </Box>

            {/* Error Message */}
            {error && (
              <Text color="red.500" fontSize="sm" width="full">
                {error}
              </Text>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              width="full"
              bg="teal.600"
              color="white"
              _hover={{ bg: "teal.700" }}
              _dark={{ bg: "teal.500", _hover: { bg: "teal.600" } }}
              loading={loading}
              fontWeight="medium"
              fontSize="lg"
              h="56px"
            >
              Войти
            </Button>

            {/* Register Link */}
            <Text textAlign="center" color="gray.600" _dark={{ color: "gray.400" }}>
              Нет аккаунта?{" "}
              <Text
                as="span"
                color="teal.600"
                _dark={{ color: "teal.400" }}
                cursor="pointer"
                fontWeight="medium"
                textDecoration="underline"
                onClick={() => setShowRegister(!showRegister)}
              >
                Зарегистрироваться
              </Text>
            </Text>
          </VStack>
        </form>

        {/* Register Form Placeholder */}
        {showRegister && (
          <Box mt={4} p={4} bg="gray.50" _dark={{ bg: "gray.700" }} rounded="md">
            <Text textAlign="center" color="gray.600" _dark={{ color: "gray.400" }}>
              Функция регистрации будет доступна позже
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;