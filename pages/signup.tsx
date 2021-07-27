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
import SignUpForm from "components/SignUpForm";
import Logo from "components/Logo";

function SignUp() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Box maxW="md" mx="auto">
        <Center>
          <Logo />
        </Center>
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Create new account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Already have an account?</Text>
          <TextLink href="/login">Login here</TextLink>
        </Text>
        <Card>
          <SignUpForm />
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
}

export default SignUp;