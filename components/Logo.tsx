import { Avatar } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" passHref>
      <Avatar cursor="pointer" size="md" mb={5} name="Project Gram"></Avatar>
    </Link>
  );
}

export default Logo;
