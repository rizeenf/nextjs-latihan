import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `https://65bb679052189914b5bc0331.mockapi.io/api/users`,
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
      cache: "no-cache",
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}

export async function POST(request: NextRequest, response: NextResponse) {
  const data = await request.json();

  const resp = await fetch(
    `https://65bb679052189914b5bc0331.mockapi.io/api/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!resp.ok) {
    console.error("Error while registering, status code:", resp.status);
  }

  const respData = await resp.json();

  return NextResponse.json(
    JSON.stringify({ message: "Successfully registered." }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
