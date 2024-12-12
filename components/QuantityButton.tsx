import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { HiMinus, HiPlus } from "react-icons/hi2";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}
const QuantityButton = ({ product, className }: Props) => {
  const { removeItem, addItem, getItemCount } = userCartStore();
  const handleRemoveProduct = () => {
    removeItem(product._id);
    if (itemCount > 1) {
      toast.success("Quantity decreased successfully!");
    } else {
      toast.success(
        `${product?.name?.substring(0, 12)}... removed successfully!`
      );
    }
  };
  const handleAddProduct = () => {
    addItem(product);
    toast.success("Quantity increased successfully!");
  };
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product?.stock === 0;
  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleRemoveProduct}
      >
        <HiMinus />
      </Button>
      <span className="text-semibold w-8 text-center text-darkGreen">
        {itemCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleAddProduct}
        disabled={isOutOfStock}
      >
        <HiPlus />
      </Button>
    </div>
  );
};

export default QuantityButton;
