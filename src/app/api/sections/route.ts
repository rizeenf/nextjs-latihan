import { NextResponse } from "next/server";
import { SECTION } from "../../../config/SECTION";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const filteredSections = SECTION.filter((query) =>
    query.title.toLowerCase().includes((q || "").toLowerCase())
  );

  return NextResponse.json(filteredSections);
}
