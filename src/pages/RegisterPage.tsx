// src/pages/LoginPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import {
  useAppSelector,
  useAppDispatch,
} from "@/app/providers/StoreProvider/hook";
import {
  getIsAuthenticated,
  getAuthLoading,
  getAuthError,
} from "@/entities/auth/model/selectors";
import loginThunk from "@/entities/auth/model/thunks/loginThunk";
import { FormProvider, useForm } from "react-hook-form";
import { type LoginRequest } from "@/entities/auth/model/types";
import ValidatedInput from "@/shared/ui/ValidatedInput";

const RegisterPage = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const loading = useAppSelector(getAuthLoading);
  const error = useAppSelector(getAuthError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (data: LoginRequest) => {
    dispatch(loginThunk(data));
  };

  return (
    <>
      {/* Form Title */}
      <Heading
        size="xl"
        textAlign="center"
        mb={8}
        color="gray.800"
        _dark={{ color: "white" }}
      >
        Зарегистрироваться
      </Heading>

      {/* Login Form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              <ValidatedInput
                name="username"
                placeholder="Введите имя пользователя"
                required={"Имя пользователя обязательно"}
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
              <ValidatedInput
                name="password"
                type="password"
                placeholder="Введите пароль"
                required={"Пароль обязательно"}
                minlength={8}
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
            <Text
              textAlign="center"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              Нет аккаунта?{" "}
              <Text
                as="span"
                color="teal.600"
                _dark={{ color: "teal.400" }}
                cursor="pointer"
                fontWeight="medium"
                textDecoration="underline"
              >
                Зарегистрироваться
              </Text>
            </Text>
          </VStack>
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterPage;
