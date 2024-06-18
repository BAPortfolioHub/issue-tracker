"use client"

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditBlock = ({setIsEditing}:{ setIsEditing: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <FontAwesomeIcon
      icon={faPenToSquare} 
      className={"text-blue-500 hover:cursor-pointer hover:text-blue-300"}
      onClick={() => setIsEditing(prev => !prev)}
    />
  );
};

export default EditBlock;
