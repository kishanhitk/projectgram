import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HTMLChakraProps,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
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
import UploadInput from "./UploadInput";
import useStorage from "hooks/useStorage";
import { FiFile } from "react-icons/fi";

function ProjectSubmissionForm(props: HTMLChakraProps<"form">) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [title, setTitle] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [longDescription, setLongDescription] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [file, setFile] = React.useState(null);
  const inputRef = React.useRef<HTMLInputElement>();
  const { url, progress } = useStorage(file);

  React.useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <chakra.form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(title);
        setIsLoading(true);
        try {
          const token = JSON.parse(window.localStorage.getItem("token"));
          //   AuthService.login(username, password);
          console.log(token);
          const res = await axios.post(
            `${BASE_URL}/projects`,
            {
              title,
              shortDescription,
              longDescription,
              images: [url],
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
        <FormControl isRequired>
          <FormLabel>Name of Project</FormLabel>
          <Input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        {/* <UploadInput /> */}
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
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="writeUpFile">Project Screenshots</FormLabel>
          <InputGroup cursor="grab">
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<Icon as={FiFile} />}
            />
            <input
              type="file"
              ref={inputRef}
              // inputRef={ref}
              style={{ display: "none" }}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                console.log(selectedFile);
                setFile(selectedFile);
              }}
            ></input>
            <Input
              placeholder={"Your file ..."}
              onClick={() => inputRef.current.click()}
            />
          </InputGroup>
          <FormErrorMessage>{progress}</FormErrorMessage>
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
