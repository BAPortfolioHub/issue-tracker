/*
These lambda functions live in AWS and are invoked when calls are made to a restAPI.
*/

// import { DynamoDBDocumentClient, PutCommand, GetCommand, 
//     UpdateCommand, DeleteCommand} from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

export const handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const params = {
    TableName: 'issues',
    Item: {
        'issue-id': { S: requestBody.issueId},
        project: {S: requestBody.project},
        title: {S: requestBody.title},
        priority: {S: requestBody.priority},
        description: {S: requestBody.description},
        status: {S: requestBody.status},
    }
    }

    try {
        const data = await client.send(new PutItemCommand(params));
        return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        body: JSON.stringify({message: 'Item added successfully'})
        };
    } catch (error) {
        console.error(error);
        return {
        statusCode: 500,
        body: JSON.stringify({error: 'Failed to add data'})
        }
    }
};