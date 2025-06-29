"use client";

import { ArrowUp, Trash2, Plus, Settings } from "lucide-react";
import {
  Drawer,
  DrawerContent,
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
import { Button } from "@/components/ui/button";
import { useAutoResizeTextarea } from "../hooks/use-auto-resize-textarea";
import { TruncatedTitle } from "./TruncatedTitle";

interface Message {
  id: number;
  question: string;
  answer: string;
}

interface ChatSidebarProps {
  chat: {
    title: string;
    messages: Message[];
  };
  currentMessage: number;
  onMessageSelect: (messageId: number) => void;
  onDeleteMessage?: (messageId: number) => void;
  onNewChat?: () => void;
  onSaveChat?: () => void;
  onDeleteChat?: () => void;
  onInputSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onTitleChange?: (title: string) => void;
  isNewChat?: boolean;
  loading?: boolean;
}

export function ChatSidebar({
  chat,
  currentMessage,
  onMessageSelect,
  onDeleteMessage,
  onNewChat,
  onSaveChat,
  onDeleteChat,
  onInputSubmit,
  onTitleChange,
  isNewChat = false,
  loading = false,
}: ChatSidebarProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea();

  return (
    <div className="bg-[#333] w-full h-full rounded-md relative flex flex-col">
      {/* Header & Settings */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <Drawer>
            <DrawerTrigger>
              <p
                className={`min-w-50 py-2.5 mb-5 px-4 flex items-center justify-center gap-2 text-gray-300 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                  isNewChat
                    ? "bg-[#444] hover:bg-[#555]"
                    : "bg-blue-800 hover:bg-blue-700"
                }`}>
                Chat Settings <Settings className="w-4 h-4" />
              </p>
            </DrawerTrigger>

            <DrawerContent className="max-h-[90vh] overflow-y-auto bg-[#333] border-0">
              <DrawerHeader>
                <DrawerTitle className="text-center text-xl md:text-2xl text-gray-200">
                  {isNewChat ? "Chat Settings" : "Saved Chat"}
                </DrawerTitle>
                <div className="min-h-[200px] p-4 flex items-center justify-center">
                  <div className="w-full max-w-4xl mx-auto bg-[#444] rounded-md">
                    <div className="h-24 md:h-20 flex items-center justify-center p-4">
                      <span className="text-2xl md:text-3xl font-bold mx-2 md:mx-4 text-gray-200">
                        {chat.messages.length}
                      </span>
                      <h3 className="text-sm md:text-base text-gray-300">
                        Questions
                      </h3>
                    </div>

                    <div className="h-24 md:h-20 flex items-center justify-center gap-2 p-4">
                      {isNewChat && onNewChat && (
                        <Button
                          variant="outline"
                          className="border-none"
                          disabled={chat.messages.length === 0}
                          onClick={onNewChat}>
                          <Plus className="mr-1 h-4 w-4" />
                          New Chat
                        </Button>
                      )}

                      {isNewChat && onSaveChat && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="border-none"
                              disabled={chat.messages.length === 0}>
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
                                onChange={(e) =>
                                  onTitleChange?.(e.target.value)
                                }
                              />
                            </div>

                            <DialogFooter className="justify-end mt-4">
                              <DialogClose asChild>
                                <Button
                                  disabled={chat.title === "" || loading}
                                  type="button"
                                  variant="outline"
                                  onClick={onSaveChat}
                                  className=" text-black">
                                  Save Chat
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}

                      {!isNewChat && onDeleteChat && (
                        <Button
                          variant="destructive"
                          className="text-white"
                          onClick={onDeleteChat}>
                          Delete Chat
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          {/* Chat Title for saved chats */}
          {!isNewChat && (
            <div className="px-4 my-6">
              <TruncatedTitle
                title={chat.title}
                className="text-xl font-semibold text-gray-200"
                maxLines={2}
              />
            </div>
          )}

          {/* Questions List */}
          {isNewChat && chat.messages.length > 0 && (
            <h4 className="text-lg font-sm mb-3 text-gray-300 px-4">
              Questions
            </h4>
          )}

          <div className="space-y-2 overflow-y-auto overflow-x-hidden h-[calc(100vh-200px)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full px-4">
            {chat.messages.length === 0 ? (
              <div className="p-3 rounded-md text-center text-gray-400 h-full flex items-center justify-center">
                Ask Your First Question
              </div>
            ) : (
              chat.messages.map((message, index) => (
                <div key={message.id} className="flex items-start">
                  {/* Delete Button - only for new chat */}
                  {isNewChat && onDeleteMessage && (
                    <div
                      className="p-2 mr-2 text-gray-400 hover:text-gray-200 hover:bg-[#444] rounded-full transition-colors flex-shrink-0 mt-1"
                      onClick={() => onDeleteMessage(message.id)}>
                      <Trash2 className="w-4 h-4 text-gray-200 cursor-pointer" />
                    </div>
                  )}

                  {/* Message Item */}
                  <div
                    className={`p-3 w-full ${
                      currentMessage === message.id
                        ? "bg-[#222]"
                        : "bg-[#3a3a3a]"
                    } rounded-md transition-colors cursor-pointer select-none hover:shadow-md`}
                    onClick={() => onMessageSelect(message.id)}>
                    <TruncatedTitle
                      title={`${index + 1}. ${message.question} `}
                      className="text-sm text-gray-300"
                      maxLines={2}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* User Input - only for new chat */}
      {isNewChat && onInputSubmit && (
        <div className="p-3 border-t border-gray-700">
          <form onSubmit={onInputSubmit} className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              name="question"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm bg-[#444] text-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-gray-500 resize-none min-h-[40px] max-h-[200px] overflow-y-auto"
              disabled={loading}
              rows={1}
              onInput={adjustHeight}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const form = e.currentTarget.form;
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
            />
            <button
              type="submit"
              className="p-2 rounded-md bg-[#555] text-gray-200 hover:bg-[#666] transition-colors disabled:opacity-50 flex-shrink-0"
              aria-label="Send message"
              disabled={loading}>
              <ArrowUp />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
