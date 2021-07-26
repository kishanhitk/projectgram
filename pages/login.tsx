// import {
//   Box,
//   Button,
//   Center,
//   Input,
//   InputGroup,
//   InputRightElement,
//   VStack,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { BASE_URL } from "config";
// import { useRouter } from "next/dist/client/router";
// import React from "react";
// import jwt_decode from "jwt-decode";
// import { AuthService } from "services/auth.services";

// function Login() {
// const [show, setShow] = React.useState(false);
// const handleClick = () => setShow(!show);
// const [username, setUsername] = React.useState("kishanhitk");
// const [password, setPassword] = React.useState("1234");
// const [error, setError] = React.useState(null);
// const router = useRouter();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     //   AuthService.login(username, password);
//     const res = await axios.post(`${BASE_URL}/auth/login`, {
//       username,
//       password,
//     });
//     console.log(res.data);
//     const token = res.data.access_token;
//     window.localStorage.setItem("token", JSON.stringify(token));
//     var decoded: any = jwt_decode(token);
//     window.localStorage.setItem("username", decoded.username);
//     console.log(decoded);
//     router.replace("/");
//   } catch (error) {
//     console.log(error);
//     setError(error.response.data.message);
//   }
// };

//   return (
//     <Center height="100vh">
//       <Box bgColor="gray.200" rounded={10} maxWidth="400px" width="100%" m={10}>
//         <form onSubmit={handleSubmit}>
//           <VStack p={10}>
//             <Input
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               placeholder="Username"
//               variant="filled"
//             ></Input>
//             <InputGroup size="md">
//               <Input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 variant="filled"
//                 type={show ? "text" : "password"}
//                 placeholder="Enter password"
//               />
//             </InputGroup>
//             {error && (
              // <Box color="red.500" p={2} textAlign="center">
              //   {error}
              // </Box>
//             )}
//             <Button type="submit" variant="solid" colorScheme="messenger">
//               Login
//             </Button>
//           </VStack>
//         </form>
//       </Box>
//     </Center>
//   );
// }

// export default Login;
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Card } from "components/Card";
import { DividerWithText } from "components/DividerWIthText";
import { TextLink } from "components/TextLink";
import LoginForm from "components/LoginForm";
import * as React from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => (
  <Box
    bg={useColorModeValue("gray.50", "inherit")}
    minH="100vh"
    py="12"
    px={{ base: "4", lg: "8" }}
  >
    <Box maxW="md" mx="auto">
      <Center>
        <Avatar size="md" mb={5} name="Project Gram"></Avatar>
      </Center>
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Sign in to your account
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Don&apos;t have an account?</Text>
        <TextLink href="#">Create new account</TextLink>
      </Text>
      <Card>
        <LoginForm />
        <DividerWithText mt="6">or continue with</DividerWithText>
        <SimpleGrid mt="6" columns={3} spacing="3">
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Github</VisuallyHidden>
            <FaGithub />
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
  </Box>
);
export default Login;
