import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/hook";
import { getAuthLoading, getAuthError } from "../model/selectors";
import loginThunk from "../model/thunks/loginThunk";
import type { LoginRequest } from "../model/types";

const schema = yup.object({
  username: yup.string().required("Имя пользователя обязательно"),
  password: yup.string().required("Пароль обязателен"),
});

type Props = {
  onSwitchToRegister: () => void;
};

const LoginForm = ({ onSwitchToRegister }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getAuthLoading);
  const error = useAppSelector(getAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "admin",
      password: "admin123",
    },
  });

  const onSubmit = (data: LoginRequest) => {
    dispatch(loginThunk(data));
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4}>
          <Input placeholder="Имя пользователя" {...register("username")} />
          {errors.username && (
            <Text color="red.500">{errors.username.message}</Text>
          )}

          <Input
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
          {errors.password && (
            <Text color="red.500">{errors.password.message}</Text>
          )}

          {error && <Text color="red.500">{error}</Text>}

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            loading={loading}
          >
            Войти
          </Button>

          <Text>
            Нет аккаунта?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={onSwitchToRegister}
            >
              Зарегистрироваться
            </Text>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
