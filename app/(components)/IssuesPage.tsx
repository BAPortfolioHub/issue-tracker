"use client";
import { useState } from "react";
import { Issues, Project } from "../lib/definitions";
import DisplayIssues from "./DisplayIssues";
import { useDataFetching } from "../(hooks)/fetchData";

const IssuePage: React.FC = () => {
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

  const issues = useDataFetching<Issues[]>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/issues/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    [needsRefresh]
   )
  
  const projects = useDataFetching<Project[]>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    [needsRefresh]
   )

return <DisplayIssues issueData={issues} projectData={projects} refresh={setNeedsRefresh}/>;
};

export default IssuePage;
