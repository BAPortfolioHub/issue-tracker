"use client";
import { useState, useEffect } from "react";
import { Issues, Project } from "../lib/definitions";
import DisplayIssues from "./DisplayIssues";

const IssuePage: React.FC = () => {
  const [issues, setIssues] = useState<Issues[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const getIssues = await fetch("https://k97zsj18u2.execute-api.us-east-1.amazonaws.com/dev/issues/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
        const getIssueJson: Issues[] = await getIssues.json();
        setIssues(getIssueJson);
      } catch (error) {
        console.error("Error fetching issue tickets", error);
      }
    };
    fetchIssues();
  }, [needsRefresh]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const getProjects = await fetch("https://k97zsj18u2.execute-api.us-east-1.amazonaws.com/dev/projects/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
        const getProjectsJson: Project[] = await getProjects.json();
        setProjects(getProjectsJson);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, [needsRefresh]);

return <DisplayIssues issueData={issues} projectData={projects} refresh={setNeedsRefresh}/>;
};

export default IssuePage;
