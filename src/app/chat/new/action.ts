"use server";
import getClient from "../../lib/mongodb";
import { GoogleGenAI } from "@google/genai";

export async function askQuestion(question: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY,
  });
  if (!question || typeof question !== "string") {
    return { status: false, answer: "Question is required" };
  }
  const ai_response = await ai.models.generateContent({
    model: process.env.AI_MODEL as string,
    contents: question,
    config: { candidateCount: 2 },
  });
  const ai_asnwer = ai_response.text;
  return { status: true, answer: ai_asnwer };
}

export async function createChat(Chat: Chat) {
  const client = await getClient();
  const db = client.db("bro-code");
  const collection = db.collection("Chat");
  const response = await collection.insertOne({ Chat });
  return { status: "success", chatId: response.insertedId.toString() };
}
