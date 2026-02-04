import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) return Response.json([]);

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { originalText: { contains: q } },
        { translatedText: { contains: q } },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(messages);
}
