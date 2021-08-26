import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  HStack,
  HTMLChakraProps,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "config";
import { useRouter } from "next/router";
import * as React from "react";
import { PasswordField } from "./PasswordField";

function SignUpForm(props: HTMLChakraProps<"form">) {
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(username);
        setIsLoading(true);
        try {
          const res = await axios.post(`${BASE_URL}/users`, {
            firstName,
            email,
            lastName,
            username,
            password,
          });
          router.replace("/login");
        } catch (error) {
          console.log(error);
          setError(error.response.data.message);
        }
        setIsLoading(false);
      }}
      {...props}
    >
      <Stack spacing="6">
        <HStack>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              type="name"
              autoComplete="first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              type="name"
              autoComplete="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
        </HStack>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="username">
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
          Create Account
        </Button>
        <Box color="red.500" p={2} textAlign="center">
          {error}
        </Box>
      </Stack>
    </chakra.form>
  );
}

export default SignUpForm;
