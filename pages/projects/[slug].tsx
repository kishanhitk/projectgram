import { Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "config";
import { MainLayout } from "layout";
import { Project } from "types/projects";

interface IProjectPageProps {
  project: Project;
}
function ProjectPage({ project }: IProjectPageProps) {
  return (
    <MainLayout>
      <Heading>{project.title}</Heading>
      <Text>by {project.creator.firstName}</Text>
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
