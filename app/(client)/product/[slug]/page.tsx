import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import PriceView from "@/components/PriceView";
import { getProductBySlug } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { LuStar } from "react-icons/lu";
import ViewCount from "@/components/ViewCount";
import AskQuestionModal from "@/components/AskQuestionModal";
import DeliveryReturnsModal from "@/components/DeliveryReturnsModal";
import ShareProduct from "@/components/ShareProduct";
const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <div className="min-h-[calc(100vh-148px)]">
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {product?.image && (
          <div className="w-full md:w-1/2 h-auto border border-darkGreen/20 shadow-md rounded-md group overflow-hidden">
            <Image
              src={urlFor(product.image)?.url()}
              alt={product?.name || "Product Image"}
              width={700}
              height={700}
              className="w-full max-h-[550px] object-cover group-hover:scale-110 rounded-md hoverEffect"
            />
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div>
            <p className="text-4xl font-bold mb-2">{product?.name}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-gray-500 gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isLastStar = index === 4;
                  return (
                    <LuStar
                      fill={!isLastStar ? "#fca99b" : "transparent"}
                      key={index}
                      className={`${isLastStar ? "text-gray-500" : "text-lightOrange"}`}
                    />
                  );
                })}
              </div>
              <p className="text-sm font-medium text-gray-500">{`(25 reviews)`}</p>
            </div>
          </div>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            label={product?.label}
            className="text-lg font-bold"
          />
          {product?.stock && (
            <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              In Stock
            </p>
          )}

          <ViewCount />

          <p className="text-sm text-gray-600 tracking-wide">
            {product?.description}
          </p>

          {product && <AddToCartButton product={product} />}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 border-b border-b-gray-200 py-5 mt-2">
            <AskQuestionModal productName={product?.name || ""} />
            <DeliveryReturnsModal />
            <ShareProduct product={{ name: product?.name || "", slug: slug }} />
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
            <div className="border border-darkGreen/20 text-center p-3 hover:border-darkGreen hoverEffect rounded-md">
              <p className="text-base font-semibold text-black">
                Free Shipping
              </p>
              <p className="text-sm text-gray-500">
                Free shipping for orders over $200
              </p>
            </div>
            <div className="border border-darkGreen/20 text-center p-3 hover:border-darkGreen hoverEffect rounded-md">
              <p className="text-base font-semibold text-black">
                Flexible Payment
              </p>
              <p className="text-sm text-gray-500">
                Pay with multiple payment methods
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
