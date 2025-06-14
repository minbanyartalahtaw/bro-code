"use server";

import getClient from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getChat(chatId: string) {
  const client = await getClient();
  const db = client.db("bro-code");
  const collection = db.collection("Chat");
  // Check if chatId is a valid MongoDB ObjectId
  if (!ObjectId.isValid(chatId)) {
    return { status: 400, message: "Invalid chat ID format" };
  }

  try {
    const chatDoc = await collection.findOne(
      { _id: new ObjectId(chatId) },
      { Chat: 1, _id: 0 }
    );
    if (!chatDoc) {
      return { status: 404, message: "Chat not found" };
    }
    const chat = JSON.parse(JSON.stringify(chatDoc));
    const { Chat } = chat;
    return { status: 200, Chat };
  } catch (error) {
    console.error("Error fetching chat:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}
