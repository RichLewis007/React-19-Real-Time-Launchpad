"use client";

import { useEffect } from "react";

export default function ConsoleGreeting() {
  useEffect(() => {
    // Detect browser
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);

    let browserName = "Browser";
    if (isFirefox) browserName = "Firefox";
    else if (isChrome) browserName = "Chrome";
    else if (isSafari) browserName = "Safari";
    else if (isEdge) browserName = "Edge";

    // ASCII Art Banner - Different for each browser
    if (isFirefox) {
      console.log(
        `%c
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🦊 Real-Time Launchpad - Welcome Firefox User! 🦊     ║
║                                                           ║
║    Built with React 19 • Next.js 16 • TypeScript          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `,
        "color: #ff7139; font-family: monospace;"
      );
    } else if (isChrome) {
      console.log(
        `%c
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║    🚀 Real-Time Launchpad - Welcome Chrome User! 🚀       ║
║                                                           ║
║    Built with React 19 • Next.js 16 • TypeScript          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `,
        "color: #3b82f6; font-family: monospace;"
      );
    } else if (isSafari) {
      console.log(
        `%c
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🦁 Real-Time Launchpad - Welcome Safari User! 🦁      ║
║                                                           ║
║    Built with React 19 • Next.js 16 • TypeScript          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `,
        "color: #000000; font-family: monospace;"
      );
    } else if (isEdge) {
      console.log(
        `%c
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     🌐 Real-Time Launchpad - Welcome Edge User! 🌐        ║
║                                                           ║
║    Built with React 19 • Next.js 16 • TypeScript          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `,
        "color: #0078d4; font-family: monospace;"
      );
    } else {
      console.log(
        `%c
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          🚀 Real-Time Launchpad 🚀                        ║
║                                                           ║
║    Built with React 19 • Next.js 16 • TypeScript          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `,
        "color: #3b82f6; font-family: monospace;"
      );
    }

    // Main Greeting
    console.log(
      "%cHey there! 👋",
      "font-weight: bold; font-size: 16px; color: #3b82f6;"
    );

    console.log(
      "%cGood job checking this project out and learning more about React 19.\nHappy Hacking! - Rich 🎉",
      "font-size: 13px; color: #6b7280;"
    );

    // Separator
    console.log(
      "%c──────────────────────────────────────────────────────────────",
      "color: #e5e7eb;"
    );

    // Browser Info
    const browserColor = isFirefox
      ? "#ff7139"
      : isChrome
        ? "#4285f4"
        : isSafari
          ? "#000000"
          : isEdge
            ? "#0078d4"
            : "#3b82f6";
    console.log(
      `%c🌐 Detected: ${browserName}`,
      `font-weight: bold; font-size: 12px; color: ${browserColor};`
    );

    console.log(
      "%c──────────────────────────────────────────────────────────────",
      "color: #e5e7eb;"
    );

    // Info Section
    console.log(
      "%c📚 Project Info:",
      "font-weight: bold; font-size: 12px; color: #10b981;"
    );
    console.log("  • React 19 with Server Components");
    console.log("  • Next.js 16 App Router");
    console.log("  • Optimistic Updates & Actions");
    console.log("  • Suspense Streaming");

    console.log(
      "%c──────────────────────────────────────────────────────────────",
      "color: #e5e7eb;"
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
