import Container from "@/components/Container";
import DiscountBanner from "@/components/DiscountBanner";
import ProductList from "@/components/ProductList";
import { getAllCategories, getAllProducts, getSales } from "@/sanity/helpers";

export default async function Home() {
  const products = await getAllProducts();
  const sales = await getSales();
  const categories = await getAllCategories();

  return (
    <div>
      <Container>
        <DiscountBanner sales={sales} />
        <ProductList products={products} title={true} categories={categories} />
      </Container>
    </div>
  );
}
