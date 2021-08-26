import {
  Box,
  Button,
  Center,
  CircularProgress,
  Heading,
} from "@chakra-ui/react";
import { MainLayout } from "layout";
import Link from "next/link";
import React from "react";
import { Card } from "components/Card";
import Logo from "components/Logo";
import ProjectSubmissionForm from "components/ProjectSubmissionForm";
import firebaseClient from "config/firebase";
import { useSession } from "next-auth/client";

function SubmitProject() {
  const [session, loading] = useSession();
  if (loading) return <CircularProgress />;
  if (!session) {
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
