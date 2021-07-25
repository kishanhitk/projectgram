import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "config";
import { useRouter } from "next/dist/client/router";
import React from "react";
import jwt_decode from "jwt-decode";
import { AuthService } from "services/auth.services";

function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = React.useState("kishanhitk");
  const [password, setPassword] = React.useState("1234");
  const [error, setError] = React.useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <Center height="100vh">
      <Box bgColor="gray.200" rounded={10} maxWidth="400px" width="100%" m={10}>
        <form onSubmit={handleSubmit}>
          <VStack p={10}>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              variant="filled"
            ></Input>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="filled"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
            </InputGroup>
            {error && (
              <Box color="red.500" p={2} textAlign="center">
                {error}
              </Box>
            )}
            <Button type="submit" variant="solid" colorScheme="messenger">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

export default Login;
