"use client";

import { useEffect } from "react";

export default function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      "%cHey there! Good job checking this project out and learning more about React 19. Happy Hacking! - Rich",
      "font-weight: bold; font-size: 14px; color: #3b82f6;"
    );

    // Suppress development-only CSS warnings
    if (process.env.NODE_ENV === "development") {
      const originalWarn = console.warn;
      console.warn = function (...args: unknown[]) {
        const message = String(args[0]);
        // Ignore known harmless development warnings
        if (
          message.includes("preloaded with link preload") ||
          message.includes("-webkit-text-size-adjust") ||
          message.includes(":host selector") ||
          message.includes("-moz-focus-inner") ||
          message.includes(":global")
        ) {
          return;
        }
        originalWarn.apply(console, args);
      };
    }
  }, []);

  return null;
}
