import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

export async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}
