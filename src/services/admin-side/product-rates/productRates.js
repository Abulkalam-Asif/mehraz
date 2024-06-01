import addNewProductRate from "@/Firebase/admin-side/product-rates/addNewProductRate";
import deleteProductRate from "@/Firebase/admin-side/product-rates/deleteProductRate";
import updateProductRate from "@/Firebase/admin-side/product-rates/updateProductRate";

const addNewRateService = (
  currentDesignRate,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const formattedData = {
    service: currentDesignRate.service.trim().toUpperCase(),
    rate: currentDesignRate.rate,
    description: currentDesignRate.description.trim(),
    isFixed: currentDesignRate.isFixed,
    type: currentDesignRate.type,
  };
  if (formattedData.service === "") {
    showAlert({ type: "WARNING", message: "Please enter service name" });
    return;
  } else if (formattedData.rate === 0) {
    showAlert({ type: "WARNING", message: "Please enter valid rate" });
    return;
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description" });
    return;
  } else {
    setShowModalSpinner(true);
    addNewProductRate(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const editRateService = (
  currentDesignRate,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const formattedData = {
    id: currentDesignRate.id,
    service: currentDesignRate.service.trim().toUpperCase(),
    rate: currentDesignRate.rate,
    description: currentDesignRate.description.trim(),
    isFixed: currentDesignRate.isFixed,
    type: currentDesignRate.type,
  };
  if (formattedData.service === "") {
    showAlert({ type: "WARNING", message: "Please enter service name" });
    return;
  } else if (formattedData.rate === 0) {
    showAlert({ type: "WARNING", message: "Please enter valid rate" });
    return;
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description" });
    return;
  } else {
    setShowModalSpinner(true);
    updateProductRate(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deleteRateService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  setShowModalSpinner(true);
  deleteProductRate(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export { addNewRateService, editRateService, deleteRateService };
