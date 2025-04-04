import { NextResponse } from "next/server";
import getClient from "../db/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(request) {
  try {
    
    const client = await getClient();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("user")

    const body = await request.json();

    const { email, password } = body;

    const user = await collection.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const cookieStore = await cookies();

        const token = jwt.sign(
          { email: user.email, isAdmin: user.isAdmin, username: user.lastname },
          process.env.JWT_SECRET
        );

        cookieStore.set("token", token);

        return NextResponse.json(
          { message: "Logged in successfully" },
          { status: 200 },
          { token: token }
        );
      } else {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
