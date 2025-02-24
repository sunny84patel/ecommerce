import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: role || "user" });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
