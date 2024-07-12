import { DesSelClientPage } from "@/components";
import getCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import getPlotsFromDB from "@/Firebase/admin-side/roles-analytics-cities/plots/getPlotsFromFirestore";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import getFamilyUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/familyUnits/getFamilyUnitsFromDb";
import getFloorsFromDb from "@/Firebase/admin-side/teams-aboutus/floors/getFloorsFromDb";
import getUnitsFromDb from "@/Firebase/admin-side/teams-aboutus/units/getUnitsFromDb";
import { replacePlotsUnitIdsByDocs } from "@/services/admin-side/replacePlotsUnitIds";

const DesignSelectionPage = async () => {
  let cities = [],
    styles = [],
    step1DataFetchError = null;

  try {
    const [citiesResult, stylesResult] = await Promise.all([
      getCitiesFromDB(["id", "name"]),
      getStylesFromDB(["id", "name", "budget", "image"]),
    ]);
    cities = citiesResult;
    styles = stylesResult;
  } catch (e) {
    step1DataFetchError =
      "An error occurred while fetching data. Please refresh the page.";
  }

  let areas = [],
    floors = [],
    familyUnits = [],
    step2DataFetchError = null;

  try {
    const [areasResult, unitsResult, floorsResult, familyUnitsResult] =
      await Promise.all([
        getPlotsFromDB(["id", "area", "unit", "category"]),
        getUnitsFromDb(["id", "name", "valueInSqFt"]),
        getFloorsFromDb(["id", "name"]),
        getFamilyUnitsFromDb(["id", "name"]),
      ]);
    areas = replacePlotsUnitIdsByDocs(areasResult, unitsResult);
    floors = floorsResult;
    familyUnits = familyUnitsResult;
  } catch (e) {
    step2DataFetchError =
      "An error occurred while fetching data. Please refresh the page.";
  }

  return (
    <>
      <DesSelClientPage
        cities={cities}
        styles={styles}
        step1DataFetchError={step1DataFetchError}
        areas={areas}
        floors={floors}
        familyUnits={familyUnits}
        step2DataFetchError={step2DataFetchError}
      />
    </>
  );
};

export default DesignSelectionPage;
