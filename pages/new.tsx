import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { MainLayout } from "layout";
import { AuthService } from "services/auth.services";
import Link from "next/link";
import React from "react";
import { Card } from "components/Card";
import Logo from "components/Logo";
import ProjectSubmissionForm from "components/ProjectSubmissionForm";
import firebaseClient from "config/firebase";

function SubmitProject() {
  const userToken = AuthService.getCurrentUser();

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
  firebaseClient();
  return (
    <MainLayout>
      <Box minH="100vh" py="12" px={{ base: "4", lg: "8" }}>
        <Box maxW="md" mx="auto" boxShadow="lg">
          <Center>
            <Logo />
          </Center>
          <Heading
            fontSize="xl"
            textAlign="center"
            size="xl"
            fontWeight="extrabold"
          >
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
