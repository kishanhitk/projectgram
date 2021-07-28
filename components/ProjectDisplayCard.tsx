import {
  useColorModeValue,
  Stack,
  Heading,
  Image,
  Text,
  Img,
} from "@chakra-ui/react";
import React from "react";
import { Project } from "types/projects";
import Link from "next/link";
interface IProjectDisplayCardProps {
  project: Project;
}
function ProjectDisplayCard({ project }: IProjectDisplayCardProps) {
  const boxBGcolor = useColorModeValue("gray.100", "gray.700");

  return (
    <Stack my={7} bgColor={boxBGcolor} p={5} rounded={5} cursor="pointer">
      {project.images && (
        <Link href={`/projects/${project.slug}`} passHref>
          <Img
            width="100%"
            height="50%"
            fit="fill"
            rounded={5}
            alt={project.title}
            src={project.images[0]}
          ></Img>
        </Link>
      )}
      <Heading textDecoration="none" fontSize="2xl">
        {project.title}
      </Heading>
      <Text fontSize="lg">{project.shortDescription}</Text>
      <Text fontSize="sm">{project.longDescription}</Text>
    </Stack>
  );
}

export default ProjectDisplayCard;
