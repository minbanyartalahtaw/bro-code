"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Actions
import { askQuestion, createChat } from "./action";

// Reusable Components
import {
  ChatLayout,
  ChatSidebar,
  ChatContent,
  LoadingSkeleton,
} from "@/components";

export default function Home() {
  const router = useRouter();

  // State
  const defaultChat: Chat = { title: "", messages: [] };
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(1);
  const [chat, setChat] = useState<Chat>(defaultChat);

  // Handlers
  const changeCurrentMessage = (messageId: number) =>
    setCurrentMessage(messageId);

  const newChat = () => {
    setChat(defaultChat);
  };

  const savedMessage = async () => {
    if (chat.title === "") return alert("Please Enter Chat Name");
    setLoading(true);
    const { status, chatId } = await createChat(chat);
    if (status === "success") router.replace(`/chat/${chatId}`);
  };

  const handleDeleteMessage = (messageId: number) => {
    const updatedMessages = chat.messages
      .filter((m) => m.id !== messageId)
      .map((message, index) => ({
        ...message,
        id: index + 1,
      }));
    setCurrentMessage(updatedMessages.length);
    setChat({ ...chat, messages: updatedMessages });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get("question") as string;
    if (!question) return;

    setLoading(true);
    try {
      const response = await askQuestion(question);

      const newMessage = {
        id: chat.messages[chat.messages.length - 1]?.id + 1 || 1,
        question,
        answer: response.answer as string,
      };

      const updatedChat = {
        ...chat,
        messages: [...chat.messages, newMessage],
      };

      setChat(updatedChat);
      setCurrentMessage(updatedChat.messages.length);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (title: string) => {
    setChat({ ...chat, title });
  };

  // Loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <ChatLayout
      leftPanel={
        <ChatSidebar
          chat={chat}
          currentMessage={currentMessage}
          onMessageSelect={changeCurrentMessage}
          onDeleteMessage={handleDeleteMessage}
          onNewChat={newChat}
          onSaveChat={savedMessage}
          onInputSubmit={handleSubmit}
          onTitleChange={handleTitleChange}
          isNewChat={true}
          loading={loading}
        />
      }
      rightPanel={
        <ChatContent messages={chat.messages} currentMessage={currentMessage} />
      }
    />
  );
}
