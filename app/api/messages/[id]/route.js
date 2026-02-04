export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  const messages = await prisma.message.findMany({
    where: { conversationId: params.id },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(messages);
}
