import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { userId } = await auth();
    console.log("id", userId);
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    const { user } = request.json ? await request.json() : { user: null };
    console.log("userrrr", user);
    if (!user?.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json(
        { error: "Email address not found" },
        { status: 400 }
      );
    }

    // Create a new user in the database
    const newUser = new User({
      clerkId: userId,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    });

    await newUser.save();
    console.log("newUsr", newUser);
    return NextResponse.json({
      message: "User stored successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error storing user:", error);
    return NextResponse.json(
      { error: "Failed to store user" },
      { status: 500 }
    );
  }
}