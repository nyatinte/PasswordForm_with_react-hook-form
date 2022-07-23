import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  forwardRef,
  Box,
  Text
} from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";

type PasswordInputProps = InputProps & {
  error: any;
};
export const PasswordInput = forwardRef<PasswordInputProps, "input">(
  ({ error, ...props }, ref) => {
    const [show, toggleShow] = useState<boolean>(false);
    const handleClick = () => toggleShow(!show);
    return (
      <Box>
        <InputGroup>
          <Input
            outlineColor="gray.500"
            placeholder="パスワードを入力"
            type={show ? "text" : "password"}
            ref={ref}
            {...props}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={handleClick}>
              {show ? "非表示" : "表示"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error && (
          <Text color="red" pt="1" px="2">
            ※{error.message}
          </Text>
        )}
      </Box>
    );
  }
);
