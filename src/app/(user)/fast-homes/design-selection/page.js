import getCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import { DesSelClientPage } from "@/components";

const DesignSelectionPage = async () => {
  let cities = null,
    styles = null;
  try {
    cities = await getCitiesFromDB();
  } catch (error) {
    console.error("Error fetching cities from DB: ", error);
  }

  try {
    styles = await getStylesFromDB(["id", "name", "budget", "image"]);
  } catch (error) {
    console.error("Error fetching styles from DB: ", error);
  }
  return (
    <>
      <DesSelClientPage cities={cities} styles={styles} />
    </>
  );
};

export default DesignSelectionPage;
