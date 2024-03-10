const addEditProgramService = (currentProgram, showAlert) => {
  const formattedData = {
    id: currentProgram.id,
    category: currentProgram.category.trim().toUpperCase(),
    quantity: Number(currentProgram.quantity),
    subCategories: currentProgram.subCategories,
  };
  formattedData.subCategories = formattedData.subCategories.map(sub => {
    return {
      space: sub.space.trim().toUpperCase(),
      size: sub.size.trim().toUpperCase(),
    };
  });

  if (formattedData.category === "") {
    showAlert({ type: "WARNING", message: "Please enter category" });
    return null;
  } else if (formattedData.quantity <= 0) {
    showAlert({ type: "WARNING", message: "Please enter valid quantity" });
    return null;
  } else if (
    formattedData.subCategories.map(sub => sub.space).includes("") ||
    formattedData.subCategories.map(sub => sub.size).includes("")
  ) {
    showAlert({
      type: "WARNING",
      message: "Please enter valid spaces and sizes",
    });
    return null;
  }
  return formattedData;
};

export { addEditProgramService };
