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
import * as React from "react";
import SignUpForm from "components/SignUpForm";
import Logo from "components/Logo";
import LoginWithGoogleButton from "components/LoginWithGoogleButton";

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
          <DividerWithText>or</DividerWithText>
          <LoginWithGoogleButton />
        </Card>
      </Box>
    </Box>
  );
}

export default SignUp;
