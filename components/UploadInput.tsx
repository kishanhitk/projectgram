import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import useStorage from "hooks/useStorage";
import React, { useEffect } from "react";
import { FiFile } from "react-icons/fi";

function UploadInput() {
  const [file, setFile] = React.useState(null);
  const inputRef = React.useRef<HTMLInputElement>();
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <FormControl isRequired>
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
  );
}

export default UploadInput;
