import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { MainLayout } from "layout";
import Link from "next/link";
import React from "react";
import Logo from "components/Logo";
import ProjectSubmissionForm from "components/ProjectSubmissionForm";
import { useSession } from "next-auth/react";
import Head from "next/head";

function SubmitProject() {
  const { data: session } = useSession();
  if (loading) return <CircularProgress />;

  return (
    <MainLayout>
      <Head>
        <title>Submit New Project - Project Gram</title>
        <meta name="description" content="Submit New Project on Project Gram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <Flex direction="column" alignItems="center">
          <Heading>Please Login</Heading>
          <Link passHref href="/login">
            <Button>Login</Button>
          </Link>
        </Flex>
      ) : (
        <>
          <Box mx="auto" boxShadow="xl" rounded="xl">
            <Center>
              <Logo />
            </Center>
            <Heading fontSize="2xl" textAlign="center" fontWeight="bold">
              👋 Tell us more about this project
            </Heading>
            <ProjectSubmissionForm p={10} />
          </Box>
        </>
      )}
    </MainLayout>
  );
}

export default SubmitProject;
