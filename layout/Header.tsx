import React, { ReactNode } from "react";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Routes } from "config";
import { SunIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
interface NavLinkProps extends ButtonProps {
  url: string;
  children: ReactNode;
}
export const Header = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchInput, setSearchInput] = React.useState("");
  const { data: session } = useSession();
  return (
    <Flex
      as="header"
      position="sticky"
      justifyContent="space-between"
      maxW="100%"
      m="0 auto"
      mb={8}
      align="center"
      px={20}
      py={2}
      top="0"
      zIndex={10}
      borderBottom="1px solid rgba(33,41,63,.1)"
      bg={useColorModeValue("rgba(255, 250, 250, 0.5)", "rgba(26, 32, 44,0.8)")}
      style={{
        backdropFilter: `saturate(180%) blur(10px)`,
        transition: "background-color 0.1 ease-in-out",
      }}
    >
      <Box as="nav">
        <HStack spacing={5}>
          <NextLink href={Routes.home} passHref>
            <Link _hover={{ textDecor: "none" }}>
              <Avatar name="Project Gram"></Avatar>
            </Link>
          </NextLink>
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
          <NavLink url={Routes.about}>About</NavLink>
        </HStack>
      </Box>
      {/* Nav */}
      <Box as="nav">
        <HStack spacing={5}>
          {session && (
            <NavLinkSolid key="new" url={Routes.submitNewProject}>
              Submit Project 🚀
            </NavLinkSolid>
          )}
          {!session ? (
            <NavLinkSolid key="login" url={Routes.login}>
              Login
            </NavLinkSolid>
          ) : (
            <NextLink href={`/user/${session.user.name}`} passHref>
              <Avatar
                src={session.user?.image}
                name={session.user.name}
                _hover={{ textDecor: "none", cursor: "pointer" }}
              ></Avatar>
            </NextLink>
          )}
          <IconButton
            onClick={toggleColorMode}
            aria-label="theme-switcher"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            size="md"
            borderRadius="100px"
            bg="none"
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export const NavLink = ({ url, children }: NavLinkProps) => (
  <NextLink href={url} passHref>
    <Link _hover={{ textDecor: "none" }}>
      <Button
        bg="none"
        fontWeight="normal"
        _hover={{ bg: "blue.100", color: "blue.700" }}
        _active={{ bg: "blue.200" }}
      >
        {children}
      </Button>
    </Link>
  </NextLink>
);

export const NavLinkSolid = ({ url, children }: NavLinkProps) => (
  <NextLink href={url} passHref>
    <Link _hover={{ textDecor: "none" }}>
      <Button fontWeight="normal" variant="solid" colorScheme="messenger">
        {children}
      </Button>
    </Link>
  </NextLink>
);
