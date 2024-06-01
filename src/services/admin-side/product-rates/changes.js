import updateChanges from "@/Firebase/admin-side/product-rates/updateChanges";

const updateChangesService = (newChanges, setShowUpdateSpinner, showAlert) => {
  if (
    newChanges
      .map(change => change.changes === "" || change.rate === "")
      .includes(true)
  ) {
    return showAlert({ type: "ERROR", message: "Please fill all the fields." });
  }

  setShowUpdateSpinner(true);
  updateChanges(newChanges).then(({ type, message }) => {
    setShowUpdateSpinner(false);
    showAlert({ type, message });
  });
};
export default updateChangesService;
