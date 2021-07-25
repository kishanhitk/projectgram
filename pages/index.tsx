import {
  Button,
  Heading,
  HStack,
  Skeleton,
  Text,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { MainLayout } from "layout/MainLayout";
import Head from "next/head";
import React from "react";
import { Project } from "types/projects";
import Link from "next/link";
interface IHomePageProps {
  projects: Project[];
}
export default function Home({ projects }: IHomePageProps) {
  return (
    <MainLayout>
      <Head>
        <title>Project Gram</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack>
        <Heading>Top Projects</Heading>
        <Spacer />
        <Button variant="ghost">New</Button>
        <Button variant="ghost">Trending</Button>
      </HStack>
      <Stack mt={10}>
        {projects.map((project) => (
          <Link key={project.id} passHref href={project.slug}>
            <Stack my={5} cursor="pointer">
              <SkeletonCircle size="20" />
              <Heading fontSize="lg">{project.title}</Heading>
              <Text>{project.shortDescription}</Text>
              <Skeleton height="30px" />
              <SkeletonText mt="4" noOfLines={5} spacing="2" />
            </Stack>
          </Link>
        ))}

        {/* <Skeleton height="100px" /> */}
      </Stack>
    </MainLayout>
  );
}

// Get Server Side Props
export async function getServerSideProps(context) {
  const baseUrl = process.env.BASE_URL;
  const res = await axios.get(`${baseUrl}/projects`);
  const projects: Project[] = await res.data;
  return {
    props: {
      projects,
    },
  };
}
