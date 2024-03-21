import { AdminInputBox, AdminModal } from "@/components";

const MaterialCategoryModal = ({
  addNewMaterialCategoryHandler,
  editMaterialCategoryHandler,
  currentMaterialCategory,
  currentMaterialCategoryInputHandler,
  modalMetadata,
}) => {
  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD" ? "Add category" : "Edit category"
        }
        buttonText={
          modalMetadata.action === "ADD" ? "Add category" : "Update category"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewMaterialCategoryHandler
            : editMaterialCategoryHandler
        }>
        <AdminInputBox
          label="Enter category name"
          value={currentMaterialCategory.name}
          inputHandler={currentMaterialCategoryInputHandler}
          idHtmlFor="name"
          name="name"
        />
      </AdminModal>
    </>
  );
};

export default MaterialCategoryModal;
