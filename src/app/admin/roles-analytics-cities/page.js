import { chevronLeftIcon } from "@/assets";
import { H1, RACClientPage } from "@/components";
import Image from "next/image";
import Link from "next/link";
import getCurrenciesFromDB from "@/Firebase/admin-side/roles-analytics-cities/currencies/getCurrenciesFromFirebase";
import getCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import getOfficesFromDB from "@/Firebase/admin-side/roles-analytics-cities/offices/getOfficesFromDB";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import getPlotsFromDB from "@/Firebase/admin-side/roles-analytics-cities/plots/getPlotsFromFirestore";
import mapCurrencyCitiesWithNames from "@/utilities/admin-panel/roles-analytics-cities/mapCurrencyCitiesWithNames";
import getUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/units/getUnitsFromDb";

const RAC = async () => {
  const cities = await getCitiesFromDB(["id", "name"]);
  let currencies = await getCurrenciesFromDB([
    "id",
    "name",
    "cities",
    "valueInPkr",
  ]);
  currencies = mapCurrencyCitiesWithNames(currencies, cities);
  const officeLocations = await getOfficesFromDB([
    "id",
    "name",
    "address",
    "mapsLink",
    "image",
  ]);
  const plots = await getPlotsFromDB(["id", "area", "unit", "category"]);
  const styles = await getStylesFromDB(["id", "name", "budget"]);
  const units = await getUnitsFromDb(["id", "name"]);

  return (
    <>
      {/* for 1024px+, calc(100vh - (AdminHeader height + 1rem)) */}
      {/* for 0px-1024px, calc(100vh - (AdminHeader height + 3rem)) */}
      <section className="px-8 flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] sm:px-4">
        <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20 lg:h-12">
          <div className="w-full flex justify-between items-center">
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
        <RACClientPage
          cities={cities}
          currencies={currencies}
          officeLocations={officeLocations}
          plots={plots}
          styles={styles}
          units={units}
        />
      </section>
    </>
  );
};

export default RAC;
