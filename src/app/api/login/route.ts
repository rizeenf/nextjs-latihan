import { TAuthLoginSchema } from "@/utils/usersSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data: TAuthLoginSchema = await req.json();
  const { email, password } = data;

  const url = new URL(
    `https://65bb679052189914b5bc0331.mockapi.io/api/auth?email=${email}&password=${password}`
  );

  const response = await fetch(url, {
    method: "GET",
  });

  const resData = await response.json();

  return NextResponse.json(resData);
}
