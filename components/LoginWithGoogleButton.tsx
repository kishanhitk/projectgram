import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

function LoginWithGoogleButton() {
  return (
    <Button
      mt="6"
      width="100%"
      colorScheme="red"
      leftIcon={<FaGoogle />}
      variant="solid"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Continue with Google
    </Button>
  );
}

export default LoginWithGoogleButton;
