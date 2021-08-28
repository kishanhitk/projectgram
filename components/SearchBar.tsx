import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import router from "next/router";
import React from "react";

function SearchBar() {
  const [searchInput, setSearchInput] = React.useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${searchInput}`);
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            // eslint-disable-next-line react/no-children-prop
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            variant="filled"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></Input>
        </InputGroup>
      </form>
    </div>
  );
}

export default SearchBar;
