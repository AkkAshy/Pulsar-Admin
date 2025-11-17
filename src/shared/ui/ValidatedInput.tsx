import { Box, Input, Text } from "@chakra-ui/react";
import { useFormContext, type FieldError } from "react-hook-form";

type Props = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean | string;
  minlength?: number;
  maxlength?: number;
};
const ValidatedInput = ({
  name,
  type = "text",
  placeholder = "",
  required = false,
  minlength,
  maxlength,
}: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  const validationRules: Record<string, any> = {};
  if (required) validationRules.required = required;
  if (minlength)
    validationRules.minLength = {
      value: minlength,
      message: `Поле должно содержать не менее ${minlength} символов`,
    };
  if (maxlength)
    validationRules.maxLength = {
      value: maxlength,
      message: `Поле должно содержать не более ${maxlength} символов`,
    };

  return (
    <Box>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={isSubmitting}
        {...register(name, validationRules)}
      />
      {error?.message && <Text color="red.500">{error.message}</Text>}
    </Box>
  );
};

export default ValidatedInput;
