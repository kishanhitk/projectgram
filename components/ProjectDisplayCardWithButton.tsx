import {
  useColorModeValue,
  Stack,
  Heading,
  Image,
  Text,
  Img,
  HStack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Project } from "types/projects";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from "config";
import { useToast } from "@chakra-ui/react";
interface IProjectDisplayCardProps {
  project: Project;
}
function ProjectDisplayCardWithButtons({ project }: IProjectDisplayCardProps) {
  const toast = useToast();
  const [upvoteButtonLoading, setUpvoteButtonLoading] = React.useState(false);
  const boxBGcolor = useColorModeValue("gray.100", "gray.700");

  const upvoteProject = async () => {
    setUpvoteButtonLoading(true);
    const token = JSON.parse(window.localStorage.getItem("token"));
    console.log(token);
    try {
      const res = await axios.put(
        `${BASE_URL}/projects/${project.slug}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      toast({
        title: "Upvoted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
    setUpvoteButtonLoading(false);
  };

  return (
    <Stack my={7} bgColor={boxBGcolor} p={5} rounded={5} spacing={3}>
      {project.bannerImage ? (
        <Link href={`/projects/${project.slug}`} passHref>
          <Img
            width="100%"
            height="50%"
            fit="fill"
            rounded={5}
            alt={project.title}
            src={project.bannerImage}
          ></Img>
        </Link>
      ) : (
        <Link href={`/projects/${project.slug}`} passHref>
          <Img
            width="100%"
            height="50%"
            fit="fill"
            rounded={5}
            alt={project.title}
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
          ></Img>
        </Link>
      )}
      <HStack justify="space-between">
        <Heading textDecoration="none" fontSize="3xl">
          {project.title}
        </Heading>
        <HStack>
          <Button variant="solid" colorScheme="messenger">
            Try it
          </Button>
          <Button
            variant="solid"
            colorScheme="messenger"
            onClick={upvoteProject}
            isLoading={upvoteButtonLoading}
          >
            Upvote
          </Button>
        </HStack>
      </HStack>
      <Text fontSize="lg">{project.shortDescription}</Text>
      <Text fontSize="sm">{project.longDescription}</Text>
    </Stack>
  );
}

export default ProjectDisplayCardWithButtons;
