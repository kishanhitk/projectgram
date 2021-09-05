import { Avatar, Button, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { Card } from "components/Card";
import { MainLayout } from "layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "config";
import { Project, User } from "types/projects";
import ProjectDisplayCard from "components/ProjectDisplayCard";
import { signOut, useSession } from "next-auth/client";
import UserAvatar from "components/UserAvatar";
import Head from "next/head";
import moment from "moment";

interface IProfilePageProps {
  user: User;
}
const Profile = ({ user }: IProfilePageProps) => {
  const [isSelf, setIsSelf] = useState(false);
  const [userProjects, setUserProjects] = React.useState<Project[]>([]);
  const [session, loading] = useSession();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainLayout>
      <Head>
        <title>{`${user.firstName}  ${user.lastName}`} | ProjectGram</title>
        <meta name="description" content={`${user.firstName} on ProjectGram`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card>
        <VStack justifyContent="center" alignItems="center">
          <UserAvatar user={user} size="2xl" />
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Heading p="1.5">{user.firstName + " " + user.lastName}</Heading>
            {user.bio ? <Text p="1">{user.bio}</Text> : null}
            <Text p="1">@{user.username}</Text>
            <Text p="1">
              Joined - {moment(user.createdAt).format("MMMM Do YYYY")}
            </Text>
            {!loading && session?.user?.name === user.username && (
              <Button
                m={4}
                colorScheme="red"
                variant="ghost"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </Button>
            )}
          </Flex>
        </VStack>
      </Card>
      <Text textAlign="center" m={10} fontSize="3xl">
        Projects by {user.firstName}
      </Text>
      <VStack spacing={10}>
        {userProjects.length === 0 &&
          [1, 2, 3, 4].map((item) => {
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
      </VStack>
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
