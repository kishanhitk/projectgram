import {
  Box,
  Center,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Card } from "components/Card";
import { DividerWithText } from "components/DividerWIthText";
import { TextLink } from "components/TextLink";
import LoginForm from "components/LoginForm";
import * as React from "react";
import Logo from "components/Logo";
import Head from "next/head";
import LoginWithGoogleButton from "components/LoginWithGoogleButton";

const Login = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Head>
        <title>Login | ProjectGram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxW="md" mx="auto">
        <Center>
          <Logo />
        </Center>
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>
          <TextLink href="/signup">Create new account</TextLink>
        </Text>
        <Card>
          <LoginForm />
          <DividerWithText>or</DividerWithText>
          <LoginWithGoogleButton />
        </Card>
      </Box>
    </Box>
  );
};
export default Login;
