import { NextResponse } from "next/server";
import connectToMongo from "@/app/api/db/MongodbConnnect";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import User from "@/app/api/models/user-schema";

export async function POST(request) {
  try {
    await connectToMongo();

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    console.log("Token from cookies:", token?.value);

    const userId = jwt.decode(token, process.env.JWT_SECRET);

    return NextResponse.json({ message: "done" });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
