import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "config";
import { useRouter } from "next/router";
import * as React from "react";
import { PasswordField } from "./PasswordField";
import jwt_decode from "jwt-decode";
import { FaWindows } from "react-icons/fa";

function ProjectSubmissionForm(props: HTMLChakraProps<"form">) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [title, setTitle] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(title);
        setIsLoading(true);
        try {
          const token = JSON.parse(window.localStorage.getItem("token"));
          //   AuthService.login(username, password);
          const res = await axios.post(
            `${BASE_URL}/projects`,
            {
              title,
              shortDescription,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          router.replace("/");
        } catch (error) {
          console.log(error);
          setError(error.response.data.message);
        }
        setIsLoading(false);
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl>
          <FormLabel>Name of Project</FormLabel>
          <Input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tweet size description of your project</FormLabel>
          <Input
            type="text"
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Long Description</FormLabel>
          <Textarea
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Live URL</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Source Code</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <Button
          isLoading={isLoading}
          type="submit"
          colorScheme="blue"
          size="lg"
          fontSize="md"
        >
          Submit Project 🚀
        </Button>
        <Box color="red.500" p={2} textAlign="center">
          {error}
        </Box>
      </Stack>
    </chakra.form>
  );
}

export default ProjectSubmissionForm;
