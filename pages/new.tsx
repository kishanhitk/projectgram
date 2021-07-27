import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  useColorModeValue,
  VisuallyHidden,
  Text
} from "@chakra-ui/react";
import { MainLayout } from "layout";
import { Header } from "layout/Header";
import { useRouter } from "next/dist/client/router";
import { AuthService } from "services/auth.services";
import Router from "next/router";
import Link from "next/link";
import React from "react";
import { Card } from "components/Card";
import { DividerWithText } from "components/DividerWIthText";
import LoginForm from "components/LoginForm";
import Logo from "components/Logo";
import { TextLink } from "components/TextLink";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import ProjectSubmissionForm from "components/ProjectSubmissionForm";

function SubmitProject() {
  const userToken = AuthService.getCurrentUser();
  const router = useRouter();

  if (!userToken) {
    return (
      <MainLayout>
        <Heading>Please Login</Heading>
        <Link passHref href="/login">
          <Button>Login</Button>
        </Link>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
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
            👋 Tell us more about this project
          </Heading>
          
          <Card>
            <ProjectSubmissionForm />
            
            
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default SubmitProject;

export async function getServerSideProps(context) {
  if (typeof window !== "undefined")
    console.log(window.localStorage.getItem("token"));
  return {
    props: {}, // will be passed to the page component as props
  };
}
