"use client";
import { useState, useEffect } from "react";
import { Issue } from "./lib/definitions";

const Home: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const getIssues = await fetch("/api/issues");
        const getIssueJson = await getIssues.json();
        console.log(getIssueJson);
        setIssues(getIssueJson);
      } catch (error) {
        console.error("Error fetching issue tickets", error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {issues.map((issue, k) => (
          <div key={k} className="mb-4">
            <p>Project: {issue.project}</p>
            <p>Title: {issue.title}</p>
            <p>Description: {issue.description}</p>
            <p>Priority: {issue.priority}</p>
            <p>Status: {issue.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
