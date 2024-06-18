
const StatusDisplay= (
  { 
    status,
    isEditing,
    handleChange
  } : 
  {
    status: string,
    isEditing: boolean,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => {
  return (
    <div>
    {isEditing ? (
      <select
      id="status"
      name="status"
      onChange={handleChange}
      required={true}
      value={status}
    >
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In Progress</option>
      <option value="In Review">In Review</option>
      <option value="Completed">Completed</option>
    </select>
    ) : (
      <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 bg-green-200">
        {status}
      </span>
    )}
  </div>
  );
};

export default StatusDisplay;
