import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Container,
  HStack,
  useColorMode,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import NextLink from "next/link";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import Logo from "./Logo";
import React from "react";
import { useSession } from "next-auth/client";
import { Routes } from "config";
import { NavLinkSolid } from "layout/Header";
import router from "next/router";
import SearchBar from "./SearchBar";

export default function ResponsiveNavbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [searchInput, setSearchInput] = React.useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const [session, loading] = useSession();
  return (
    <Box mb={6} as="header" position="sticky" top="0" zIndex={10}>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 2, md: 20 }}
        borderStyle={"solid"}
        dir="row"
        borderBottom="1px solid rgba(33,41,63,.1)"
        bg={useColorModeValue(
          "rgba(255, 250, 250, 0.5)",
          "rgba(26, 32, 44,0.8)"
        )}
        align={{ base: "center" }}
        style={{
          backdropFilter: `saturate(180%) blur(10px)`,
          transition: "background-color 0.1 ease-in-out",
        }}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            ml={2}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <HStack
          align={{ base: "center" }}
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          spacing={{ base: 0, md: 6 }}
        >
          <Logo />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </HStack>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          align="center"
        >
          {!session ? (
            <NavLinkSolid key="login" url={Routes.login}>
              Login
            </NavLinkSolid>
          ) : (
            <>
              <Box display={{ base: "none", md: "inline-flex" }}>
                <NavLinkSolid key="new" url={Routes.submitNewProject}>
                  Submit Project 🚀
                </NavLinkSolid>
              </Box>
              <NextLink href={`/user/${session.user.name}`} passHref>
                <Avatar
                  src={session.user?.image}
                  name={session.user.name}
                  _hover={{ textDecor: "none", cursor: "pointer" }}
                ></Avatar>
              </NextLink>
            </>
          )}

          <IconButton
            display={{ base: "none", md: "inline-flex" }}
            onClick={toggleColorMode}
            aria-label="theme-switcher"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            size="md"
            borderRadius="100px"
            bg="none"
          />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const [searchInput, setSearchInput] = React.useState("");

  return (
    <HStack spacing={4}>
      <SearchBar />
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </HStack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NextLink href={href} passHref>
      <Container
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box cursor="pointer">
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "blue.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            {/* <Text fontSize={"sm"}>{subLabel}</Text> */}
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Container>
    </NextLink>
  );
};

const MobileNav = () => {
  const [searchInput, setSearchInput] = React.useState("");

  return (
    <Stack
      shadow="sm"
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <SearchBar />
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <NextLink key={child.label} href={child.href}>
                <Container py={2}>{child.label}</Container>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: "More",
  //   children: [
  //     //   {
  //     //     label: "Explore Design Work",
  //     //     subLabel: "Trending Design to inspire you",
  //     //     href: "#",
  //     //   },
  //     {
  //       label: "About Us",
  //       subLabel: "Know to motive of ProjectGram",
  //       href: "/about",
  //     },
  //   ],
  // },
  //   {
  //     label: "Find Work",
  //     children: [
  //       {
  //         label: "Job Board",
  //         subLabel: "Find your dream design job",
  //         href: "#",
  //       },
  //       {
  //         label: "Freelance Projects",
  //         subLabel: "An exclusive list for contract work",
  //         href: "#",
  //       },
  //     ],
  //   },
  {
    label: "About Us",
    href: "/about",
  },
  //   {
  //     label: "Hire Designers",
  //     href: "#",
  //   },
];
