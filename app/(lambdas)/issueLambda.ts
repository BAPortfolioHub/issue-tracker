/*
These lambda functions live in AWS and are invoked when calls are made to a restAPI.
import { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    // Log the incoming event for debugging
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    const method = event.httpMethod;
    
    try {
        let response;

        switch (method) {
            case 'GET':
                response = await handleGet(event);
                break;
            case 'POST':
                response = await handlePost(JSON.parse(event.body));
                break;
            case 'DELETE':
                response = await handleDelete(JSON.parse(event.body));
                break;
            case 'PUT':
                response = await handleUpdate(JSON.parse(event.body));
                break;
            default:
                response = {
                    statusCode: 405,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({ message: `Unsupported method: ${method}` }),
                };
                break;
        }
        return response;

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

const handleDelete = async (requestBody) => {
  const params = {
    TableName: 'issues',
    Key: {'issue-id': requestBody.issueId}
  };
  
  try {
    const {} = await ddbDocClient.send(new DeleteCommand(params));
    return {
      statusCode: 200,
      headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,DELETE"
        },
      body: JSON.stringify({'message': "Issue deleted successfully!"})
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Failed to delete issue'})
    };
  }
};

const handlePost = async (requestBody) => {
    // Parse the JSON-encoded string in the 'body' property
    const { issueId, project, title, priority, description, status } = requestBody;
    console.log(issueId, project, title, priority, description, status);

    // Validate required fields
    if (!issueId || !project || !title || !priority || !description || !status) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Missing required fields in formData' })
        };
    }

    const params = {
        TableName: 'issues',
        Item: {
            'issue-id': issueId,
            project: project || "Project not provided",
            title: title || "Title not provided",
            priority: priority || "1",
            description: description || "No description provided",
            status: status || "Not started"
        }
    };

    try {
        const {} = await ddbDocClient.send(new PutCommand(params));
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Methods": "POST, PUT, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: 'Item added successfully' })
        };
    } catch (error) {
        console.error('Error adding item:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Methods": "POST, PUT, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Failed to add data' })
        };
    }
};


const handleGet = async() => {
  const params = {
    TableName: 'issues'
  };
  
  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    return {
      statusCode: 200,
      headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET"
        },
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Failed to retrieve issue data'})
    };
  }
};
  
  const handleUpdate = async (requestBody) => {
    const { 'issue-id': issueId, project, title, priority, description, status } = requestBody;

    // Log the received request body for debugging
    console.log('Received requestBody:', requestBody);

    if (!issueId || !project || !title || !priority || !description || !status) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Missing required fields in formData' })
        };
    }
     
    const params = {
        TableName: 'issues',
        Key: { 'issue-id': issueId },
        UpdateExpression: 'set #proj = :project, #title = :title, #prio = :priority, #desc = :description, #status = :status',
        ExpressionAttributeNames: {
            '#proj': 'project',
            '#title': 'title',
            '#prio': 'priority',
            '#desc': 'description',
            '#status': 'status'
        },
        ExpressionAttributeValues: {
            ':project': project,
            ':title': title,
            ':priority': priority,
            ':description': description,
            ':status': status,
        },
        ReturnValues: 'UPDATED_NEW'
    };
    
    try {
        const data = await ddbDocClient.send(new UpdateCommand(params));
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Methods": "PUT, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: 'Issue updated successfully', updatedAttributes: data.Attributes })
        };
    } catch (error) {
        console.error('Error updating item:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Methods": "PUT, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Failed to update issue' })
        };
    }
 };
  
*/