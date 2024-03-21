"use client";
import {
  DeleteModal,
  MaterialCategoriesSection,
  MaterialCategoryModal,
  Modal,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";
import {
  addNewMaterialCategoryService,
  deleteMaterialCategoryService,
  editMaterialCategoryService,
} from "@/services/admin-side/materials/materialCategories";
import { useContext, useEffect, useState } from "react";

const MaterialsClientPage = ({ materialCategories }) => {
  const { showAlert } = useContext(AlertContext);
  // Material Category states and functions
  const defaultMaterialCategory = {
    id: null,
    name: "",
    usage: 0,
    fixedMaterial: null,
  };
  const [currentMaterialCategory, setCurrentMaterialCategory] = useState(
    defaultMaterialCategory,
  );
  const currentMaterialCategoryInputHandler = (
    e,
    name = null,
    value = null,
  ) => {
    setCurrentMaterialCategory(prevState => ({
      ...prevState,
      [name || e.target.name]: value || e.target.value,
    }));
  };
  const addNewMaterialCategoryHandler = e => {
    e.preventDefault();
    addNewMaterialCategoryService(
      materialCategories,
      currentMaterialCategory,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const editMaterialCategoryHandler = e => {
    e.preventDefault();
    editMaterialCategoryService(
      materialCategories,
      currentMaterialCategory,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const deleteMaterialCategoryHandler = e => {
    e.preventDefault();
    deleteMaterialCategoryService(
      itemToDelete,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };

  // General state for deleting items
  const defaultItemToDelete = {
    name: null,
    id: null,
  };
  const [itemToDelete, setItemToDelete] = useState(defaultItemToDelete);

  // Modal states and functions
  const [showModalSpinner, setShowModalSpinner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMetadata, setModalMetadata] = useState({
    type: null,
    action: null,
  });
  const toggleModal = () => setIsModalOpen(prevState => !prevState);
  const hideModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) {
      setModalMetadata({
        type: null,
        action: null,
      });
      setCurrentMaterialCategory(defaultMaterialCategory);
    }
  }, [isModalOpen]);
  return (
    <>
      {/* This div will be displayed for over 1024px width */}
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto grid grid-rows-2 gap-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)]">
        <div>Materials</div>
        <div className="grid grid-cols-3">
          <MaterialCategoriesSection
            materialCategories={materialCategories}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentMaterial={setCurrentMaterialCategory}
            setItemToDelete={setItemToDelete}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          showModalSpinner={showModalSpinner}>
          {modalMetadata.action === "DELETE" ? (
            <DeleteModal
              toggleModal={toggleModal}
              itemToDelete={itemToDelete}
              deleteHandler={
                modalMetadata.type === "MATERIAL_CATEGORIES" &&
                deleteMaterialCategoryHandler
              }
            />
          ) : (
            modalMetadata.type == "MATERIAL_CATEGORIES" && (
              <MaterialCategoryModal
                addNewMaterialCategoryHandler={addNewMaterialCategoryHandler}
                currentMaterialCategory={currentMaterialCategory}
                currentMaterialCategoryInputHandler={
                  currentMaterialCategoryInputHandler
                }
                editMaterialCategoryHandler={editMaterialCategoryHandler}
                modalMetadata={modalMetadata}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default MaterialsClientPage;
