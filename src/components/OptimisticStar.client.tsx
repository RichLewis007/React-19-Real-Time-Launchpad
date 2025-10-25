"use client";

import { useOptimistic, useTransition } from "react";
import { Star } from "lucide-react";
import { toggleStar } from "@/actions/updateProfile";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";

interface OptimisticStarProps {
  productId: string;
  initialStarred: boolean;
  className?: string;
}

export function OptimisticStar({
  productId,
  initialStarred,
  className,
}: OptimisticStarProps) {
  const { incrementFavorites, decrementFavorites } = useCart();
  const [isPending, startTransition] = useTransition();
  const [starred, setStarred] = useOptimistic(
    initialStarred,
    (currentState: boolean, optimisticValue: boolean) => optimisticValue
  );

  const handleToggle = () => {
    const newStarred = !starred;

    // Update local count optimistically
    if (newStarred) {
      incrementFavorites();
    } else {
      decrementFavorites();
    }

    startTransition(async () => {
      // Optimistic update
      setStarred(newStarred);

      try {
        const success = await toggleStar(productId);

        if (!success) {
          // Revert on failure
          setStarred(!newStarred);
          if (newStarred) {
            decrementFavorites();
          } else {
            incrementFavorites();
          }
        }
      } catch (error) {
        console.error("Error toggling star:", error);
        // Revert on error
        setStarred(!newStarred);
        if (newStarred) {
          decrementFavorites();
        } else {
          incrementFavorites();
        }
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      aria-pressed={starred}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 transition-colors",
        "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        starred ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500",
        className
      )}
    >
      <Star
        className={cn(
          "h-5 w-5 transition-all",
          starred && "fill-current",
          isPending && "animate-pulse"
        )}
      />
    </button>
  );
}
