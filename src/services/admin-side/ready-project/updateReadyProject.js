import updateReadyProjectS1ToDB from "@/Firebase/admin-side/ready_project/updateFunctions/updateReadyProjectScreen-1";
import updateReadyProjectS2ToDB from "@/Firebase/admin-side/ready_project/updateFunctions/updateReadyProjectScreen-2";
import updateReadyProjectS3ToDB from "@/Firebase/admin-side/ready_project/updateFunctions/updateReadyProjectScreen-3";
import updateReadyProjectS4ToDB from "@/Firebase/admin-side/ready_project/updateFunctions/updateReadyProjectScreen-4";
import fileToFormData from "@/utilities/admin-side/fileToFormData";

const updateReadyProjectS1Service = (
  projectId,
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
    constructionRates: readyProjectS1.constructionRates?.map(rate =>
      rate.trim(),
    ),
    productRates: readyProjectS1.productRates?.map(rate => rate.trim()),
    keywords: readyProjectS1.keywords?.map(keyword => keyword.trim()),
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
  } else if (formattedData.constructionRates?.some(rate => rate.length === 0)) {
    showAlert({
      type: "WARNING",
      message: "Construction rates are required",
    });
    return;
  } else if (formattedData.productRates?.some(rate => rate.length === 0)) {
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
    if (formattedData.image instanceof File) {
      formattedData.image = fileToFormData("image", formattedData.image);
    }
    if (formattedData.video instanceof File) {
      formattedData.video = fileToFormData("video", formattedData.video);
    }
    return new Promise(resolve => {
      updateReadyProjectS1ToDB({ id: projectId, ...formattedData }).then(
        ({ type, message, data }) => {
          showAlert({ type, message });
          setShowSpinner(false);
          resolve(data);
        },
      );
    });
  }
};

const updateReadyProjectS2Service = (
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
    readyProjectS2.budgetRanges?.some(
      range => range.min === 0 || range.max === 0,
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "Please enter budget ranges for all areas",
    });
    return;
  } else if (
    readyProjectS2.budgetRanges?.some(range => range.min >= range.max)
  ) {
    showAlert({
      type: "WARNING",
      message: "Minimum budget should be less than maximum budget",
    });
    return;
  } else {
    const designs = [];
    readyProjectS2.combinations?.forEach(combination => {
      combination.familyUnits?.forEach(familyUnit => {
        designs.push({
          areaId: combination.area.id,
          floorId: combination.floor.id,
          familyUnitId: familyUnit,
        });
      });
    });
    setShowSpinner(true);
    return new Promise(resolve => {
      updateReadyProjectS2ToDB({
        id: projectId,
        designs,
        budgetRanges: readyProjectS2.budgetRanges,
      }).then(({ type, message }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        if (type === "SUCCESS") resolve(true);
        else resolve(false);
      });
    });
  }
};

const updateReadyProjectS3Service = (
  projectId,
  readyProjectS3,
  showAlert,
  setShowSpinner,
) => {
  if (readyProjectS3.exteriorViews?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please add at least one exterior view",
    });
    return;
  } else if (readyProjectS3.interiorViews?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please add at least one interior view",
    });
    return;
  } else if (readyProjectS3.materials?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please select at least one material",
    });
    return;
  } else if (readyProjectS3.imagesOp1?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please attach at least one image for option 1",
    });
    return;
  } else if (readyProjectS3.imagesOp2?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please attach at least one image for option 2",
    });
    return;
  } else {
    setShowSpinner(true);
    // Convert images to FormData
    const imagesOp1 = readyProjectS3.imagesOp1
      ?.filter(image => image instanceof File)
      ?.map((image, index) => fileToFormData(`image${index}`, image));
    const imagesOp2 = readyProjectS3.imagesOp2
      ?.filter(image => image instanceof File)
      ?.map((image, index) => fileToFormData(`image${index}`, image));

    const interiorViews = readyProjectS3.interiorViews.map(view => ({
      ...view,
      video:
        view.video instanceof File
          ? fileToFormData("video", view.video)
          : view.video,
    }));
    const exteriorViews = readyProjectS3.exteriorViews.map(view => ({
      ...view,
      video:
        view.video instanceof File
          ? fileToFormData("video", view.video)
          : view.video,
    }));
    return new Promise(resolve => {
      updateReadyProjectS3ToDB({
        id: projectId,
        interiorViews,
        exteriorViews,
        imagesOp1,
        imagesOp2,
        imagesOp1ToDel: readyProjectS3?.imagesOp1ToDel || [],
        imagesOp2ToDel: readyProjectS3.imagesOp2ToDel || [],
        viewsToDelIds: readyProjectS3?.viewsToDelIds || [],
        materials: readyProjectS3?.materials || [],
      }).then(({ type, message, data }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        resolve(data);
      });
    });
  }
};

