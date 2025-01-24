import { NextResponse } from "next/server";
import countries from "@/data/index.json";

export async function GET() {
  try {
    return NextResponse.json(
      {
        data: countries?.sort((a, b) =>
          (a?.name || "")?.localeCompare(b?.name || "", undefined, {
            sensitivity: "base",
          })
        ),
        message: "Countries loaded successfully",
      },
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
