import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";

function App() {
  return (
    <>
      <Flex direction="column" alignItems="center" marginTop="20">
        <Center>
          <Heading>Welcome to Projectgram!</Heading>
        </Center>
        <Button m="10" variant="solid" colorScheme="messenger">
          Get Started
        </Button>
      </Flex>
    </>
  );
}

export default App;
