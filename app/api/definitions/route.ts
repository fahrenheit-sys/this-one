import { NextResponse } from "next/server";
import { TAXONOMY } from "@/lib/taxonomy";
import { corsPreflight, withCors } from "@/lib/widget/cors";

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET() {
  return withCors(NextResponse.json(TAXONOMY));
}
