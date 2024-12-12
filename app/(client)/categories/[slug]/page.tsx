import Container from "@/components/Container";
import ProductList from "@/components/ProductList";
import { getAllCategories, getProductsByCategory } from "@/sanity/helpers";

interface Props {
  params: Promise<{ slug: string }>;
}
const CategoriesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const categories = await getAllCategories();
  const products = await getProductsByCategory(slug);
  return (
    <div className="min-h-[calc(100vh-148px)] flex flex-col items-center bg-gray-100">
      <Container className="p-8 bg-white rounded-lg shadow-md mt-3 w-full">
        <h1 className="text-2xl md:text-3xl font-bold">
          Results for{" "}
          <span className="text-darkGreen">
            {slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
          </span>
          collection
        </h1>
        <ProductList products={products} categories={categories} />
      </Container>
    </div>
  );
};

export default CategoriesPage;
