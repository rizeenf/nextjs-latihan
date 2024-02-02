import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const url = new URL("https://65bb679052189914b5bc0331.mockapi.io/api/users");

  const response = await fetch(
    `https://65bb679052189914b5bc0331.mockapi.io/api/users`
  );

  const data = await response.json();

  return NextResponse.json(data);
}
