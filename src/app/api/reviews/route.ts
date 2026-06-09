import { NextResponse } from "next/server";
import { DELAY, reviews } from "@/data/mock";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return NextResponse.json(reviews);
}
