import { ReadyProjectClientPage } from "@/components";
import getCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import getPlotsFromDB from "@/Firebase/admin-side/roles-analytics-cities/plots/getPlotsFromFirestore";
import getUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/units/getUnitsFromDb";
import replacePlotUnitIdsByNames from "@/services/admin-side/replacePlotUnitIdsByNames";
import getFamilyUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/familyUnits/getFamilyUnitsFromDb";
import getFloorsFromDb from "@/Firebase/admin-side/teams-aboutus/floors/getFloorsFromDb";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import getMaterialsFromDb from "@/Firebase/admin-side/materials/materials/getMaterialsFromDb";

const ReadyProject = async () => {
  const floors = await getFloorsFromDb(["id", "name"]);
  const familyUnits = await getFamilyUnitsFromDb(["id", "name"]);
  const cities = await getCitiesFromDB(["id", "name"]);
  const units = await getUnitsFromDb(["id", "name"]);
  const styles = await getStylesFromDB(["id", "name", "budget"]);
  const materials = await getMaterialsFromDb(["id", "name", "vendor"]);
  let plots = await getPlotsFromDB(["id", "area", "unit"]);
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
