import { chevronLeftIcon } from "@/assets";
import { H1, ClientPage } from "@/components";
import Image from "next/image";
import Link from "next/link";
import useCurrenciesFromDB from "@/Firebase/currencies/getCurrenciesFromFirebase";
import useCitiesFromDB from "@/Firebase/cities/getCitiesFromFirebase";
import useOfficesFromDB from "@/Firebase/offices/getOfficesFromDB";
import usePlotsFromDB from "@/Firebase/plots/getPlotsFromFirestore";
import useStylesFromDB from "@/Firebase/styles/getStylesFromFirebase";

const RolesAnalyticsCities = async () => {
  const cities = await useCitiesFromDB();
  const currencies = await useCurrenciesFromDB();
  const officeLocations = await useOfficesFromDB();
  const plots = await usePlotsFromDB();
  const styles = await useStylesFromDB();

  return (
    <>
      {/* for 1024+, calc(100vh - (AdminHeader height + 1rem)) */}
      {/* for 0-1024, calc(100vh - (AdminHeader height + 3rem)) */}
      <section className="px-8 flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] sm:px-4">
        <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20 lg:h-12">
          <div className="w-full flex justify-between items-center xs:items-start">
            <Link
              href={"/admin"}
              className="bg-accent-1-base rounded-full p-5 xl:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </Link>
            <H1
              text="roles, analystics & cities"
              className="mx-auto xl:text-2xl"
            />
          </div>
        </div>
        <ClientPage
          cities={cities}
          currencies={currencies}
          officeLocations={officeLocations}
          plots={plots}
          styles={styles}
        />
      </section>
    </>
  );
};

export default RolesAnalyticsCities;