const updateReadyProjectS4DesignService = async (
  projectId,
  designId,
  readyProjectS4Design,
  showAlert,
  setShowSpinner,
) => {
  const formattedData = {
    video: readyProjectS4Design.video,
    designCost: readyProjectS4Design.designCost.trim().toUpperCase(),
    constructionCost: readyProjectS4Design.constructionCost
      .trim()
      .toUpperCase(),
    keywords: readyProjectS4Design.keywords.map(keyword =>
      keyword.trim().toUpperCase(),
    ),
    op1Name: readyProjectS4Design.op1Name.trim().toUpperCase(),
    op2Name: readyProjectS4Design.op2Name.trim().toUpperCase(),
    description: readyProjectS4Design.description.trim(),
    descriptionOp1: readyProjectS4Design.descriptionOp1.trim(),
    descriptionOp2: readyProjectS4Design.descriptionOp2.trim(),
    designRates: readyProjectS4Design.designRates?.map(
      ({ id, rate, cost }) => ({
        id,
        rate,
        cost,
      }),
    ),
    constructionRates: readyProjectS4Design.constructionRates?.map(
      ({ id, rate, cost }) => ({
        id,
        rate,
        cost,
      }),
    ),
  };
  if (!formattedData.video) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
    return;
  } else if (formattedData.designCost?.length === 0) {
    showAlert({ type: "WARNING", message: "Design cost is required" });
    return;
  } else if (formattedData.constructionCost?.length === 0) {
    showAlert({ type: "WARNING", message: "Construction cost is required" });
    return;
  } else if (formattedData.keywords?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please enter at least one keyword",
    });
    return;
  } else if (formattedData.op1Name?.length === 0) {
    showAlert({ type: "WARNING", message: "Option 1 name is required" });
    return;
  } else if (formattedData.op2Name?.length === 0) {
    showAlert({ type: "WARNING", message: "Option 2 name is required" });
    return;
  } else if (readyProjectS4Design.imagesOp1?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please attach at least one image for option 1",
    });
    return;
  } else if (readyProjectS4Design.imagesOp2?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please attach at least one image for option 2",
    });
    return;
  } else if (readyProjectS4Design.programs?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please select at least one program",
    });
    return;
  } else if (formattedData.description?.length === 0) {
    showAlert({ type: "WARNING", message: "Description is required" });
    return;
  } else if (formattedData.descriptionOp1?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Description for option 1 is required",
    });
    return;
  } else if (formattedData.descriptionOp2?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Description for option 2 is required",
    });
    return;
  } else if (readyProjectS4Design.exteriorViews?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please add at least one exterior view",
    });
  } else if (readyProjectS4Design.interiorViews?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please add at least one interior view",
    });
  } else if (readyProjectS4Design.materials?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please select at least one material",
    });
  } else if (
    readyProjectS4Design.materials.some(
      material => material.id === "" || material.quantity < 1,
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "Please enter valid quantity for all materials",
    });
  } else if (formattedData.designRates?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please enter design rates",
    });
    return;
  } else if (
    formattedData.designRates?.some(rate => rate.rate === 0 || rate.cost === 0)
  ) {
    showAlert({
      type: "WARNING",
      message: "Please enter valid design rates",
    });
    return;
  } else if (formattedData.constructionRates?.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please enter construction rates",
    });
    return;
  } else if (
    formattedData.constructionRates?.some(
      rate => rate.rate === 0 || rate.cost === 0,
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "Please enter valid construction rates",
    });
    return;
  } else if (readyProjectS4Design.totalCost === 0) {
    showAlert({ type: "WARNING", message: "Please enter total cost" });
    return;
  } else {
    setShowSpinner(true);
    // Convert video and images to FormData
    if (video instanceof File) {
      formattedData.video = fileToFormData("video", formattedData.video);
    }
    const imagesOp1 = readyProjectS4Design.imagesOp1
      ?.filter(image => image instanceof File)
      ?.map((image, index) => fileToFormData(`image${index}`, image));

    const imagesOp2 = readyProjectS4Design.imagesOp2
      ?.filter(image => image instanceof File)
      ?.map((image, index) => fileToFormData(`image${index}`, image));

    const interiorViews = readyProjectS4Design.interiorViews?.map(view => ({
      ...view,
      video:
        view.video instanceof File
          ? fileToFormData("video", view.video)
          : view.video,
    }));
    const exteriorViews = readyProjectS4Design.exteriorViews?.map(view => ({
      ...view,
      video:
        view.video instanceof File
          ? fileToFormData("video", view.video)
          : view.video,
    }));

    return new Promise(resolve => {
      updateReadyProjectS4ToDB({
        projectId,
        designId,
        ...formattedData,
        imagesOp1,
        imagesOp2,
        exteriorViews,
        interiorViews,
        materials: readyProjectS4Design.materials,
        programs: readyProjectS4Design.programs,
        discount: readyProjectS4Design.discount,
        totalCost: readyProjectS4Design.totalCost,
        imagesOp1ToDel: readyProjectS4Design?.imagesOp1ToDel || [],
        imagesOp2ToDel: readyProjectS4Design?.imagesOp2ToDel || [],
        viewsToDelIds: readyProjectS4Design?.viewsToDelIds || [],
        programsToDelIds: readyProjectS4Design?.programsToDelIds || [],
      }).then(({ type, message, data }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        resolve(data);
      });
    });
  }
};

export {
  updateReadyProjectS1Service,
  updateReadyProjectS2Service,
  updateReadyProjectS3Service,
  updateReadyProjectS4DesignService,
};
