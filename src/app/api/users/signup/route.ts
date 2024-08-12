import { connectDB } from "@/utils/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
// import sendEmal from "@/utils/mailer";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check if uusername is exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "this email already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // send email verification
    // await sendEmal({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
