import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteBlock = () => {
  return (
    <FontAwesomeIcon
      icon={faX}
      className={"text-red-500 hover:cursor-pointer hover:text-red-300"}
    />
  );
};

export default DeleteBlock;
