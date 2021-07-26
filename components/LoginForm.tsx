import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "config";
import { useRouter } from "next/router";
import * as React from "react";
import { PasswordField } from "./PasswordField";
import jwt_decode from "jwt-decode";

function LoginForm(props: HTMLChakraProps<"form">) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = React.useState("kishanhitk");
  const [password, setPassword] = React.useState("1234");
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(username);
        setIsLoading(true);
        try {
          //   AuthService.login(username, password);
          const res = await axios.post(`${BASE_URL}/auth/login`, {
            username,
            password,
          });
          console.log(res.data);
          const token = res.data.access_token;
          window.localStorage.setItem("token", JSON.stringify(token));
          var decoded: any = jwt_decode(token);
          window.localStorage.setItem("username", decoded.username);
          console.log(decoded);
          router.replace("/");
        } catch (error) {
          console.log(error);
          setError(error.response.data.message);
        }
        setIsLoading(false);
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="username"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          isLoading={isLoading}
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
        >
          Sign in
        </Button>
        <Box color="red.500" p={2} textAlign="center">
          {error}
        </Box>
      </Stack>
    </chakra.form>
  );
}

export default LoginForm;
