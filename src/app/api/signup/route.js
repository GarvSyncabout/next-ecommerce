import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log(request);
    return NextResponse.json(
      {
        message: "User registered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Database error: " + error.message },
      { status: 500 }
    );
  }
}
