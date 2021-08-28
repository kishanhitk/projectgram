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
  Image,
  Textarea,
  Center,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "config";
import { useRouter } from "next/router";
import * as React from "react";
import useStorage from "hooks/useStorage";
import { FiFile } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useSession } from "next-auth/client";
import { Project } from "types/projects";

function ProjectSubmissionForm(props: HTMLChakraProps<"form">) {
  const [session, loading] = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [longDescription, setLongDescription] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [liveUrl, setLiveUrl] = React.useState(null);
  const [sourceCode, setSourceCode] = React.useState(null);
  const [error, setError] = React.useState(null);
  // const { url, progress } = useStorage(file);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = session.access_token;
      let res: AxiosResponse;
      res = await axios.post(
        `${BASE_URL}/projects`,
        {
          title,
          shortDescription,
          longDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      const uploadedProject: Project = res.data;

      try {
        const formData = new FormData();
        formData.append("bannerImage", file);
        formData.append("projectId", uploadedProject.id);
        const uploadBannerImageResponse = await axios.post(
          `${BASE_URL}/projects/upload/bannerImage`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(uploadBannerImageResponse);
      } catch (error) {
        setError(error.response.data.message);
      }
      router.replace(`/projects/${uploadedProject.slug}`);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  const inputRef = React.useRef<HTMLInputElement>();
  return (
    <chakra.form onSubmit={submitHandler} {...props}>
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
          <FormLabel htmlFor="writeUpFile">Project Featured Image</FormLabel>
          {!imageUrl && (
            <InputGroup cursor="grab">
              <InputLeftElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<Icon as={FiFile} />}
              />
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  console.log(selectedFile);
                  setFile(selectedFile);
                  console.log(URL.createObjectURL(selectedFile));
                  setImageUrl(URL.createObjectURL(selectedFile));
                }}
              ></input>
              <Button
                width="100%"
                placeholder={"Your file ..."}
                onClick={() => inputRef.current.click()}
              >
                Upload File
              </Button>
            </InputGroup>
          )}
        </FormControl>
        {imageUrl && (
          <Box postion="relative" bg="gray.100">
            <Button
              m={2}
              colorScheme="red"
              onClick={() => setImageUrl(null)}
              zIndex="2"
              position="absolute"
            >
              <Icon as={ImCross} />
            </Button>
            <Center>
              <Image src={imageUrl} alt="image"></Image>
            </Center>
          </Box>
        )}
        <FormControl>
          <FormLabel>Live URL</FormLabel>
          <Input
            type="text"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Source Code</FormLabel>
          <Input
            type="text"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
          />
        </FormControl>
        <Button
          isLoading={isLoading}
          type="submit"
          colorScheme="messenger"
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
