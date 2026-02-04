import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function translate(text, targetLang) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a medical translator.

Translate the following sentence into ${targetLang}.

Return ONLY the translated sentence.
Do NOT explain.
Do NOT give options.
Do NOT add extra text.

Sentence:
${text}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text().trim();
}
export async function summarizeConversation(messages) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const text = messages
    .map(m => `${m.role}: ${m.originalText}`)
    .join("\n");

  const prompt = `
Summarize this doctor-patient conversation.
Highlight:
- Symptoms
- Possible diagnosis
- Medications
- Follow-up actions

Conversation:
${text}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
