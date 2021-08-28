import { Avatar } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" passHref>
      <Avatar
        alignSelf="center"
        cursor="pointer"
        size="md"
        name="Project Gram"
      ></Avatar>
    </Link>
  );
}

export default Logo;
