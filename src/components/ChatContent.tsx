"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/MarkdownRenderer";

interface Message {
  id: number;
  question: string;
  answer: string;
}

interface ChatContentProps {
  messages: Message[];
  currentMessage: number;
}

export function ChatContent({ messages, currentMessage }: ChatContentProps) {
  if (messages.length === 0) {
    return (
      <div className="p-3 rounded-md text-center text-gray-300 h-full flex items-center justify-center">
        Ask Your First Question
      </div>
    );
  }

  const currentMessageData = messages[currentMessage - 1];

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <div className="h-full flex flex-col bg-[#333] rounded-lg shadow-sm">
        {/* Message Header */}
        <div className="mb-4 border-b border-gray-600 pb-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-200 line-clamp-2">
            {currentMessage}. {currentMessageData.question}
          </h2>
        </div>

        {/* Message Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#222] rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="p-6">
            <div className="prose prose-lg max-w-none text-gray-300 text-base/7.5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");

                    return match ? (
                      <CodeBlock language={match[1]} value={codeString} />
                    ) : (
                      <code
                        className="bg-gray-700 rounded px-1.5 py-0.5 text-sm font-mono text-blue-200"
                        {...props}>
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => (
                    <p className="text-gray-300 mb-4">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-gray-200 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-gray-200 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-medium text-gray-200 mb-3">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 text-gray-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 text-gray-300">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                      {children}
                    </blockquote>
                  ),
                }}>
                {currentMessageData.answer}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
