
const IssueDescription = ({
    description, 
    isEditing, 
    handleChange
    } : {
    description: string, 
    isEditing: boolean,
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    }) => {
    
    return (
        <div>
            {isEditing ? (
            <textarea
                id="description"
                name="description"
                onChange={handleChange}
                required={true}
                value={description}
                rows={3}
                className="w-full"
                /> 
            ) : (
                <p className="whitespace-normal overflow-hidden text-ellipsis pt-2 max-w-md">{description}</p>
            )}
        </div>
    )
}

export default IssueDescription;