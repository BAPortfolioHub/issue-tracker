"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { generateUUID } from "../utils/utils";
import { Project } from "../lib/definitions";
import { useDataFetching } from "../(hooks)/fetchData";

interface IssueFormProps {
  project: string;
  issueId: string;
  priority: string;
  description: string;
  title: string;
  status: string;
}

const IssueForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const issueID = pathName?.split('/').pop();


  const [formData, setFormData] = useState<IssueFormProps>({
    project: searchParams.get('project') || "",
    issueId: issueID === "/IssuePage/new" ? issueID : generateUUID(),
    priority: searchParams.get('priority') || "1",
    description: searchParams.get('description') || "",
    title: searchParams.get('title') || "",
    status: searchParams.get('status') || "Not Started"
  })

  

  const projects = useDataFetching<Project[]>(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    []
   )

  const projectOptions = projects ? ( 
    projects.map((project, key) => (
      <option key={key} value={project.projectTitle}>{project.projectTitle}</option>
    ))) : []

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/issues/`, {
      method: "POST",
      body: JSON.stringify( formData ),
      headers: { 
        "Content-Type": "application/json" ,
      }
    });

    if (!res.ok) {
      throw new Error("Failed to create new Issue Ticket");
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3> Create your Issue Ticket</h3>
        <label>Project</label>
        <select
          id="project"
          name="project"
          onChange={handleChange}
          required={true}
          value={formData.project}
        >
          <option key="default" value = "" disabled>
            Select a project
          </option>
          {projectOptions}
        </select>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />
        <label>Priority</label>
        <select 
          id="priority"
          name="priority"
          onChange={handleChange}
          required={true}
          value={formData.priority}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Status</label>
        <select
          id="status"
          name="status"
          onChange={handleChange}
          required={true}
          value={formData.status}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="In Review">In Review</option>
          <option value="Completed">Completed</option>
        </select>
        <input type="submit" className="btn" value="Create Issue Ticket" />
      </form>
    </div>
  );
};

export default IssueForm;
