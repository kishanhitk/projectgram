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
import { useRouter } from "next/router";
import * as React from "react";
import { PasswordField } from "./PasswordField";
import { signIn } from "next-auth/react";

function LoginForm(props: HTMLChakraProps<"form">) {
  const [username, setUsername] = React.useState("acer");
  const [password, setPassword] = React.useState("1234");
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          // const res = await signIn("credentials", {
          //   username: username,
          //   password: password,
          //   callbackUrl: "/",
          //   redirect: false,
          // });
          const res = await signIn("credentials", {
            username: username,
            password: password,
            callbackUrl: "/",
            redirect: false,
          });
          if (res.error === null) {
            router.replace("/");
          }
          if (res.error) {
            setError("Invalid username or password");
          }
        } catch (error) {
          setError(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
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
