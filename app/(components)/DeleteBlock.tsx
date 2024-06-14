"use client"

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";


const DeleteBlock = ({id, refresh}:{id:string, refresh: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const router = useRouter();
  const handleClick = async () => {
    const data = {
      issueId: id
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/issues/`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      refresh(prev=>!prev);
      router.refresh();
      router.push("/");
    } else {
      console.error("Error deleting item:", res.statusText);
    }
    
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className={"text-red-500 hover:cursor-pointer hover:text-red-300"}
      onClick={() => handleClick()}
    />
  );
};

export default DeleteBlock;
