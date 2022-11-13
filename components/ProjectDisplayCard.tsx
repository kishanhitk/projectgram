import {
  useColorModeValue,
  Heading,
  Text,
  Img,
  VStack,
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
    <VStack
      bgColor={boxBGcolor}
      width="100%"
      p={5}
      rounded="lg"
      cursor="pointer"
      alignItems="flex-start"
    >
      <Link href={`/projects/${project.slug}`} passHref>
        <Img
          width="100%"
          height="50%"
          rounded={5}
          alt={project.title}
          src={
            project.bannerImage?.url ??
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
          }
        ></Img>
      </Link>
      <Heading textDecoration="none" fontSize="3xl">
        {project.title}
      </Heading>
      <Text fontSize="lg">{project.shortDescription}</Text>
      <Text fontSize="sm">{project.longDescription}</Text>
    </VStack>
  );
}

export default ProjectDisplayCard;
