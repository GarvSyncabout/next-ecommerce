import { NextResponse } from "next/server";
import connectToMongo from "@/app/api/db/MongodbConnnect";
import bcrypt from "bcryptjs";

import User from "@/app/api/models/user-schema";

export async function POST(request) {
  try {
    await connectToMongo();

    const body = await request.json();

    const { firstname, lastname, phonenumber, email, password } = body;
    console.log(body);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    if (!firstname || !lastname || !email || !phonenumber || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashedPassword,
      isAdmin: false,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
