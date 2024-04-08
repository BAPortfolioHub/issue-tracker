"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Issue } from "../lib/definitions";

const IssueForm: React.FC = () => {
  const [formData, setFormData] = useState<Issue>({
    title: "",
    project: "",
    description: "",
    priority: 1,
    status: "not started",
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
    const res = await fetch("/api/Issues", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: { "Content-Type": "application/json" },
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
        <input
          id="priority"
          name="priority"
          type="number"
          onChange={handleChange}
          required={true}
          value={formData.priority}
          max={5}
          min={1}
        />
        <label>Status</label>
        <select
          id="status"
          name="status"
          onChange={handleChange}
          required={true}
          value={formData.status}
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="in review">In Review</option>
          <option value="completed">Completed</option>
          <input type="submit" className="btn" value="Create Ticket" />
        </select>
        <input type="submit" className="btn" value="Create Issue Ticket" />
      </form>
    </div>
  );
};

export default IssueForm;
