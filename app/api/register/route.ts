import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: "Invalid email format" });
    }

    const res = await prisma.user.findUnique({
      where: { email: email },
    });

    const password = formData.password;
    const passwordRegex = /^(?!.*\s).{6,26}$/;

    if (!passwordRegex.test(password)) {
      return Response.json({
        success: false,
        error: "Invalid password format",
      });
    }
    console.log("email ve res", email, res);
    if (res) {
      return Response.json({ success: false, error: "User already exists" });
    }

    if (!formData) {
      throw new Error("Invalid form data");
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
        role: "USER",
      },
    });
    return Response.json({ success: true, newUser });
  } catch (error) {
    console.error("Veritabanına yazma hatası:", error);
    return Response.json({ success: true, error });
  }
}
