"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
  loading?: "lazy" | "eager";
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/placeholder-product.svg",
  loading = "lazy",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      loading={loading}
    />
  );
}
