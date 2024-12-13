"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { usePathname } from "next/navigation";

const socket = io("https://spectacular-useful-smell.glitch.me/");

const ViewCount = () => {
  const [viewCount, setViewCount] = useState(0);
  const [slug, setSlug] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Extract slug from pathname
    const pathSegments = pathname.split("/");
    const productSlug = pathSegments[pathSegments.length - 1];

    // If slug changed, notify server
    if (productSlug !== slug) {
      // If we were on a previous product, notify server we're leaving
      if (slug) {
        socket.emit("leaveProduct", slug);
      }

      // Update to new slug and join new product page
      setSlug(productSlug);

      // Only emit joinProduct if we have a valid slug
      if (productSlug) {
        socket.emit("joinProduct", productSlug);
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Listen for view count updates
    socket.on("viewCountUpdate", (data: { slug: string; count: number }) => {
      if (data.slug === slug) {
        console.log("Received view count for product", slug, ":", data.count);
        setViewCount(data.count);
      }
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("viewCountUpdate");

      // Notify server we're leaving the current product if component unmounts
      if (slug) {
        socket.emit("leaveProduct", slug);
      }
    };
  }, [slug]);

  return (
    <div>
      <p className="text-base text-gray-800">
        <span className="bg-black text-white px-3 py-1 text-sm font-semibold rounded-md mr-2">
          {viewCount}
        </span>{" "}
        {viewCount === 1 ? "Person is" : "People are"} viewing this right now
      </p>
    </div>
  );
};

export default ViewCount;
