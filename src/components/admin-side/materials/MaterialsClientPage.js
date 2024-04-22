"use client";
import {
  DeleteModal,
  MaterialCategoriesSection,
  MaterialCategoryModal,
  MaterialModal,
  MaterialsSection,
  Modal,
  PropertiesSection,
  PropertyModal,
  ToggleViewButtonMobile,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import {
  addNewMaterialCategoryService,
  deleteMaterialCategoryService,
  editMaterialCategoryService,
} from "@/services/admin-side/materials/materialCategories";
import {
  addNewMaterialService,
  deleteMaterialService,
  editMaterialService,
} from "@/services/admin-side/materials/materials";
import {
  addNewPropertyService,
  deletePropertyService,
  editPropertyService,
} from "@/services/admin-side/materials/properties";
import { useEffect, useState } from "react";

const mobileButtonsData = [
  { text: "materials", name: "materials" },
  { text: "categories", name: "categories" },
  { text: "properties", name: "properties" },
];

const MaterialsClientPage = ({
  materials,
  materialCategories,
  cities,
  properties,
}) => {
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
    image1: null,
    image2: null,
    cities: [],
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
    deleteMaterialService(
      itemToDelete,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };

  // Material Category states and functions
  const defaultMaterialCategory = {
    id: null,
    name: "",
    image: null,
    coverImage: null,
    fixCoverImage: false,
    fixedMaterialId: null,
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

  // Properties states and functions
  const defaultProperty = {
    id: null,
    area: "",
    description: "",
    location: "",
    demand: "",
    city: cities[0]?.id || "",
    type: "LAND . PLOT",
  };
  const [currentProperty, setCurrentProperty] = useState(defaultProperty);
  const currentPropertyInputHandler = (name, value) => {
    setCurrentProperty(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewPropertyHandler = e => {
    e.preventDefault();
    addNewPropertyService(
      currentProperty,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const editPropertyHandler = e => {
    e.preventDefault();
    editPropertyService(
      currentProperty,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const deletePropertyHandler = e => {
    e.preventDefault();
    deletePropertyService(
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
      setCurrentProperty(defaultProperty);
    }
  }, [isModalOpen]);

  // Expandable Section Button (for mobile) states and functions
  const [expandedSection, setExpandedSection] = useState("materials");
  return (
    <>
      {/* This div will be displayed for over 1024px width */}
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto grid grid-rows-5 gap-4 h-page-container-admin xl:h-page-container-admin-xl lg:hidden">
        <MaterialsSection
          materials={materials}
          materialCategories={materialCategories}
          setModalMetadata={setModalMetadata}
          toggleModal={toggleModal}
          setCurrentMaterial={setCurrentMaterial}
          setItemToDelete={setItemToDelete}
          cities={cities}
        />
        <div className="grid grid-cols-3 row-span-2 gap-4">
          <MaterialCategoriesSection
            materialCategories={materialCategories}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentMaterialCategory={setCurrentMaterialCategory}
            setItemToDelete={setItemToDelete}
          />
          <PropertiesSection
            properties={properties}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentProperty={setCurrentProperty}
            setItemToDelete={setItemToDelete}
            cities={cities}
          />
        </div>
      </div>
      {/* for 0-1024 width, calc(100vh - (AdminHeader height + 3rem) - page header height) */}
      {/* This div will be displayed for up to 1024px width */}
      <div className="hidden lg:h-[calc(100vh-7rem-3rem)] lg:flex flex-col items-center justify-start gap-y-3 w-full mx-auto pt-4 sm:pt-2">
        <div className="flex flex-wrap justify-center gap-2">
          {mobileButtonsData?.map((buttonData, index) => (
            <ToggleViewButtonMobile
              key={index}
              text={buttonData.text}
              name={buttonData.name}
              expandedSection={expandedSection}
              setExpandedSection={setExpandedSection}
            />
          ))}
        </div>
        {expandedSection === "materials" ? (
          <MaterialsSection
            materials={materials}
            materialCategories={materialCategories}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentMaterial={setCurrentMaterial}
            setItemToDelete={setItemToDelete}
            cities={cities}
          />
        ) : expandedSection === "categories" ? (
          <MaterialCategoriesSection
            materialCategories={materialCategories}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentMaterialCategory={setCurrentMaterialCategory}
            setItemToDelete={setItemToDelete}
          />
        ) : (
          expandedSection === "properties" && (
            <PropertiesSection
              properties={properties}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentProperty={setCurrentProperty}
              setItemToDelete={setItemToDelete}
              cities={cities}
            />
          )
        )}
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
                  : modalMetadata.type === "MATERIAL_CATEGORIES"
                  ? deleteMaterialCategoryHandler
                  : modalMetadata.type === "PROPERTIES" && deletePropertyHandler
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
              cities={cities}
            />
          ) : modalMetadata.type === "MATERIAL_CATEGORIES" ? (
            <MaterialCategoryModal
              addNewMaterialCategoryHandler={addNewMaterialCategoryHandler}
              currentMaterialCategory={currentMaterialCategory}
              currentMaterialCategoryInputHandler={
                currentMaterialCategoryInputHandler
              }
              editMaterialCategoryHandler={editMaterialCategoryHandler}
              modalMetadata={modalMetadata}
            />
          ) : (
            modalMetadata.type === "PROPERTIES" && (
              <PropertyModal
                addNewPropertyHandler={addNewPropertyHandler}
                cities={cities}
                currentProperty={currentProperty}
                currentPropertyInputHandler={currentPropertyInputHandler}
                editPropertyHandler={editPropertyHandler}
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
