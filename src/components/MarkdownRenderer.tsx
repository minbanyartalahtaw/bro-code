// Create a new component file, e.g., components/CodeBlock.tsx
'use client'; // This component needs interactivity (useState)

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // A nice dark theme

// You can also import other themes, like:
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    language: string;
    value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000); // Reset after 2 seconds
    };

    return (
        <div className="relative my-4 rounded-lg bg-[#282c34] font-sans">
            <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] rounded-t-lg">
                <span className="text-xs font-medium text-gray-400">{language}</span>
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs font-medium text-gray-300 transition-colors hover:text-white"
                >
                    {isCopied ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
                            Copy code
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    backgroundColor: '#282c34',
                    borderRadius: '0 0 0.5rem 0.5rem',
                }}
                codeTagProps={{
                    style: {
                        fontFamily: 'var(--font-mono)', // Use a monospace font
                        fontSize: '0.9rem',
                    },
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
};