"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = (): string => {
  return uuidv4();
};

interface IssueFormProps {
  project: string;
  issueId: string;
  priority: string;
  description: string;
  title: string;
  status: string;
}

const IssueForm: React.FC = () => {
  const [formData, setFormData] = useState<IssueFormProps>({
    project: "",
    issueId: uuidv4(),
    priority: "1",
    description: "",
    title: "",
    status: "Not Started"
  });

  const router = useRouter();

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
    console.log(formData)
    const res = await fetch("https://k97zsj18u2.execute-api.us-east-1.amazonaws.com/dev/issues", {
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
        <input
          id="project"
          name="project"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.project}
        />
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
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
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
