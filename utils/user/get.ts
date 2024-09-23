import { auth } from "@/lib/auth";
import prisma from "@/prisma/database";

export default async function GetUserSession() {
  const session = await auth();
  console.log(session);
  if (!session) {
    return null;
  }
  if (!session.user) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id || "",
    },
  });
  prisma.$disconnect();
  return user;
}
