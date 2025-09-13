import { GoogleGenerativeAI } from "@google/generative-ai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

// Gemini client setup
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Model instance
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Call Gemini
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: messages.map((msg: any) => ({ text: msg.content })),
      },
    ],
  });

  return new Response(JSON.stringify(result.response), {
    headers: { "Content-Type": "application/json" },
  });
}
