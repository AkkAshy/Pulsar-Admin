import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/hook";
import { getAuthLoading, getAuthError } from "../model/selectors";
import registerThunk from "../model/thunks/registerThunk";
import type { RegisterRequest } from "../model/types";

type RegisterFormData = Omit<RegisterRequest, "role">;

const schema = yup.object({
  username: yup.string().required("Имя пользователя обязательно"),
  full_name: yup.string().required("Полное имя обязательно"),
  email: yup.string().email("Неверный email").required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязателен"),
});

type Props = {
  onSwitchToLogin: () => void;
};

const RegisterForm = ({ onSwitchToLogin }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getAuthLoading);
  const error = useAppSelector(getAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const registerData: RegisterRequest = { ...data, role: "admin" };
    dispatch(registerThunk(registerData));
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4}>
          <Input placeholder="Имя пользователя" {...register("username")} />
          {errors.username && (
            <Text color="red.500">{errors.username.message}</Text>
          )}

          <Input placeholder="Полное имя" {...register("full_name")} />
          {errors.full_name && (
            <Text color="red.500">{errors.full_name.message}</Text>
          )}

          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <Text color="red.500">{errors.email.message}</Text>}

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
            Зарегистрироваться
          </Button>

          <Text>
            Уже есть аккаунт?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={onSwitchToLogin}
            >
              Войти
            </Text>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterForm;
