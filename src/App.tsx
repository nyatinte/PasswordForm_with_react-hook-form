import { Button, Container, Heading, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { PasswordInput } from "./components/PasswordInput";

type Inputs = {
  password: string;
  confirmPassword: string;
};
export const App = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ mode: "onChange" });
  const toast = useToast();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(`パスワード: ${data.password}`);
    toast({
      title: "正常に送信できました！",
      status: "success",
      duration: 9000,
      isClosable: true
    });
  };
  return (
    <Container p="10" bg="gray.100" ac="section">
      <Heading textAlign="center" pb="10">
        パスワードフォームテスト
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="5">
          <PasswordInput
            error={errors.password}
            {...register("password", {
              required: "必須です",
              pattern: {
                value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/,
                message: "半角英数字8文字以上で"
              }
            })}
          />
          <PasswordInput
            placeholder="確認用のパスワードを入力"
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues("password") || "パスワードが異なります"
            })}
            error={errors.confirmPassword}
          />
          {}
          <Button type="submit" colorScheme="blue" size="md">
            送信
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
