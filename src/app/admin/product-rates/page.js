import getAllProductRates from "@/Firebase/admin-side/product-rates/getAllProductRates";
import { chevronLeftIcon } from "@/assets";
import { H1, ProductRatesClientPage } from "@/components";
import Image from "next/image";
import Link from "next/link";

const ProductRates = async () => {
  let productRates = null;
  let isErrorOccurredWhileFetching = false;
  try {
    productRates = await getAllProductRates();
  } catch (error) {
    isErrorOccurredWhileFetching = true;
  }

  return (
    <>
      <section className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="max-w-8xl w-full mx-auto h-24 xl:h-20">
          <div className="w-full flex justify-between items-center">
            <Link
              href={"/admin"}
              className="bg-accent-1-base rounded-full p-5 lg:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 lg:w-4"
              />
            </Link>
            <H1 text="Product Rates" className="mx-auto xl:text-2xl" />
          </div>
        </div>
        <ProductRatesClientPage
          productRates={productRates}
          isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
        />
      </section>
    </>
  );
};

export default ProductRates;
