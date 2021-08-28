import { Box } from "@chakra-ui/react";
import ResponsiveNavbar from "components/ResponsiveNavbar";
import React, { ReactNode } from "react";
import { Header } from "./Header";

type MainLayoutProps = {
  children: ReactNode;
};
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box>
      {/* <Header /> */}
      <ResponsiveNavbar />
      <Box w="650px" maxW="90%" m="0 auto" mb={20}>
        {children}
      </Box>
    </Box>
  );
};
