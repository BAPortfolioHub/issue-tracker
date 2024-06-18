"use client"

import { Issues } from "../lib/definitions";
import React, {useState} from 'react';
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import StatusDisplay from "./StatusDisplay";
import EditBlock from "./EditBlock";
import IssueTitle from "./IssueTitle";
import IssueDescription from "./IssueDescription";

const IssueCard = (
  {
    ticketData, 
    refresh}:
  {
    ticketData:Issues, 
    refresh: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<Issues>(ticketData);

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const value = event.target.value;
      const name= event.target.name;
      setUpdateData((prev) => ({
        ...prev,
        [name]: value,
      }))
    };

    const handleUpdate = async () => {
      if (updateData === ticketData) {
        setIsEditing(false);
      } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/issues/`, {
        method: "PUT",
        body: JSON.stringify( updateData ),
        headers: { 
          "Content-Type": "application/json" ,
        }
      });
        if (!res.ok) {
          throw new Error("Failed to update Issue Ticket");
        }
      refresh(prev => !prev);
      setIsEditing(false)
      }
    };

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2 min-w-full sm:min-w-[300px] lg:min-w-[470px] max-w-sm">
      <div className="flex mb-3">
        <PriorityDisplay priority={updateData.priority} isEditing={isEditing} handleChange={handleChange}/>
        {!isEditing && <div className="ml-auto flex items-center">
          <div className="pr-2">
            <EditBlock setIsEditing={setIsEditing} />
          </div>
          <DeleteBlock id={ticketData["issue-id"]} refresh={refresh}/>
        </div> }
      </div>
      <IssueTitle title={updateData.title} isEditing={isEditing} handleChange={handleChange}/>
      <hr className="h-px border-0 bg-page mb-s" />
      <div className="flex-grow">
        <IssueDescription description={updateData.description} isEditing={isEditing} handleChange={handleChange} />
      </div>
      <div className="flex mt-2">
        <div className="mr-auto flex">
          <StatusDisplay status={updateData.status} isEditing={isEditing} handleChange={handleChange} />
        </div>
        {isEditing && 
          <div className="ml-auto flex items-center">
            <button onClick={handleUpdate} className="btn">Save</button>
          </div>
          }
      </div>
    </div>
  );
};

export default IssueCard;