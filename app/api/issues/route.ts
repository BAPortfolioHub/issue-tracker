import { NextRequest, NextResponse } from "next/server";
import { FetchOptions } from "@/app/lib/definitions";

export const GET = async (req: NextRequest) => {
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
    },
  };

  const baseUrl = `https://k97zsj18u2.execute-api.us-east-1.amazonaws.com/dev/issues/`;

  try {
    const readData = await fetch(baseUrl, {
      ...fetchOptions,
    });
    const readDataJson = await readData.json();
    return NextResponse.json(readDataJson, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
