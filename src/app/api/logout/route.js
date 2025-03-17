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

    const user = jwt.decode(token.value, process.env.JWT_SECRET);

    const updatedUser = await User.findOne({ email: user.email });

    updatedUser ? cookieStore.delete("token") : "not valid user";

    return NextResponse.json({ message: "done" });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
