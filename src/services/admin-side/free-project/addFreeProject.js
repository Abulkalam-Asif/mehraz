import addFreeProjectS1ToDb from "@/Firebase/admin-side/free-project/addFreeProjectS1ToDb";
import addFreeProjectS2ToDb from "@/Firebase/admin-side/free-project/addFreeProjectS2ToDb";
import fileToFormData from "@/utilities/admin-side/fileToFormData";

const addFreeProjectS1Service = (freeProjectS1, showAlert, setShowSpinner) => {
  const formattedData = {
    title: freeProjectS1.title.trim().toUpperCase(),
    city: freeProjectS1.city.trim(),
    area: freeProjectS1.area.trim(),
    budget: freeProjectS1.budget.trim().toUpperCase(),
    description: freeProjectS1.description.trim(),
    construction_cost: freeProjectS1.construction_cost.trim().toUpperCase(),
    keywords: freeProjectS1.keywords,
    image: freeProjectS1.image,
    video: freeProjectS1.video,
  };
  if (formattedData.title === "") {
    showAlert({ type: "WARNING", message: "Please enter a title" });
  } else if (formattedData.city === "") {
    showAlert({ type: "WARNING", message: "Please select a city" });
  } else if (formattedData.area === "") {
    showAlert({ type: "WARNING", message: "Please select an area" });
  } else if (formattedData.budget === "") {
    showAlert({ type: "WARNING", message: "Please select budget" });
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description" });
  } else if (formattedData.construction_cost === "") {
    showAlert({ type: "WARNING", message: "Please enter a construction cost" });
  } else if (formattedData.keywords.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please enter at least one keyword",
    });
  } else if (!formattedData.image) {
    showAlert({ type: "WARNING", message: "Please attach an image" });
  } else if (!formattedData.video) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
  } else {
    setShowSpinner(true);
    // Converting image to FormData to pass to Server Action
    formattedData.image = fileToFormData("image", formattedData.image);
    formattedData.video = fileToFormData("video", formattedData.video);
    return new Promise(resolve => {
      addFreeProjectS1ToDb(formattedData).then(({ data, type, message }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        resolve(data);
      });
    });
  }
};

const addFreeProjectS2Service = async (
  freeProjectS2,
  showAlert,
  setShowSpinner,
) => {
  if (!freeProjectS2.id) {
    showAlert({
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    });
    return;
    // } else if (!freeProjectS2.designFile) {
    //   showAlert({ type: "WARNING", message: "Please attach a design file" });
    //   return;
    // } else if (freeProjectS2.images.length === 0) {
    //   showAlert({ type: "WARNING", message: "Please attach at least one image" });
    //   return;
    // } else if (freeProjectS2.programs.length === 0) {
    //   showAlert({
    //     type: "WARNING",
    //     message: "Please add at least one program",
    //   });
    //   return;
    // } else if (freeProjectS2.exteriorViews.length === 0) {
    //   showAlert({
    //     type: "WARNING",
    //     message: "Please add at least one exterior view",
    //   });
    //   return;
    // } else if (freeProjectS2.interiorViews.length === 0) {
    //   showAlert({
    //     type: "WARNING",
    //     message: "Please add at least one interior view",
    //   });
    //   return;
    // } else if (freeProjectS2.materials.length === 0) {
    //   showAlert({
    //     type: "WARNING",
    //     message: "Please add at least one material",
    //   });
    //   return;
  } else {
    setShowSpinner(true);
    // Converting files to FormData to pass to Server Action
    freeProjectS2.designFile = fileToFormData(
      "designFile",
      freeProjectS2.designFile,
    );
    freeProjectS2.images = Array.from(freeProjectS2.images).map(image =>
      fileToFormData("image", image),
    );

    freeProjectS2.exteriorViews = Array.from(freeProjectS2.exteriorViews).map(
      exteriorView => ({
        ...exteriorView,
        video: fileToFormData(exteriorView.id, exteriorView),
      }),
    );
    freeProjectS2.interiorViews = Array.from(freeProjectS2.interiorViews).map(
      interiorView => ({
        ...interiorView,
        video: fileToFormData(interiorView.id, interiorView),
      }),
    );
    freeProjectS2.materials = Array.from(freeProjectS2.materials).map(
      material => ({
        ...material,
        image: fileToFormData(material.id, material.image),
      }),
    );

    const { type, message } = await addFreeProjectS2ToDb(freeProjectS2);
    showAlert({ type, message });
    setShowSpinner(false);
  }
};

export { addFreeProjectS1Service, addFreeProjectS2Service };
