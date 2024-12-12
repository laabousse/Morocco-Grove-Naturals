"use client";
import userCartStore from "@/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartIcon = () => {
  const [isClient, setIsClient] = useState(false);
  const groupedItems = userCartStore((state) => state.getGroupedItems());
  const getTotalItemsCount = () => {
    return groupedItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Link
      href={"/cart"}
      className="flex items-center text-xsmd:text-sm gap-1 md:gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
    >
      <ShoppingCart className="text-darkGreen md:w-6 md:h-6 w-5 h-5 " />
      <div className="flex flex-col">
        <p className="text-xs">
          <span className="font-semibold">{getTotalItemsCount()}</span> items
        </p>
        <p className="font-semibold">Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;
