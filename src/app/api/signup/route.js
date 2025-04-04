import { NextResponse } from "next/server";
import getClient  from "../db/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const client = await getClient();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("user")

    const body = await request.json();

    const { firstname, lastname, phonenumber, email, password } = body;
 
    const  existingUser = await collection.findOne({email})

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

    const user = {
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(user);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
