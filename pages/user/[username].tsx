import {
  Avatar,
  Divider,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { Card } from "components/Card";
import { MainLayout } from "layout";
import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "config";
import { Project, User } from "types/projects";
import ProjectDisplayCard from "components/ProjectDisplayCard";

interface IProfilePageProps {
  user: User;
}
const Profile = ({ user }: IProfilePageProps) => {
  const [userProjects, setUserProjects] = React.useState<Project[]>([]);
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/${user.username}/projects`
      );
      console.log(response);
      setUserProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <MainLayout>
      <Card>
        <VStack justifyContent="center" alignItems="center">
          <Avatar size="2xl" name={user.firstName} marginRight="1.5" />
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Heading p="1.5">{user.firstName}</Heading>
            {user.bio ? <Text p="1">{user.bio}</Text> : null}
            <Text p="1">{user.username}</Text>
          </Flex>
        </VStack>
      </Card>
      <Divider height={5} />
      <Text textAlign="center" mt={10} fontSize="2xl">
        Projects by {user.firstName}
      </Text>
      {userProjects.length === 0 &&
        Array(5).map((item, index) => {
          return (
            <Box padding="6" boxShadow="lg" key={item}>
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          );
        })}
      {userProjects &&
        userProjects.length > 0 &&
        userProjects.map((item, index) => {
          return <ProjectDisplayCard key={index} project={item} />;
        })}
    </MainLayout>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const username = context.params.username;
  const res = await axios.get(`${BASE_URL}/users/${username}`);
  const user: User = await res.data;
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
}
