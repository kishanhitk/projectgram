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
import { AuthService } from "services/auth.services";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { User } from "types/projects";
interface NavLinkProps extends ButtonProps {
  url: string;
  children: ReactNode;
}
export const Header = () => {
  const router = useRouter();
  const userToken: any = AuthService.getCurrentUser();
  const isLoggedIn = userToken !== null;
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchInput, setSearchInput] = React.useState("");
  const [session, loading] = useSession();
  console.log(session?.user);
  return (
    <Flex
      as="header"
      position="sticky"
      justifyContent="space-between"
      maxW="100%"
      m="0 auto"
      mb={8}
      align="center"
      p={4}
      paddingX={10}
      top="0"
      zIndex={10}
      boxShadow="md"
      bg={useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(26, 32, 44,0.8)")}
      style={{
        backdropFilter: `saturate(180%) blur(10px)`,
        transition: "background-color 0.1 ease-in-out",
      }}
    >
      <Box as="nav">
        <HStack spacing={5}>
          <NextLink href={Routes.home}>
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
          <NextLink href={Routes.home}>
            <NavLink url={Routes.about}>About</NavLink>
          </NextLink>
        </HStack>
      </Box>
      {/* Nav */}
      <Box as="nav">
        <HStack>
          <HStack>
            {session && (
              <NavLink key="new" url={Routes.submitNewProject}>
                Submit Project 🚀
              </NavLink>
            )}
            {session && (
              <Button
                onClick={() => {
                  signOut();
                  // AuthService.logout();
                  // window.location.reload();
                }}
              >
                LogOut{" "}
              </Button>
            )}
            {!session && (
              <NavLinkSolid key="login" url={Routes.login}>
                Login
              </NavLinkSolid>
            )}
            {session && <Avatar name={session.user.email}></Avatar>}
          </HStack>
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

const NavLink = ({ url, children }: NavLinkProps) => (
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

const NavLinkSolid = ({ url, children }: NavLinkProps) => (
  <NextLink href={url} passHref>
    <Link _hover={{ textDecor: "none" }}>
      <Button fontWeight="normal" variant="solid" colorScheme="messenger">
        {children}
      </Button>
    </Link>
  </NextLink>
);
