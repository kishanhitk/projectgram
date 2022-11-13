import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Img,
  Link,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Card } from "components/Card";
import ProjectDisplayCard from "components/ProjectDisplayCard";
import ProjectDisplayCardWithButtons from "components/ProjectDisplayCardWithButton";
import UserAvatar from "components/UserAvatar";
import { BASE_URL } from "config";
import { MainLayout } from "layout";
import { session, useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import { Project, Comment } from "types/projects";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
interface IProjectPageProps {
  project: Project;
}
function ProjectPage({ project }: IProjectPageProps) {
  return (
    <MainLayout>
      <Head>
        <title>{project.title} | ProjectGram</title>
        <meta name="description" content={project.shortDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack justify="flex-start" align="flex-start" spacing={10}>
        <Img
          width="100px"
          height="100px"
          rounded={5}
          alt={project.title}
          src={project.bannerImage?.url}
        ></Img>
        <VStack align="flex-start" spacing={1}>
          <Heading>{project.title}</Heading>
          <Text>{project.shortDescription}</Text>
          <Text color="gray" fontSize="sm">
            by {project.creator.firstName}
          </Text>
        </VStack>
      </HStack>
      <ProjectDisplayCardWithButtons project={project} />
      <CommentSection project={project} />
    </MainLayout>
  );
}

export default ProjectPage;

interface ICommentSectionProps {
  project: Project;
}
const CommentSection = ({ project }: ICommentSectionProps) => {
  const [userComment, setUserComment] = React.useState("");
  const [session, loading] = useSession();
  const [comments, setComments] = React.useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `${BASE_URL}/projects/${project.slug}/comments`
    );
    setComments(res.data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = session.access_token;
    const res = await axios.post(
      `${BASE_URL}/projects/${project.slug}/comments`,
      {
        body: userComment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await fetchComments();
    setUserComment("");
    console.log(res);
  };

  React.useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card>
      {session?.user && (
        <form onSubmit={handleSubmit}>
          <VStack>
            <FormControl>
              <FormLabel>Post a review</FormLabel>
              <Textarea
                required
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              />
            </FormControl>
            <Button type="submit" alignSelf="flex-end" colorScheme="messenger">
              Submit
            </Button>
          </VStack>
        </form>
      )}
      <Heading as="h3" size="sm">
        What others say?
      </Heading>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
    </Card>
  );
};
const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <Flex alignContent="flex-start" my={7}>
      <UserAvatar user={comment.commenter} size="sm" />
      <Flex
        mx={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        flex={1}
      >
        <Flex justifyContent="space-between">
          <Text fontSize="sm" fontWeight="semibold">
            {comment.commenter.firstName}
          </Text>
          <Text fontSize="xs" color="gray">
            {moment(comment.createdAt).fromNow()}
          </Text>
        </Flex>
        <Text fontSize="sm" color="gray">
          {comment.commenter.bio}
        </Text>
        <Text fontSize="sm">{comment.body}</Text>
      </Flex>
    </Flex>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params.slug;
  const res = await axios.get(`${BASE_URL}/projects/${slug}`);
  const project: Project = await res.data;
  return {
    props: {
      project,
    },
  };
}
