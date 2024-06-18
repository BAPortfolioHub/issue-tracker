"use client"

import {useRouter} from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { generateUUID } from '@/app/utils/utils';          

const NewProjectPage = ({ params }: any) => {
    const [projectTitle, setProjectTitle] = useState<string>("");
    const [projectExists, setProjectExists] = useState<boolean>(false);
    const router = useRouter()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setProjectTitle(value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProjectExists(false);
        const data = {
            id: generateUUID(),
            projectTitle: projectTitle
        }
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/`, {
          method: "POST",
          body: JSON.stringify( data ),
          headers: { 
            "Content-Type": "application/json" ,
          }
        });
    
        if (!res.ok) {
          const errorData = await res.json();
          if (errorData.error === "Project with the same title already exists") {
            setProjectExists(true);
          } else {
            throw new Error(errorData.message || 'Failed to create new Project');
          }
        } else {  
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
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
                {projectExists && <p className="text-red-500"> Project Already Exists </p>}
                <input type="submit" className="btn" value="Create Project" />
            </form>
        </div>
    );
};

export default NewProjectPage;