import {
  Box,
  Button,
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
import { BASE_URL } from "config";
import { MainLayout } from "layout";
import { session, useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import { Project, Comment } from "types/projects";

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
          fit="fill"
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
    console.log(res);
  };

  React.useEffect(() => {
    fetchComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel>Post a review</FormLabel>
            <Textarea
              type="text"
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
      <Heading as="h3" size="md">
        Comments
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
    <Card>
      <VStack spacing={2}>
        <Text>{comment.body}</Text>
        <Text>{comment.commenter.firstName}</Text>
      </VStack>
    </Card>
  );
};
export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const res = await axios.get(`${BASE_URL}/projects/${slug}`);
  const project: Project = await res.data;
  return {
    props: {
      project,
    },
  };
}
