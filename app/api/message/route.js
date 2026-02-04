import { prisma } from "@/lib/prisma";
import { translate } from "@/lib/ai";

export async function POST(req) {
  try {
    const { text, role, conversationId, targetLang, audioPath } =
      await req.json();

    let translated = null;

    if (text && text !== "Audio message") {
      translated = await translate(text, targetLang);
    }

    const msg = await prisma.message.create({
      data: {
        role,
        originalText: text,
        translatedText: translated,
        audioPath: audioPath || null,
        conversationId,
      },
    });

    return Response.json(msg);
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
