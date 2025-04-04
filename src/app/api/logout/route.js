import { NextResponse } from "next/server";
import getClient from "../db/mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";



export async function POST(request) {
  try {
    const client = await getClient();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("user")

    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    const user = jwt.decode(token.value, process.env.JWT_SECRET);

    const updatedUser = await collection.findOne({ email: user.email });

    updatedUser ? cookieStore.delete("token") : "not valid user";

    return NextResponse.json({ message: "done" });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
