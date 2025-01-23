import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      { data: null, message: "Hi there!" },
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
