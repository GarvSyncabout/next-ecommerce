import { NextResponse } from "next/server";
import connectToMongo from "@/app/api/db/MongodbConnnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import User from "@/app/api/models/user-schema";

export async function POST(request) {
  try {
    await connectToMongo();

    const body = await request.json();

    const { email, password } = body;

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const cookieStore = await cookies();

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

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
