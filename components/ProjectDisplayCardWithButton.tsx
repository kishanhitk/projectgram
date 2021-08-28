import {
  useColorModeValue,
  Stack,
  Heading,
  Text,
  Img,
  HStack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Project } from "types/projects";
import Link from "next/link";
import UpvoteButton from "./UpvoteButton";
interface IProjectDisplayCardProps {
  project: Project;
}
function ProjectDisplayCardWithButtons({ project }: IProjectDisplayCardProps) {
  const boxBGcolor = useColorModeValue("gray.100", "gray.700");

  return (
    <Stack my={7} bgColor={boxBGcolor} p={5} rounded={5} spacing={3}>
      <Link href={`/projects/${project.slug}`} passHref>
        <Img
          width="100%"
          height="50%"
          fit="fill"
          rounded={5}
          alt={project.title}
          src={
            project.bannerImage?.url ??
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
          }
        ></Img>
      </Link>
      )
      <HStack justify="space-between">
        <Heading textDecoration="none" fontSize="3xl">
          {project.title}
        </Heading>
        <HStack>
          <Button variant="solid" colorScheme="messenger">
            Try it
          </Button>
          <UpvoteButton project={project} />
        </HStack>
      </HStack>
      <Text fontSize="lg">{project.shortDescription}</Text>
      <Text fontSize="sm">{project.longDescription}</Text>
    </Stack>
  );
}

export default ProjectDisplayCardWithButtons;
