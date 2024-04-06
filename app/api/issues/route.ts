import { NextRequest, NextResponse } from "next/server";

interface FetchOptions {
  method: string;
  headers: {
    "Content-Type": string;
    "Access-Control-Request-Headers": string;
    "api-key": string;
  };
}

interface FetchBody {
  dataSource: string;
  database: string;
  collection: string;
}

export const GET = async (req: NextRequest) => {
  const fetchOptions: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.MONGODB_DATA_API_KEY as string,
    },
  };
  const fetchBody: FetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE as string,
    database: "issue_tracker_app",
    collection: "issues",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    const readData = await fetch(`${baseUrl}/find`, {
      ...fetchOptions,
      body: JSON.stringify({
        ...fetchBody,
      }),
    });
    const readDataJson = await readData.json();
    return NextResponse.json(readDataJson.documents, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
