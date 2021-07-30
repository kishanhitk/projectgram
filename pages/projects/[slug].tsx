import { Heading, HStack, Img, Text, VStack } from "@chakra-ui/react";
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
        <Img
          width="100px"
          height="100px"
          fit="fill"
          rounded={5}
          alt={project.title}
          src={project.images[0]}
        ></Img>

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
