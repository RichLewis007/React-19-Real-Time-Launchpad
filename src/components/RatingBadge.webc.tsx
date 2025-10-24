"use client";

import { useEffect, useRef } from "react";

interface RatingBadgeProps {
  rating: number;
  size?: 'small' | 'large';
  color?: 'yellow' | 'blue';
}

export default function RatingBadge({ rating, size = 'small', color = 'yellow' }: RatingBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Web Component script if not already loaded
    if (!customElements.get('rating-badge')) {
      const script = document.createElement('script');
      script.src = '/wc/rating-badge.js';
      script.type = 'module';
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (badgeRef.current && customElements.get('rating-badge')) {
      badgeRef.current.innerHTML = `
        <rating-badge 
          rating="${rating.toString()}" 
          size="${size}"
          color="${color}"
        ></rating-badge>
      `;
    }
  }, [rating, size, color]);

  return <div ref={badgeRef}></div>;
}

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'rating-badge': {
        rating?: string;
        size?: string;
        color?: string;
      };
    }
  }
}
