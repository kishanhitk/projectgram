import { Button, Heading, HStack, Spacer, Stack } from "@chakra-ui/react";
import axios from "axios";
import { MainLayout } from "layout/MainLayout";
import Head from "next/head";
import React from "react";
import { Project } from "types/projects";
import { BASE_URL } from "config";
import ProjectDisplayCard from "components/ProjectDisplayCard";
import HomePage from "components/HomePage";
import { Filters } from "config/filters";
interface IHomePageProps {
  projects: Project[];
}
export default function HomeLatest({ projects }: IHomePageProps) {
  return <HomePage projects={projects} filter={Filters.latest}></HomePage>;
}

// Get Server Side Props
export async function getServerSideProps(context) {
  const res = await axios.get(`${BASE_URL}/projects/?sortBy=new`);
  const projects: Project[] = await res.data;
  return {
    props: {
      projects,
    },
  };
}
