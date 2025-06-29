"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Actions
import { getChat } from "./action";

// Reusable Components
import {
  ChatLayout,
  ChatSidebar,
  ChatContent,
  LoadingSkeleton,
} from "@/components";

export default function ChatBox() {
  const id = useParams().chatId as string;
  const router = useRouter();

  const defaultChat = {
    id: 1,
    title: "Chat Title",
    messages: [
      {
        id: 1,
        question: "What is the capital of France?",
        answer: "The capital of France is Paris.",
      },
    ],
  };

  const [chat, setChat] = useState<Chat>(defaultChat);
  const [loading, setLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(1);

  const changeCurrentMessage = (messageId: number) => {
    setCurrentMessage(messageId);
  };

  const fetch = async () => {
    const { status, Chat } = await getChat(id);
    switch (status) {
      case 200:
        setChat(Chat);
        setLoading(false);
        break;
      case 404:
        router.push("/chat/new");
        break;
    }
  };

  const handleDeleteChat = () => {
    console.log("Delete");
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onDeleteChat={handleDeleteChat}
          isNewChat={false}
        />
      }
      rightPanel={
        <ChatContent messages={chat.messages} currentMessage={currentMessage} />
      }
    />
  );
}
