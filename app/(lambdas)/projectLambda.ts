/*
These lambda functions live in AWS and are invoked when calls are made to a restAPI.

import { DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    // Log the received event for debugging
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

const handlePost = async (requestBody) => {
    const { id, projectTitle } = requestBody;
    const current_time = Math.floor(new Date().getTime() / 1000);

    // Calculate the expireAt time (180 days from now) in epoch second format
    const expire_at = Math.floor((new Date().getTime() + 180 * 24 * 60 * 60 * 1000) / 1000);


    // Validate required fields
    if (!id || !projectTitle ) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Missing required fields' })
        };
    }
    
    // Ensure that the project won't be added twice to the same table
    const uppercaseProjectTitle = projectTitle.toUpperCase();
    
    const checkParams = {
        TableName: 'Projects',
        IndexName: 'projectTitle-index',
        KeyConditionExpression: 'projectTitle = :title',
        ExpressionAttributeValues: {
            ':title': uppercaseProjectTitle
        }
    }

    try {
        const existingData = await ddbDocClient.send(new QueryCommand(checkParams));
        if (existingData.Items.length > 0) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ error: 'Project with the same title already exists' })
            };
        }
    } catch (error) {
        console.error('Error checking project existence:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Failed to check project existence' })
        };
    }

    const params = {
        TableName: 'Projects',
        Item: {
            id: id,
            projectTitle: uppercaseProjectTitle,
            createdAt: current_time,
            expireAt: expire_at
        }
    };

    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: 'Project added successfully' })
        };
    } catch (error) {
        console.error('Error adding item:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: 'Failed to add project' })
        };
    }
}

const handleGet = async() => {
  const params = {
    TableName: 'Projects'
  }
  
  try {
    const data = await client.send(new ScanCommand(params));
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
      body: JSON.stringify({error: 'Failed to retrieve project data'})
    }
  }
}
*/