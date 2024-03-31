import { ReadyProjectClientPage } from "@/components";
import { chevronLeftIcon } from "@/assets";
import { H1 } from "@/components";
import Image from "next/image";
import Link from "next/link";
import useCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import usePlotsFromDB from "@/Firebase/admin-side/roles-analytics-cities/plots/getPlotsFromFirestore";
import useUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/units/getUnitsFromDb";
import replacePlotUnitIdsByNames from "@/services/admin-side/replacePlotUnitIdsByNames";
import useGetFamilyUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/familyUnits/getFamilyUnitsFromDb";
import useGetFloorsFromDb from "@/Firebase/admin-side/teams-aboutus/floors/getFloorsFromDb";
import useStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";

const ReadyProject = async () => {
  const floors = await useGetFloorsFromDb(["id", "name"]);
  const familyUnits = await useGetFamilyUnitsFromDb(["id", "name"]);
  const cities = await useCitiesFromDB(["id", "name"]);
  const units = await useUnitsFromDb(["id", "name"]);
  const styles = await useStylesFromDB(["id", "name", "budget"]);
  let plots = await usePlotsFromDB(["id", "area", "unit"]);
  plots = replacePlotUnitIdsByNames(plots, units);

  return (
    <>
      <section className="px-8 flex flex-col sm:px-4">
        <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20 lg:h-12">
          <div className="w-full flex justify-between items-center xs:items-start">
            <Link
              href={"/admin/projects"}
              className="bg-accent-1-base rounded-full p-5 xl:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </Link>
            <H1 text="Project upload" className="mx-auto xl:text-2xl" />
          </div>
        </div>
        <ReadyProjectClientPage
          cities={cities}
          plots={plots}
          floors={floors}
          units={units}
          familyUnits={familyUnits}
          styles={styles}
        />
      </section>
    </>
  );
};

export default ReadyProject;
