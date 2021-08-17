import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HTMLChakraProps,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Image,
  Textarea,
  HStack,
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
import { ImCross } from "react-icons/im";

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
  const [imageUrl, setImageUrl] = React.useState(null);
  const [liveUrl, setLiveUrl] = React.useState(null);
  const [sourceCode, setSourceCode] = React.useState(null);
  // React.useEffect(() => {
  //   if (url) {
  //     setFile(null);
  //   }
  // }, [url, setFile]);

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
              bannerImage: url,
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
          <FormLabel htmlFor="writeUpFile">Project Featured Image</FormLabel>
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
          <FormErrorMessage>{progress}</FormErrorMessage>
        </FormControl>
        {imageUrl && (
          <Box postion="relative" bg="blue">
            <Button
              right="100"
              colorScheme="red"
              onClick={() => setImageUrl(null)}
              zIndex="2"
              position="absolute"
            >
              <Icon as={ImCross} />
            </Button>
            <Image src={imageUrl} alt="image"></Image>
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
