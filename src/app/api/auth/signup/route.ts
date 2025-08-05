import prisma from "@/lib/db";
import { User } from "@/types/user";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const user: User = await req.json();
  try {
    if (!user.email || !user.password || !user.name)
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    const isDuplicate = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (isDuplicate)
      return Response.json({ message: "User already exists" }, { status: 400 });
    await prisma.user.create({
      data: {
        name: user.name,
        password: await bcrypt.hash(user.password, 12),
        email: user.email,
      },
    });
    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: "Could not create user" }, { status: 500 });
  }
}
