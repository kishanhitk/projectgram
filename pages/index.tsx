import { Button, Heading, HStack, Link, Spacer, Stack } from "@chakra-ui/react";
import axios from "axios";
import { MainLayout } from "layout/MainLayout";
import Head from "next/head";
import React from "react";
import { Project } from "types/projects";
import { BASE_URL } from "config";
import ProjectDisplayCard from "components/ProjectDisplayCard";
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
        <Link href="/latest" passHref>
          <Button variant="ghost">Latest</Button>
        </Link>
        <Link href="/trending" passHref>
          <Button variant="ghost">Trending</Button>
        </Link>
      </HStack>
      <Stack mt={10}>
        {projects.map((project) => (
          <ProjectDisplayCard key={project.slug} project={project} />
        ))}
      </Stack>
    </MainLayout>
  );
}

// Get Server Side Props
export async function getServerSideProps(context) {
  const res = await axios.get(`${BASE_URL}/projects?sortBy=popular`);
  const projects: Project[] = await res.data;
  return {
    props: {
      projects,
    },
  };
}
