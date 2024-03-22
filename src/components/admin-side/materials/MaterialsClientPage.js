"use client";
import {
  DeleteModal,
  MaterialCategoriesSection,
  MaterialCategoryModal,
  MaterialModal,
  MaterialsSection,
  Modal,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";
import {
  addNewMaterialCategoryService,
  deleteMaterialCategoryService,
  editMaterialCategoryService,
} from "@/services/admin-side/materials/materialCategories";
import {
  addNewMaterialService,
  editMaterialService,
} from "@/services/admin-side/materials/materials";
import { useContext, useEffect, useState } from "react";

const MaterialsClientPage = ({ materials, materialCategories }) => {
  const { showAlert } = useContext(AlertContext);
  // Materials states and functions
  const defaultMaterial = {
    id: null,
    isFixed: false,
    name: "",
    vendor: "",
    rate: 0,
    category: materialCategories[0]?.id || "",
    description: "",
    specs: ["", "", ""],
    orderedAs: "",
    image: null,
    cover: null,
    displayCover: false,
    usage: {
      projects: 0,
    },
  };
  const [currentMaterial, setCurrentMaterial] = useState(defaultMaterial);
  const currentMaterialInputHandler = (name, value) => {
    setCurrentMaterial(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addNewMaterialHandler = e => {
    e.preventDefault();
    addNewMaterialService(
      materials,
      currentMaterial,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const editMaterialHandler = e => {
    e.preventDefault();
    editMaterialService(
      materials,
      currentMaterial,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const deleteMaterialHandler = e => {
    e.preventDefault();
  };

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
  const currentMaterialCategoryInputHandler = (name, value) => {
    setCurrentMaterialCategory(prevState => ({
      ...prevState,
      [name]: value,
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
      setCurrentMaterial(defaultMaterial);
      setCurrentMaterialCategory(defaultMaterialCategory);
    }
  }, [isModalOpen]);
  return (
    <>
      {/* This div will be displayed for over 1024px width */}
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto grid grid-rows-5 gap-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)]">
        <MaterialsSection
          materials={materials}
          materialCategories={materialCategories}
          setModalMetadata={setModalMetadata}
          toggleModal={toggleModal}
          setCurrentMaterial={setCurrentMaterial}
          setItemToDelete={setItemToDelete}
        />
        <div className="grid grid-cols-3 row-span-2">
          <MaterialCategoriesSection
            materialCategories={materialCategories}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentMaterialCategory={setCurrentMaterialCategory}
            setItemToDelete={setItemToDelete}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          maxWidth={
            modalMetadata.type === "MATERIALS" ? "max-w-2xl" : "max-w-lg"
          }
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          showModalSpinner={showModalSpinner}>
          {modalMetadata.action === "DELETE" ? (
            <DeleteModal
              toggleModal={toggleModal}
              itemToDelete={itemToDelete}
              deleteHandler={
                modalMetadata.type === "MATERIALS"
                  ? deleteMaterialHandler
                  : modalMetadata.type === "MATERIAL_CATEGORIES" &&
                    deleteMaterialCategoryHandler
              }
            />
          ) : modalMetadata.type === "MATERIALS" ? (
            <MaterialModal
              addNewMaterialHandler={addNewMaterialHandler}
              materialCategories={materialCategories}
              currentMaterial={currentMaterial}
              currentMaterialInputHandler={currentMaterialInputHandler}
              editMaterialHandler={editMaterialHandler}
              modalMetadata={modalMetadata}
            />
          ) : (
            modalMetadata.type === "MATERIAL_CATEGORIES" && (
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
