"use client";
import { useState, useEffect } from "react";
import { Issue } from "../lib/definitions";
import DisplayIssues from "./DisplayIssues";

const IssuePage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const getIssues = await fetch("https://k97zsj18u2.execute-api.us-east-1.amazonaws.com/dev/issues/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
        const getIssueJson: Issue[] = await getIssues.json();
        setIssues(getIssueJson);
      } catch (error) {
        console.error("Error fetching issue tickets", error);
      }
    };
    fetchIssues();
  }, [needsRefresh]);

return <DisplayIssues issueData={issues} refresh={setNeedsRefresh}/>;

};

export default IssuePage;
