import { Button } from "@chakra-ui/button";
import { VStack, Text } from "@chakra-ui/layout";
import axios from "axios";
import ProjectDisplayCard from "components/ProjectDisplayCard";
import { BASE_URL } from "config";
import { MainLayout } from "layout";
import { Project } from "types/projects";
import Link from "next/link";
interface ISearchResultPageProps {
  projects: Project[];
}

function SearchResultPage({ projects }: ISearchResultPageProps) {
  return (
    <MainLayout>
      <VStack>
        {projects.length > 0 ? (
          projects.map((project, index) => {
            return <ProjectDisplayCard project={project} key={index} />;
          })
        ) : (
          <>
            <Text textAlign="center">
              We couldn&#39;t find any projects that match your search.
              <br /> Have a look at popular projects instead.
            </Text>
            <Link href="/" passHref>
              <Button variant="solid" colorScheme="messenger">
                Popular Projects
              </Button>
            </Link>
          </>
        )}
      </VStack>
    </MainLayout>
  );
}

export default SearchResultPage;

export async function getServerSideProps(context) {
  const q = context.query.q;
  const res = await axios.get(`${BASE_URL}/projects/search?q=${q}`);
  const projects: Project[] = await res.data;
  return {
    props: {
      projects,
    },
  };
}
