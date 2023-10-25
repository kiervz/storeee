import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
    };
  } catch (error: any) {
    return null;
  }
}
