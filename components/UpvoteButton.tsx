import { Button, toast, useToast } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "config";
import { useSession } from "next-auth/client";
import React, { useEffect } from "react";
import { Project } from "types/projects";
interface IUpvoteButtonProps {
  project: Project;
}
function UpvoteButton({ project }: IUpvoteButtonProps) {
  const toast = useToast();
  const [upvoteButtonLoading, setUpvoteButtonLoading] = React.useState(false);
  const [upvoted, setUpvoted] = React.useState(true);
  const [session, loading] = useSession();

  const checkIfUpvoted = async () => {
    console.log(document.cookie);

    setUpvoteButtonLoading(true);
    const token = JSON.parse(window.localStorage.getItem("token"));
    let res;
    try {
      res = await axios.get(`${BASE_URL}/projects/${project.slug}/upvote`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    if (res?.data) {
      setUpvoted(true);
    } else {
      setUpvoted(false);
    }
    setUpvoteButtonLoading(false);
  };
  const upvoteProject = async () => {
    setUpvoteButtonLoading(true);
    const token = JSON.parse(window.localStorage.getItem("token"));
    console.log(token);
    try {
      const res = await axios.put(
        `${BASE_URL}/projects/${project.slug}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setUpvoted(true);
      toast({
        title: "Upvoted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
    setUpvoteButtonLoading(false);
  };
  const deleteUpvote = async () => {
    setUpvoteButtonLoading(true);
    const token = JSON.parse(window.localStorage.getItem("token"));
    console.log(token);
    try {
      const res = await axios.delete(
        `${BASE_URL}/projects/${project.slug}/upvote`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setUpvoted(false);
      toast({
        title: "Removed Upvote!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
    setUpvoteButtonLoading(false);
  };

  useEffect(() => {
    checkIfUpvoted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {upvoted ? (
        <Button
          variant="outline"
          colorScheme="red"
          onClick={deleteUpvote}
          isLoading={upvoteButtonLoading}
        >
          Downvote
        </Button>
      ) : (
        <Button
          variant="solid"
          colorScheme="green"
          onClick={upvoteProject}
          isLoading={upvoteButtonLoading}
        >
          Upvote
        </Button>
      )}
    </>
  );
}

export default UpvoteButton;
