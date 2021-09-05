import { Avatar, Box, Container } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
function Logo() {
  return (
    <Box cursor="pointer">
      <Link href="/" passHref>
        <Image
          quality={100}
          priority={true}
          src="/assets/pg_logo.png"
          alt="Logo - ProjectGram"
          height="50px"
          width="50px"
        ></Image>
      </Link>
    </Box>
  );
}

export default Logo;
