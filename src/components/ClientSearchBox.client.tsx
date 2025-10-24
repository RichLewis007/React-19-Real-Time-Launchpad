"use client";

import { useState, useTransition, useDeferredValue } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientSearchBoxProps {
  onQuery: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ClientSearchBox({ 
  onQuery, 
  placeholder = "Search products...",
  className 
}: ClientSearchBoxProps) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(text);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setText(query);
    startTransition(() => onQuery(query));
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        {isPending && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
        )}
      </div>
      {isPending && (
        <div className="mt-2 text-sm text-gray-600" aria-live="polite">
          Searching...
        </div>
      )}
    </div>
  );
}
