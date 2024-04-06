"use client";
import { useState, useEffect } from "react";

interface Issue {
  _id: {
    oid: string;
  };
  postedAt: number;
  body: string;
  likes: any[];
  user: {
    id: string;
    name: string;
    nickname: string;
    picture: string;
  };
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const getIssues = await fetch("/api/issues");
        const getIssueJson = await getIssues.json();
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
        {issues.map((issue) => (
          <div key={issue._id.oid} className="mb-4">
            <p>Posted at: {issue.postedAt}</p>
            <p>Body: {issue.body}</p>
            <p>Likes: {issue.likes}</p>
            <p>User: {issue.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
