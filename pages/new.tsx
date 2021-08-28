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
import Logo from "components/Logo";
import ProjectSubmissionForm from "components/ProjectSubmissionForm";
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
  return (
    <MainLayout>
      <Box mx="auto" boxShadow="xl" rounded="xl">
        <Center>
          <Logo />
        </Center>
        <Heading fontSize="2xl" textAlign="center" fontWeight="bold">
          👋 Tell us more about this project
        </Heading>
        <ProjectSubmissionForm p={10} />
      </Box>
    </MainLayout>
  );
}

export default SubmitProject;
