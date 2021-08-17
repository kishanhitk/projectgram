import { Avatar, Divider } from "@chakra-ui/react";
import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Card } from "components/Card";
import { MainLayout } from "layout";
import React from "react";
import axios from "axios";
import { BASE_URL } from "config";
import { User } from "types/projects";

const DUMMY_DATA = [
  { Desc: "This is my project" },
  { Desc: "This is my project" },
  { Desc: "This is my project" },
  { Desc: "This is my project" },
  { Desc: "This is my project" },
  { Desc: "This is my project" },
  { Desc: "This is my project" },
  { Desc: "This is my project" },
  { Desc: "This is my project" },
];

interface IProfilePageProps {
  user:User
}
const Profile = ({user}:IProfilePageProps) => {
  
  return (
    <MainLayout>
      <Card>
        <VStack justifyContent="center" alignItems="center">
          <Avatar size="2xl" name={user.firstName} marginRight="1.5" />
          <Flex justifyContent="center" flexDirection="column" alignItems="center">
            <Heading p="1.5">KUMAR ANKUR</Heading>
            <Text p="1">ReactJS developer</Text>
            <Text p="1">@kumar_ank123</Text>
          </Flex>
        </VStack>
      </Card>
      {DUMMY_DATA.map((item) => {
        return (
          <Card marginTop="2" rounded="sm">
            {item.Desc}
          </Card>
        );
      })}
    </MainLayout>
  );
};



export default Profile;


export async function getServerSideProps(context) {
  const username = context.params.username;
  const res = await axios.get(`${BASE_URL}/users/${username}`);
  const user: User = await res.data;
  console.log(BASE_URL);
  return {
    props: {
      user,
    },
  };
}
