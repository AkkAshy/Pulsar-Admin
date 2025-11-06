import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Heading } from "@chakra-ui/react";
import { useAppSelector } from "@/app/providers/StoreProvider/hook";
import { getIsAuthenticated } from "@/entities/auth/model/selectors";
import LoginForm from "@/entities/auth/ui/LoginForm";
import RegisterForm from "@/entities/auth/ui/RegisterForm";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box bg="white" p={8} rounded="md" shadow="md" width="full" maxW="md">
        <Heading textAlign="center" mb={6}>
          {isLogin ? "Вход" : "Регистрация"}
        </Heading>
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
