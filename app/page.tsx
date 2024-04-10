"use client";
import { useState, useEffect } from "react";
import { Issue } from "./lib/definitions";
import IssuePage from "./(components)/DisplayIssues";

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
        <IssuePage issueData={issues} />
      </div>
    </div>
  );
};

export default Home;
