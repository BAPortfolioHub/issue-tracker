const IssueTitle = ({
    title, 
    isEditing, 
    handleChange
    } : {
    title: string, 
    isEditing: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }) => {
    
    return (
        <div>
        {isEditing ? (
            <input
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                required={true}
                value={title}
                className="w-full"
                /> 
        ) : (

            <h4 className="pb-3">{title}</h4>
        )}
        </div>
    )
}

export default IssueTitle;