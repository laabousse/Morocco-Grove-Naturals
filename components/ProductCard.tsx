import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import ProductCartBar from "./ProductCartBar";
import { LuStar } from "react-icons/lu";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden group text-sm">
      {/* Image */}
      <div className="border-b border-b-gray-300 overflow-hidden relative">
        {product?.image && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.image).url()}
              alt={product?.name || "Product Image"}
              width={500}
              height={500}
              loading="lazy"
              className={`w-full max-h-96 object-cover overflow-hidden transition-transform duration-500 ${product.stock !== 0 && "group-hover:scale-105"} `}
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
            <p className="text-white text-lg font-bold">Out of Stock</p>
          </div>
        )}
        {product?.status && product?.stock !== 0 && (
          <div className="absolute left-1 top-1 flex items-center group-hover:opacity-0 transition-opacity duration-300 bg-white/50 px-2 py-1 rounded-full">
            {product?.status?.split("").map((char, index) => (
              <span
                key={`${product._id}-status-${index}`}
                className="font-semibold uppercase"
              >
                {char}
              </span>
            ))}
          </div>
        )}
        {product?.stock !== 0 && (
          <div className="absolute bottom-0 left-0 w-full translate-y-12 group-hover:-translate-y-4 hoverEffect">
            <ProductCartBar />
          </div>
        )}
      </div>
      {/* Description */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 font-medium">{product.label}</p>
          <div className="flex items-center text-gray-500 gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const isLastStar = index === 4;
              return (
                <LuStar
                  fill={!isLastStar ? "#fca99b" : "transparent"}
                  key={`${product._id}-star-${index}`}
                  className={`${isLastStar ? "text-gray-500" : "text-lightOrange"}`}
                />
              );
            })}
          </div>
        </div>
        <p className="text-base text-gray-600 tracking-wide font-semibold line-clamp-1 capitalize">
          {product?.name}
        </p>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          label={product?.label}
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
