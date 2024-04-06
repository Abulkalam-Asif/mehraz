import { ReadyProjectClientPage } from "@/components";
import useCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import usePlotsFromDB from "@/Firebase/admin-side/roles-analytics-cities/plots/getPlotsFromFirestore";
import useUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/units/getUnitsFromDb";
import replacePlotUnitIdsByNames from "@/services/admin-side/replacePlotUnitIdsByNames";
import useGetFamilyUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/familyUnits/getFamilyUnitsFromDb";
import useGetFloorsFromDb from "@/Firebase/admin-side/teams-aboutus/floors/getFloorsFromDb";
import useStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import useMaterialsFromDb from "@/Firebase/admin-side/materials/materials/getMaterialsFromDb";

const ReadyProject = async () => {
  const floors = await useGetFloorsFromDb(["id", "name"]);
  const familyUnits = await useGetFamilyUnitsFromDb(["id", "name"]);
  const cities = await useCitiesFromDB(["id", "name"]);
  const units = await useUnitsFromDb(["id", "name"]);
  const styles = await useStylesFromDB(["id", "name", "budget"]);
  const materials = await useMaterialsFromDb(["id", "name", "vendor"]);
  let plots = await usePlotsFromDB(["id", "area", "unit"]);
  plots = replacePlotUnitIdsByNames(plots, units);

  return (
    <>
      <section className="px-8 flex flex-col sm:px-4">
        <ReadyProjectClientPage
          cities={cities}
          plots={plots}
          floors={floors}
          units={units}
          familyUnits={familyUnits}
          styles={styles}
          materials={materials}
        />
      </section>
    </>
  );
};

export default ReadyProject;
