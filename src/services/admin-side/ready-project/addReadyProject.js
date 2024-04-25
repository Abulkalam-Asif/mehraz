import addReadyProjectS1ToDB from "@/Firebase/admin-side/ready_project/addReadyProjectScreen-1";
import addReadyProjectS2ToDB from "@/Firebase/admin-side/ready_project/addReadyProjectScreen-2";
import addReadyProjectS3ToDB from "@/Firebase/admin-side/ready_project/addReadyProjectScreen-3";
import fileToFormData from "@/utilities/admin-panel/fileToFormData";

const addReadyProjectS1Service = (
  readyProjectS1,
  showAlert,
  setShowSpinner,
) => {
  const formattedData = {
    title: readyProjectS1.title.trim().toUpperCase(),
    budget: readyProjectS1.budget,
    description: readyProjectS1.description.trim(),
    cities: readyProjectS1.cities,
    areas: readyProjectS1.areas,
    floors: readyProjectS1.floors,
    units: readyProjectS1.units,
    style: readyProjectS1.style,
    constructionRates: readyProjectS1.constructionRates.map(rate =>
      rate.trim(),
    ),
    productRates: readyProjectS1.productRates.map(rate => rate.trim()),
    keywords: readyProjectS1.keywords.map(keyword => keyword.trim()),
    image: readyProjectS1.image,
    video: readyProjectS1.video,
  };
  if (formattedData.title.length === 0) {
    showAlert({ type: "WARNING", message: "Title is required" });
    return;
  } else if (formattedData.budget.length === 0) {
    showAlert({ type: "WARNING", message: "Budget is required" });
    return;
  } else if (formattedData.description.length === 0) {
    showAlert({ type: "WARNING", message: "Description is required" });
    return;
  } else if (formattedData.cities.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one city" });
    return;
  } else if (formattedData.areas.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one area" });
    return;
  } else if (formattedData.floors.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one floor" });
    return;
  } else if (formattedData.units.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one unit" });
    return;
  } else if (formattedData.style.length === 0) {
    showAlert({ type: "WARNING", message: "Style is required" });
    return;
  } else if (formattedData.constructionRates.some(rate => rate.length === 0)) {
    showAlert({
      type: "WARNING",
      message: "Construction rates are required",
    });
    return;
  } else if (formattedData.productRates.some(rate => rate.length === 0)) {
    showAlert({ type: "WARNING", message: "Product rates are required" });
    return;
  } else if (formattedData.keywords.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please enter at least one keyword",
    });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "WARNING", message: "Please attach an image" });
    return;
  } else if (!formattedData.video) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
    return;
  } else {
    setShowSpinner(true);
    // Convert image and video to FormData
    formattedData.image = fileToFormData("image", formattedData.image);
    formattedData.video = fileToFormData("video", formattedData.video);
    return new Promise(resolve => {
      addReadyProjectS1ToDB(formattedData).then(({ type, message, data }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        resolve(data);
      });
    });
  }
};

const addReadyProjectS2Service = (
  projectId,
  readyProjectS2,
  showAlert,
  setShowSpinner,
) => {
  if (
    readyProjectS2.combinations?.some(
      combination => combination.familyUnits.length === 0,
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "Please select family units for all combinations",
    });
    return;
  } else if (
    readyProjectS2.budgetRanges.some(
      range => range.min === 0 || range.max === 0,
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "Please enter budget ranges for all areas",
    });
    return;
  } else if (
    readyProjectS2.budgetRanges.some(range => range.min >= range.max)
  ) {
    showAlert({
      type: "WARNING",
      message: "Minimum budget should be less than maximum budget",
    });
    return;
  } else {
    const designs = [];
    readyProjectS2.combinations.forEach(combination => {
      combination.familyUnits.forEach(familyUnit => {
        designs.push({
          areaId: combination.area.id,
          floorId: combination.floor.id,
          familyUnitId: familyUnit,
        });
      });
    });
    setShowSpinner(true);
    return new Promise(resolve => {
      addReadyProjectS2ToDB({
        id: projectId,
        designs,
        budgetRanges: readyProjectS2.budgetRanges,
      }).then(({ data, type, message }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        if (type === "SUCCESS") resolve(data);
        else resolve(null);
      });
    });
  }
};

const addReadyProjectS3Service = (
  projectId,
  readyProjectS3,
  showAlert,
  setShowSpinner,
) => {
  if (readyProjectS3.exteriorViews.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please add at least one exterior view",
    });
    return;
  } else if (readyProjectS3.interiorViews.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please add at least one interior view",
    });
    return;
  } else if (readyProjectS3.materials.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please select at least one material",
    });
    return;
  } else if (
    readyProjectS3.materials.some(
      material => material.id === "" || material.quantity < 1,
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "Please enter valid quantity for all materials",
    });
    return;
  } else if (readyProjectS3.imagesOp1.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please attach at least one image for option 1",
    });
    return;
  } else if (readyProjectS3.imagesOp2.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please attach at least one image for option 2",
    });
    return;
  } else {
    setShowSpinner(true);
    // Convert images to FormData
    const imagesOp1 = readyProjectS3.imagesOp1.map((image, index) =>
      fileToFormData(`image${index}`, image),
    );
    const imagesOp2 = readyProjectS3.imagesOp2.map((image, index) =>
      fileToFormData(`image${index}`, image),
    );
    const interiorViews = readyProjectS3.interiorViews.map(view => ({
      ...view,
      video: fileToFormData("video", view.video),
    }));
    const exteriorViews = readyProjectS3.exteriorViews.map(view => ({
      ...view,
      video: fileToFormData("video", view.video),
    }));
    return new Promise(resolve => {
      addReadyProjectS3ToDB({
        id: projectId,
        interiorViews,
        exteriorViews,
        imagesOp1,
        imagesOp2,
        materials: readyProjectS3.materials,
      }).then(({ type, message, data }) => {
        showAlert({ type, message });
        resolve(data);
      });
    });
  }
};

export {
  addReadyProjectS1Service,
  addReadyProjectS2Service,
  addReadyProjectS3Service,
};
