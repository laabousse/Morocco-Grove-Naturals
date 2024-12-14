"use client";
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";

interface ShareProductProps {
  product: {
    name: string;
    slug: string;
  };
}

const ShareProduct: React.FC<ShareProductProps> = ({ product }) => {
  const [copied, setCopied] = useState(false);

  // Function to get the full product URL
  const getProductUrl = () => {
    return typeof window !== "undefined"
      ? `${window.location.origin}/${product.slug}`
      : "";
  };

  // Share function using Web Share API
  const handleShare = async () => {
    const url = getProductUrl();

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to copy to clipboard if share fails
        copyToClipboard();
      }
    } else {
      // Fallback for browsers without Web Share API
      copyToClipboard();
    }
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    const url = getProductUrl();
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        // Reset copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer"
    >
      <FiShare2 className="text-lg" />
      <p>{copied ? "Link Copied!" : "Share"}</p>
    </div>
  );
};

export default ShareProduct;
