import axios from "axios";
import React from "react";
import { Project } from "types/projects";
import { BASE_URL } from "config";
import HomePage from "components/HomePage";
import { Filters } from "config/filters";
interface IHomePageProps {
  projects: Project[];
}
export default function HomeTrending({ projects }: IHomePageProps) {
  return <HomePage projects={projects} filter={Filters.trending}></HomePage>;
}

// Get Server Side Props
export async function getServerSideProps(context) {
  const res = await axios.get(`${BASE_URL}/projects?sortBy=trending`);
  const projects: Project[] = await res.data;
  return {
    props: {
      projects,
    },
  };
}
