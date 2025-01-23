import { NextResponse } from "next/server";
import countries from "./index.json";

export async function GET() {
  try {
    return NextResponse.json(
      { data: countries, message: "Countries loaded successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Failed to load countries",
      status: 500,
      error,
    });
  }
}
