/*
These lambda functions live in AWS and are invoked when calls are made to a restAPI.
*/

import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

export const handler = async (event) => {
    const params = {
    TableName: 'issues'
    }

    try {
    const data = await client.send(new ScanCommand(params));
    return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET"
    },
    body: JSON.stringify(data.Items)
    };
    } catch (error) {
    console.error(error);
    return {
    statusCode: 500,
    body: JSON.stringify({error: 'Failed to retrieve data'})
    }
    }
};
