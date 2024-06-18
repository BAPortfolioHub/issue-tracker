import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriorityDisplay = ({ 
  priority, 
  isEditing,
  handleChange
  }: { 
    priority: string, 
    isEditing: boolean,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => {
  return (
    <div className="flex justify-start align-baseline">
      {isEditing ? (
        <select
          id="priority"
          name="priority"
          required={true}
          value={priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      ) : (
        <>
          {priority === 'Low' && (
            <>
              <FontAwesomeIcon icon={faFire} className="text-green-400" />
              <span className="ml-2 mr-2">Low</span>
              <FontAwesomeIcon icon={faFire} className="text-green-400" />
            </>
          )}
          {priority === 'Medium' && (
            <>
              <FontAwesomeIcon icon={faFire} className="text-orange-400" />
              <span className="ml-2 mr-2">Medium</span>
              <FontAwesomeIcon icon={faFire} className="text-orange-400" />
            </>
          )}
          {priority === 'High' && (
            <>
              <FontAwesomeIcon icon={faFire} className="text-red-700" />
              <span className="ml-2 mr-2">High</span>
              <FontAwesomeIcon icon={faFire} className="text-red-700" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PriorityDisplay;