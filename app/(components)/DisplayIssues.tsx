"use client";

import { Issue } from "../lib/definitions";
import React, { useState, useEffect } from "react";
import IssueCard from "./IssueCard";

interface ProjectIssues {
  project: string;
  issues: Set<Issue>;
}

const DisplayIssues = ({ issueData, refresh}:{ issueData: Issue[], refresh: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [projectIssues, setProjectIssues] = useState<ProjectIssues[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    const fetchIssues = () => {
      const projectIssuesData: ProjectIssues[] =
        issueData?.reduce((acc: ProjectIssues[], issue: Issue) => {
          const existingProject = acc.find((p) => p.project === issue.project.S);

          if (existingProject) {
            existingProject.issues.add(issue);
          } else {
            acc.push({
              project: issue.project.S,
              issues: new Set([issue]),
            });
          }
          return acc;
        }, [] as ProjectIssues[]) || [];
      setProjectIssues(projectIssuesData);
    };

    fetchIssues();
  }, [issueData, selectedProject]);

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  const filteredOptions = selectedProject
    ? projectIssues.filter((p) => p.project === selectedProject)
    : [];

  const projectOptions = [
    ...Array.from(new Set(projectIssues.map((p) => p.project))),
  ].map((project) => (
    <option key={project} value={project}>
      {project}
    </option>
  ));
 
  console.log(issueData)

  return (
    <div className="p-5">
      <div className="flex justify-center pb-5 flex-col items-center">
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
      <div className="lg:grid grid-cols-2 xl:grid-cols-3">
        {filteredOptions.map((project, idx) => (
          <div key={idx}>
            <h2>{project.project}</h2>
            {Array.from(project.issues).map((issue) => (
              <IssueCard key={`${issue.project.S}-${issue.title.S}`} ticketData={issue} refresh={refresh}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayIssues;