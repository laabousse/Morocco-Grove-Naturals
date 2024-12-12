import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import emptyCart from "@/images/emptyCart.png";
import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="bg-white flex flex-col gap-3 items-center justify-center py-20">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ display: "inline-block" }}
      >
        <ShoppingCart size={64} className="text-gray-400 mx-auto" />
      </motion.div>
      <Image
        src={emptyCart}
        alt="empty Shopping cart"
        width={200}
        height={200}
        className="mx-auto rounded-lg shadow-md"
      />
      <h2 className="text-3xl font-bold text-gray-800">Your cart is empty</h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Looks like you haven&rsquo;t added anything to your cart yet. Explore
        our products and find something you love
      </p>
      <Link
        href="/"
        className="inline-block bg-green-600 text-white font-semibold px-4 py-4 rounded-lg transition-colors duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        start shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
