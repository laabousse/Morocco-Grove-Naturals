import { Category, Product } from "@/sanity.types";
import Categories from "./Categories";
import ProductGrid from "./ProductGrid";

interface Props {
  products: Product[];
  title?: boolean;
  categories: Category[];
}

const ProductList = ({ products, title, categories }: Props) => {
  return (
    <div className="pb-10">
      {/* Categories */}
      <Categories categories={categories} />
      {/* Products */}
      {title && (
        <div className="pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">
            Day of the <span className="text-light-green">Deal</span>
          </h2>
          <p className="text-sm text-gray-500 font-thin">
            Don&apos;t miss out on our deals!
          </p>
        </div>
      )}
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductList;
