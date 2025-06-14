"use client";
import { Settings } from "lucide-react";
import remarkGfm from "remark-gfm";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useParams, useRouter } from "next/navigation";
import { getChat } from "./action";
import { CodeBlock } from "@/components/MarkdownRenderer";

export default function ChatBox() {
  const id = useParams().chatId as string;
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

  const router = useRouter();
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

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-around w-screen justify-items-center h-[85vh] xl:h-[95vh] p-5">
        <div className="w-full h-full">
          <div className="flex gap-4 h-full">
            {/* Left Skeleton */}
            <div className="w-1/2 bg-transparent rounded-md shadow-sm p-4 flex flex-cols items-center justify-center ">

              <div className="relative w-full h-full  rounded-lg overflow-hidden">
                {/* Pulsing circle animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-[#555] rounded-full animate-ping opacity-75"></div>

                    <div className="absolute top-0 w-20 h-20 border-4 border-x-[#444] border-y-white rounded-full animate-spin"></div>
                  </div>
                </div>

                {/* Loading text */}
                <div className="absolute bottom-1/4 left-0 right-0 text-center">
                  <p className="text-gray-400 text-sm tracking-wider animate-pulse">
                    Let Me Think...
                  </p>
                </div>
              </div>

            </div>

            {/* Right Skeleton */}
            <div className="w-1/2 bg-[#444] rounded-lg shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-gray-200 rounded-md w-full"></div>
                  ))}
                  <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-around w-screen justify-items-center h-[93vh] xl:h-[95vh] p-5">
      <div className="w-full h-full">
        <ResizablePanelGroup direction="horizontal">
          {/* Left */}
          <ResizablePanel className="pr-5" defaultSize={50}>
            <div className="bg-[#333] w-full h-full rounded-md relative flex flex-col">
              <div className="flex-1 overflow-hidden">
                <div className=" h-full flex flex-col">
                  {/* Drawer */}
                  <Drawer>
                    <DrawerTrigger>
                      <p className="min-w-50 py-2.5  px-4 flex items-center justify-center gap-2 text-gray-300 hover:text-white bg-green-800 hover:bg-green-700 rounded-lg transition-colors duration-200 cursor-pointer">
                        Chat Settings <Settings className="w-4 h-4" />
                      </p>
                    </DrawerTrigger>


                    <DrawerContent className="max-h-[90vh] overflow-y-auto bg-[#333]">
                      <DrawerHeader>
                        <DrawerTitle className="text-center text-xl md:text-2xl text-white">
                          Saved Chat
                        </DrawerTitle>
                        {/* Container */}
                        <div className="min-h-[200px] p-4 flex items-center justify-center">
                          <div className="w-full max-w-4xl mx-auto bg-[#444] rounded-md">
                            <div className="h-24 md:h-20 flex items-center justify-center p-4">
                              <h3 className="text-sm md:text-base text-gray-300">
                                You asked
                              </h3>
                              <span className="text-2xl md:text-3xl font-bold mx-2 md:mx-4 text-white">
                                {chat.messages.length}
                              </span>
                              <h3 className="text-sm md:text-base text-gray-300">
                                Questions
                              </h3>
                            </div>

                            <div className="h-24 md:h-20 flex items-center justify-center gap-2 p-4">

                              <Button
                                variant="destructive"
                                className="text-white"
                                onClick={() => {
                                  console.log("Delete");
                                }}>
                                Delete Chat
                              </Button>

                              <Dialog>
                                <DialogTrigger asChild></DialogTrigger>
                                <DialogContent className="w-[90vw] max-w-[425px] p-4 bg-[#444]">
                                  <DialogHeader>
                                    <DialogTitle className="mb-3 text-lg md:text-xl text-white">
                                      Save This Chat
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-300">
                                      {chat.messages.length} Questions
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="my-4">
                                    <input
                                      type="text"
                                      name="chat-name"
                                      className="w-full border-2 border-[#555] bg-[#444] text-white rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                                      placeholder="Enter Chat Name"
                                      defaultValue={chat.title}
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </DrawerHeader>
                    </DrawerContent>
                  </Drawer>

                  <h1 className="text-xl font-semibold text-gray-200 px-4 my-6">{chat.title}</h1>

                  <div className="space-y-2 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full h-[calc(100vh-200px)]">
                    {chat.messages.map((message, index) => (
                      <div key={message.id} className="flex items-center">
                        <div
                          className={`p-3 w-full ${currentMessage === message.id
                            ? "bg-[#444]"
                            : "bg-[#3a3a3a]"
                            } rounded-md transition-colors cursor-pointer select-none hover:shadow-md`}
                          onClick={() => changeCurrentMessage(message.id)}>
                          <p className="text-sm text-gray-200">
                            {index + 1}. {message.question}
                          </p>

                        </div>
                        {/*  <button className="p-2 ml-2 text-gray-400 hover:text-gray-200 hover:bg-[#444] rounded-full transition-colors">
                          <EllipsisVertical className="w-5 h-5" />
                        </button> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right */}
          <ResizablePanel defaultSize={50}>
            {" "}
            <div className=" w-full h-full rounded-lg overflow-hidden pl-5">
              <div className="h-full flex flex-col  rounded-lg shadow-sm">
                <div className="mb-4 border-b border-gray-600 pb-3 pb-3 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-200">
                    {chat.messages[currentMessage - 1].question.length > 100
                      ? `${chat.messages[currentMessage - 1].question.substring(
                        0,
                        100
                      )}...`
                      : chat.messages[currentMessage - 1].question}
                  </h2>
                  <p className="h-6 min-w-6 bg-[#444] rounded-full px-2 text-sm text-gray-300 flex items-center justify-center">
                    {currentMessage}
                  </p>
                </div>
                <div className="flex-1 overflow-auto bg-[#3a3a3a] rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <div className="p-6">
                    <div className="prose prose-lg max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Use our custom component for fenced code blocks
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            const codeString = String(children).replace(/\n$/, '');

                            return match ? (
                              <CodeBlock
                                language={match[1]}
                                value={codeString}
                              />
                            ) : (
                              // For inline code, use a more subtle styling
                              <code className="bg-gray-700 text-blue-300 px-1.5 py-1 rounded-md text-sm/8" {...props}>
                                {children}
                              </code>
                            );
                          },
                          // Keep your other custom styles
                          p: ({ children }) => <p className="text-gray-300 mb-4 text-black">{children}</p>,
                          h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-200 mb-6">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-200 mb-4">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-xl font-medium text-gray-200 mb-3">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-300">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-gray-300">{children}</ol>,
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                              {children}
                            </blockquote>
                          ),
                        }}
                      >
                        {/* Example content */}
                        {chat.messages[currentMessage - 1].answer}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
