import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PriorityDisplayProp {
  priority: string;
}

const PriorityDisplay: React.FC<PriorityDisplayProp> = ({ priority }) => {
  return (
    <div className="flex justify-start align-baseline">
      {priority === '1' && (
        <>
          <FontAwesomeIcon icon={faFire} className="text-green-400" />
          <span className="ml-2 mr-2">Low</span>
          <FontAwesomeIcon icon={faFire} className="text-green-400" />
        </>
      )}
      {priority === '2' && (
        <>
          <FontAwesomeIcon icon={faFire} className="text-orange-400" />
          <span className="ml-2 mr-2">Medium</span>
          <FontAwesomeIcon icon={faFire} className="text-orange-400" />
        </>
      )}
      {priority === '3' && (
        <>
          <FontAwesomeIcon icon={faFire} className="text-red-700" />
          <span className="ml-2 mr-2">High</span>
          <FontAwesomeIcon icon={faFire} className="text-red-700" />
        </>
      )}
    </div>
  );
};

export default PriorityDisplay;
