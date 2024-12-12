"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import QuantityButton from "./QuantityButton";
import PriceFormatter from "./PriceFormatter";
import { useEffect, useState } from "react";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { addItem, getItemCount } = userCartStore();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product?.name?.substring(0, 12)}... added successfully!`);
  };
  return (
    <div>
      {itemCount ? (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButton product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span>Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "bg-darkGreen/10 text-black border-darkGreen border py-2 mt-2 w-full rounded-md font-medium hover:bg-darkGreen hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkGreen/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkGreen/10",
            className
          )}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
