import { ReadyProjectClientPage } from "@/components";
import getCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import getPlotsFromDB from "@/Firebase/admin-side/roles-analytics-cities/plots/getPlotsFromFirestore";
import getUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/units/getUnitsFromDb";
import { replacePlotsUnitIdsByNames } from "@/services/admin-side/replacePlotsUnitIds";
import getFamilyUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/familyUnits/getFamilyUnitsFromDb";
import getFloorsFromDb from "@/Firebase/admin-side/teams-aboutus/floors/getFloorsFromDb";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import getMaterialsFromDb from "@/Firebase/admin-side/materials/materials/getMaterialsFromDb";
import getRPDesignsProductRates from "@/Firebase/admin-side/ready_project/getFunctions/getRPDesignsProductRates";

const ReadyProject = async () => {
  let floors = null,
    familyUnits = null,
    cities = null,
    units = null,
    styles = null,
    plots = null,
    materials = null,
    productRates = null;

  let isErrorOccurredWhileFetching = {
    screen1: false,
    screen3: false,
    screen4: false,
  };
  try {
    floors = await getFloorsFromDb(["id", "name"]);
  } catch (error) {
    isErrorOccurredWhileFetching.screen1 = true;
  }
  try {
    familyUnits = await getFamilyUnitsFromDb(["id", "name"]);
  } catch (error) {
    isErrorOccurredWhileFetching.screen1 = true;
  }
  try {
    cities = await getCitiesFromDB(["id", "name"]);
  } catch (error) {
    isErrorOccurredWhileFetching.screen1 = true;
  }
  try {
    units = await getUnitsFromDb(["id", "name"]);
  } catch (error) {
    isErrorOccurredWhileFetching.screen1 = true;
  }
  try {
    styles = await getStylesFromDB(["id", "name", "budget"]);
  } catch (error) {
    isErrorOccurredWhileFetching.screen1 = true;
  }
  try {
    plots = await getPlotsFromDB(["id", "area", "unit"]);
    plots = replacePlotsUnitIdsByNames(plots, units);
  } catch (error) {
    isErrorOccurredWhileFetching.screen1 = true;
  }
  try {
    materials = await getMaterialsFromDb(["id", "name", "vendor"]);
  } catch (error) {
    isErrorOccurredWhileFetching.screen3 = true;
    isErrorOccurredWhileFetching.screen4 = true;
  }
  try {
    productRates = await getRPDesignsProductRates();
  } catch (error) {
    isErrorOccurredWhileFetching.screen4 = true;
  }

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
          productRates={productRates}
          isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
        />
      </section>
    </>
  );
};

export default ReadyProject;
