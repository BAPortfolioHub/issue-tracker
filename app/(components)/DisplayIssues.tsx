"use client";

import { Project, Issues } from "../lib/definitions";
import React, { useState, useEffect } from "react";
import IssueCard from "./IssueCard";

interface ProjectIssues {
  project: string;
  issues: Set<Issues>;
}

const DisplayIssues = ({ issueData, projectData, refresh}:
  { 
    issueData: Issues[] | null, 
    projectData: Project[] | null,
    refresh: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
  const [projects, setProjects] = useState<string[]>([])
  const [projectIssues, setProjectIssues] = useState<ProjectIssues[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    const fetchIssues = () => {
      const projectIssuesData: ProjectIssues[] =
        issueData?.reduce((acc: ProjectIssues[], issue: Issues) => {
          const existingProject = acc.find((p) => p.project === issue.project);

          if (existingProject) {
            existingProject.issues.add(issue);
          } else {
            acc.push({
              project: issue.project,
              issues: new Set([issue]),
            });
          }
          return acc;
        }, [] as ProjectIssues[]) || [];
      setProjectIssues(projectIssuesData);
    }
    fetchIssues();
  }, [issueData, selectedProject]);

  useEffect(() => {
    const fetchProjectArray = () => {
      const projectArray: string[] = projectData ? ([
        ...Array.from((projectData.map((p) => p.projectTitle))),
      ]) : [];
      
      setProjects(projectArray)
    }
    fetchProjectArray();
  },[projectData])

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  const filteredOptions = selectedProject
    ? projectIssues.filter((p) => p.project === selectedProject)
    : [];

  const projectOptions = projects.map((project) => (
    <option key={project} value={project}>
      {project}
    </option>
  ))

  return (
    <div className="p-5">
      <div className="flex justify-center pb-5 flex-colitems-center">
        <select
          className="w-50%"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <option key="default" value="" disabled>
            Select a project
          </option>
          {projectOptions}
        </select>
      </div>
      <div className="flex flex-wrap gap-4 w-full">
        {filteredOptions.map((project, idx) => (
          <div key={idx}>
            <div className="flex flex-wrap gap-4 w-full">
              {Array.from(project.issues).map((issue) => (
                <IssueCard key={issue["issue-id"]} ticketData={issue} refresh={refresh}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayIssues;