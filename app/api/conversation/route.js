import { prisma } from "@/lib/prisma";

export async function POST() {
  const convo = await prisma.conversation.create({
    data: {},
  });

  return Response.json(convo);
}
