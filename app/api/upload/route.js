import fs from "fs";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("audio");

  if (!file) {
    return Response.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const dir = path.join(process.cwd(), "public/audio");
  fs.mkdirSync(dir, { recursive: true });

  const fileName = `${Date.now()}.webm`;
  const filePath = path.join(dir, fileName);

  fs.writeFileSync(filePath, buffer);

  return Response.json({ path: `/audio/${fileName}` });
}
