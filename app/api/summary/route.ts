export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";
import { summarizeConversation } from "@/lib/ai";

export async function POST(req: Request) {
  const { conversationId } = await req.json();

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  const summary = await summarizeConversation(messages);

  return Response.json({ summary });
}
