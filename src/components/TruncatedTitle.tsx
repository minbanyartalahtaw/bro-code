import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TruncatedTitleProps {
  title: string;
  className?: string;
  maxLines?: number;
}

export function TruncatedTitle({
  title,
  className = "",
  maxLines = 2,
}: TruncatedTitleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      const element = titleRef.current;
      if (element) {
        // Check if the text is truncated by comparing scrollHeight with clientHeight
        const isTextTruncated = element.scrollHeight > element.clientHeight;
        setIsTruncated(isTextTruncated);
      }
    };

    checkTruncation();
    // Re-check on window resize
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [title]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <h1
        ref={titleRef}
        className={`${className} ${
          isExpanded ? "" : `line-clamp-${maxLines}`
        } transition-all duration-800`}>
        {title}
      </h1>

      {isTruncated && (
        <button
          onClick={toggleExpanded}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer">
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More
            </>
          )}
        </button>
      )}
    </div>
  );
}
