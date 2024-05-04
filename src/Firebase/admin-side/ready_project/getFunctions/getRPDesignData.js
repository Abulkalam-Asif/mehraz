"use server";
import { db } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const getRPDesignData = async id => {
  try {
    const rpDesignRef = doc(db, "RP_DESIGNS", id);
    const rpDesignDoc = await getDoc(rpDesignRef);
    const rpDesign = {
      id,
    };
    if (rpDesignDoc.exists()) {
      const data = rpDesignDoc.data();
      // Get area of the design
      const areaRef = doc(db, "PLOTS", data.areaId);
      const areaDoc = await getDoc(areaRef);
      if (areaDoc.exists()) {
        // Get unit of the area
        const unitRef = doc(db, "UNITS", areaDoc.data().unit);
        const unitDoc = await getDoc(unitRef);
        if (unitDoc.exists()) {
          rpDesign.area = `${areaDoc.data().area} ${unitDoc.data().name}`;
          rpDesign.areaInSqFt =
            areaDoc.data().area * unitDoc.data().valueInSqFt;
        }
      }
      // Get floors of the design
      const floorRef = doc(db, "FLOORS", data.floorId);
      const floorDoc = await getDoc(floorRef);
      if (floorDoc.exists()) {
        rpDesign.floor = floorDoc.data().name;
      }
      // Get family units of the design
      const familyUnitsRef = doc(db, "FAMILY_UNITS", data.familyUnitId);
      const familyUnitsDoc = await getDoc(familyUnitsRef);
      if (familyUnitsDoc.exists()) {
        rpDesign.familyUnit = familyUnitsDoc.data().name;
      }
    }
    return rpDesign;
  } catch (error) {
    console.error("Error getting the ready project design: ", error);
    return null;
  }
};

export default getRPDesignData;
