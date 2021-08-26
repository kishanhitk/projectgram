import { Heading, Text } from "@chakra-ui/react";
import { MainLayout } from "layout";
import React from "react";

const About = () => {
  return (
    <MainLayout>
      <Heading>ProjectGram</Heading>
      <Text>
        ProjectGram is a portfolio-based platform for makers, builders, and
        creators. A new type of social platform that celebrates your work.
      </Text>
    </MainLayout>
  );
};

export default About;
