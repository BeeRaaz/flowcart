import { NextResponse } from "next/server";
import { DELAY, faqs } from "@/data/mock";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return NextResponse.json(faqs);
}
