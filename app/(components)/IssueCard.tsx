import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import StatusDisplay from "./StatusDisplay";
import { Issue } from "../lib/definitions";

const IssueCard = ({ticketData, refresh}:{ticketData:Issue, refresh: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticketData.priority.S} />
        <div className="ml-auto">
          <DeleteBlock id={ticketData["issue-id"].S} refresh={refresh}/>
        </div>
      </div>
      <h4 className="pb-3">{ticketData.title.S}</h4>
      <hr className="h-px border-0 bg-page mb-s" />
      <p className="whitespace-pre-wrap pt-2">{ticketData.description.S}</p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="mr-auto flex">
          <StatusDisplay status={ticketData.status.S} />
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
