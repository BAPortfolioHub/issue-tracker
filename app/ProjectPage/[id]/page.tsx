"use client"

import {useRouter} from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { generateUUID } from '@/app/(components)/IssueForm';

const NewProjectPage = ({ params }: any) => {
    const [projectTitle, setProjectTitle] = useState<string>("");
    const router = useRouter()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setProjectTitle(value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            id: generateUUID(),
            projectTitle: projectTitle
        }
        const res = await fetch("https://k97zsj18u2.execute-api.us-east-1.amazonaws.com/dev/projects", {
          method: "POST",
          body: JSON.stringify( data ),
          headers: { 
            "Content-Type": "application/json" ,
          }
        });
    
        if (!res.ok) {
          throw new Error("Failed to create new Project");
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
                <h3> Create a new Project</h3>
                <label>Project Name</label>
                <input
                id="project"
                name="project"
                type="text"
                onChange={handleChange}
                required={true}
                value={projectTitle}
                />
                <input type="submit" className="btn" value="Create Project" />
            </form>
        </div>
    );
};

export default NewProjectPage;