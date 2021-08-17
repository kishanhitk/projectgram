import { Heading, HStack, Img, Link, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import ProjectDisplayCard from "components/ProjectDisplayCard";
import ProjectDisplayCardWithButtons from "components/ProjectDisplayCardWithButton";
import { BASE_URL } from "config";
import { MainLayout } from "layout";
import React from "react";
import { Project } from "types/projects";

interface IProjectPageProps {
  project: Project;
}
function ProjectPage({ project }: IProjectPageProps) {
  return (
    <MainLayout>
      <HStack justify="flex-start" align="flex-start" spacing={10}>
        {project.images ? (
          <Img
            width="100px"
            height="100px"
            fit="fill"
            rounded={5}
            alt={project.title}
            src={project.images[0]}
          ></Img>
        ) : (
          <Link href={`/projects/${project.slug}`} passHref>
            <Img
              width="100px"
              height="100px"
              fit="fill"
              rounded={5}
              alt={project.title}
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
            ></Img>
          </Link>
        )}
        <VStack align="flex-start" spacing={1}>
          <Heading>{project.title}</Heading>
          <Text>{project.shortDescription}</Text>
          <Text color="gray" fontSize="sm">
            by {project.creator.firstName}
          </Text>
        </VStack>
      </HStack>
      <ProjectDisplayCardWithButtons
        project={project}
      ></ProjectDisplayCardWithButtons>
    </MainLayout>
  );
}

export default ProjectPage;

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const res = await axios.get(`${BASE_URL}/projects/${slug}`);
  const project: Project = await res.data;
  return {
    props: {
      project,
    },
  };
}
