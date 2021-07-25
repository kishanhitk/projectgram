import { Button, Heading } from "@chakra-ui/react";
import { MainLayout } from "layout";
import { Header } from "layout/Header";
import { useRouter } from "next/dist/client/router";
import { AuthService } from "services/auth.services";
import Router from "next/router";
import Link from "next/link";

function SubmitProject() {
  const userToken = AuthService.getCurrentUser();
  const router = useRouter();

  if (!userToken) {
    return (
      <MainLayout>
        <Heading>Please Login</Heading>;
        <Link passHref href="/login">
          <Button>Login</Button>
        </Link>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Heading>Submit New Project</Heading>
    </MainLayout>
  );
}

export default SubmitProject;

export async function getServerSideProps(context) {
  if (typeof window !== "undefined")
    console.log(window.localStorage.getItem("token"));
  return {
    props: {}, // will be passed to the page component as props
  };
}
