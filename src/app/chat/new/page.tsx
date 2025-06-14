"use client";

import { useState } from "react";
import { ArrowUp, Trash2, Plus, Settings } from "lucide-react";
import remarkGfm from "remark-gfm";


import ReactMarkdown from "react-markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Actions
import { askQuestion, createChat } from "./action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CodeBlock } from "@/components/MarkdownRenderer";

export default function Home() {
  const router = useRouter();

  // State
  const defaultChat: Chat = { title: "", messages: [] };
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(1);
  const [chat, setChat] = useState<Chat>(defaultChat);

  // Handlers
  const changeCurrentMessage = (messageId: number) => setCurrentMessage(messageId);

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
      const response = await askQuestion(question)

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

  // Loading state
  if (loading) {
    return (
      <div className="flex w-screen h-[85vh] xl:h-[95vh] p-5">
        <div className="w-full h-full">
          <div className="flex gap-4 h-full">
            {/* Left Skeleton */}
            <div className="w-1/2 bg-transparent rounded-md shadow-sm p-4 flex items-center justify-center">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-[#555] rounded-full animate-ping opacity-75"></div>
                    <div className="absolute top-0 w-20 h-20 border-4 border-x-[#444] border-y-white rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="absolute bottom-1/4 left-0 right-0 text-center">
                  <p className="text-gray-400 text-sm tracking-wider animate-pulse">Let Me Think...</p>
                </div>
              </div>
            </div>

            {/* Right Skeleton */}
            <div className="w-1/2 bg-[#444] rounded-lg shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded-md w-full"></div>
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
    <div className="flex w-screen h-[93vh] xl:h-[95vh] p-5">
      <div className="w-full h-full">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Chat History */}
          <ResizablePanel className="pr-5" defaultSize={50}>
            <div className="bg-[#333] w-full h-full rounded-md relative flex flex-col">
              {/* Header & Settings */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                  <Drawer>
                    <DrawerTrigger>
                      <p className="min-w-50 py-2.5 mb-5 px-4 flex items-center justify-center gap-2 text-gray-300 hover:text-white bg-[#444] hover:bg-[#555] rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md">
                        Chat Settings <Settings className="w-4 h-4" />
                      </p>
                    </DrawerTrigger>

                    <DrawerContent className="max-h-[90vh] overflow-y-auto bg-[#333] border-0">
                      <DrawerHeader>
                        <DrawerTitle className="text-center text-xl md:text-2xl text-gray-200">
                          Chat Settings
                        </DrawerTitle>
                        <div className="min-h-[200px] p-4 flex items-center justify-center">
                          <div className="w-full max-w-4xl mx-auto bg-[#444] rounded-md">
                            <div className="h-24 md:h-20 flex items-center justify-center p-4">
                              <h3 className="text-sm md:text-base text-gray-300">You asked</h3>
                              <span className="text-2xl md:text-3xl font-bold mx-2 md:mx-4 text-gray-200">
                                {chat.messages.length}
                              </span>
                              <h3 className="text-sm md:text-base text-gray-300">Questions</h3>
                            </div>

                            <div className="h-24 md:h-20 flex items-center justify-center gap-2 p-4">
                              <Button
                                variant="outline"
                                className="border-none"
                                disabled={chat.messages.length === 0}
                                onClick={newChat}
                              >
                                <Plus className="mr-1 h-4 w-4" />
                                New Chat
                              </Button>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="border-none"
                                    disabled={chat.messages.length === 0}
                                  >
                                    Save Chat
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[90vw] max-w-[425px] p-4 bg-[#333]">
                                  <DialogHeader>
                                    <DialogTitle className="mb-3 text-lg md:text-xl text-gray-200">
                                      Save This Chat
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                      {chat.messages.length} Questions
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="my-4">
                                    <input
                                      type="text"
                                      name="chat-name"
                                      className="w-full bg-[#444] border-2 border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:border-gray-400 text-gray-200"
                                      placeholder="Enter Chat Name"
                                      defaultValue={chat.title}
                                      onChange={(e) => setChat({ ...chat, title: e.target.value })}
                                    />
                                  </div>

                                  <DialogFooter className="justify-end mt-4">
                                    <DialogClose asChild>
                                      <Button
                                        disabled={chat.title === ""}
                                        type="button"
                                        variant="outline"
                                        onClick={savedMessage}
                                        className="text-gray-300 text-black"
                                      >
                                        Save Chat
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </DrawerHeader>
                      <DrawerFooter className="mt-4">
                        <DrawerClose asChild>
                          <Button variant="outline" className="max-w-100 mx-auto">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>

                  {/* Questions List */}
                  {chat.messages.length > 0 && (
                    <h4 className="text-lg font-sm mb-3 text-gray-300">Questions</h4>
                  )}

                  <div className="space-y-2 overflow-y-auto overflow-x-hidden h-[calc(100vh-200px)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {chat.messages.length === 0 ? (
                      <div className="p-3 rounded-md text-center text-gray-400 h-full flex items-center justify-center">
                        Ask Your First Question
                      </div>
                    ) : (
                      chat.messages.map((message, index) => (
                        <div key={message.id} className="flex items-center">
                          {/* Delete Button */}
                          <div
                            className="p-2 mr-2 text-gray-400 hover:text-gray-200 hover:bg-[#444] rounded-full transition-colors"
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <Trash2 className="w-4 h-4 text-gray-200 cursor-pointer" />
                          </div>

                          {/* Message Item */}
                          <div
                            className={`p-3 w-full ${currentMessage === message.id ? "bg-[#444]" : "bg-[#3a3a3a]"} rounded-md transition-colors cursor-pointer select-none hover:shadow-md`}
                            onClick={() => changeCurrentMessage(message.id)}
                          >
                            <h3 className="text-sm text-gray-300">
                              {index + 1}. {message.question}
                            </h3>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* User Input */}
              <div className="p-3 border-t border-gray-700">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    name="question"
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm bg-[#444] text-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-md bg-[#555] text-gray-200 hover:bg-[#666] transition-colors"
                    aria-label="Send message"
                  >
                    <ArrowUp />
                  </button>
                </form>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Message Content */}
          <ResizablePanel className="pl-5" defaultSize={50}>
            <div className="w-full h-full rounded-lg overflow-hidden">
              {chat.messages.length === 0 ? (
                <div className="p-3 rounded-md text-center text-gray-300 h-full flex items-center justify-center">
                  Ask Your First Question
                </div>
              ) : (
                <div className="h-full flex flex-col bg-[#333] rounded-lg shadow-sm">
                  {/* Message Header */}
                  <div className="mb-4 border-b border-gray-600 pb-3 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-200">
                      {chat.messages[currentMessage - 1].question.length > 100
                        ? `${chat.messages[currentMessage - 1].question.substring(0, 100)}...`
                        : chat.messages[currentMessage - 1].question}
                    </h2>
                    <p className="h-6 min-w-6 bg-[#444] rounded-full px-2 text-sm text-gray-300 flex items-center justify-center">
                      {currentMessage}
                    </p>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#3a3a3a] rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div className="p-6">
                      <div className="prose prose-lg max-w-none text-gray-300 ">
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
                                <code className="bg-gray-700 text-blue-300 px-1.5 py-1 rounded-md" {...props}>
                                  {children}
                                </code>
                              );
                            },
                            // Keep your other custom styles
                            p: ({ children }) => <p className="text-gray-300 mb-4">{children}</p>,
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
              )}
            </div>

          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div >
  );
}
