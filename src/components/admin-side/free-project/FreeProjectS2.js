"use client";
import {
  Button,
  FileInput,
  MultiFileInput,
  MultiFileDisplay,
  ExteriorSection,
  Modal,
  ExteriorModal,
  DeleteModal,
  InteriorSection,
  InteriorModal,
  MaterialsSection,
  MaterialsModal,
  ProgramSection,
  ProgramModal,
} from "@/components";
import { useContext, useEffect, useState } from "react";
import { addEditExteriorViewService } from "@/services/admin-side/free-project/exteriorViews";
import { addEditInteriorViewService } from "@/services/admin-side/free-project/interiorViews";
import { AlertContext } from "@/context/AlertContext";
import { ulid } from "ulid";
import { addEditMaterialService } from "@/services/admin-side/free-project/materials";
import { addEditProgramService } from "@/services/admin-side/free-project/programs";

const FreeProjectS2 = ({
  freeProjectS2InputHandler,
  addFreeProjectS2Handler,
  freeProjectS2,
}) => {
  const { showAlert } = useContext(AlertContext);
  // Program states and functions
  const defaultProgram = {
    id: null,
    category: "",
    quantity: 1,
    subCategories: [],
  };
  const [currentProgram, setCurrentProgram] = useState(defaultProgram);
  const currentProgramInputHandler = (e, name = null, value = null) => {
    setCurrentProgram({
      ...currentProgram,
      [name || e.target.name]: value || e.target.value,
    });
  };
  const addNewProgramHandler = e => {
    e.preventDefault();
    // Adding new program to the state
    const programToAdd = addEditProgramService(currentProgram, showAlert);
    if (programToAdd) {
      freeProjectS2InputHandler(null, "programs", [
        ...freeProjectS2.programs,
        { ...programToAdd, id: ulid() },
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Program added successfully.",
      });
      toggleModal();
    }
  };
  const editProgramHandler = e => {
    e.preventDefault();
    // Editing exterior view in the state
    const programToEdit = addEditProgramService(currentProgram, showAlert);
    if (programToEdit) {
      freeProjectS2InputHandler(null, "programs", [
        programToEdit,
        ...freeProjectS2.programs.filter(
          program => program.id !== programToEdit.id,
        ),
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Program updated successfully.",
      });
      toggleModal();
    }
  };
  const deleteProgramHandler = () => {
    freeProjectS2InputHandler(null, "programs", [
      ...freeProjectS2.programs.filter(
        program => program.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Program deleted successfully.",
    });
    toggleModal();
  };

  // Exterior states and functions
  const defaultExteriorView = {
    id: null,
    name: "",
    description: "",
    video: null,
  };
  const [currentExteriorView, setCurrentExteriorView] =
    useState(defaultExteriorView);
  const currentExteriorViewInputHandler = (e, name = null, value = null) => {
    setCurrentExteriorView({
      ...currentExteriorView,
      [name || e.target.name]: value || e.target.value,
    });
  };
  const addNewExteriorViewHandler = e => {
    e.preventDefault();
    // Adding new exterior view to the state
    const exteriorViewToAdd = addEditExteriorViewService(
      currentExteriorView,
      showAlert,
    );
    if (exteriorViewToAdd) {
      freeProjectS2InputHandler(null, "exteriorViews", [
        ...freeProjectS2.exteriorViews,
        { ...exteriorViewToAdd, id: ulid() },
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Exterior view added successfully.",
      });
      toggleModal();
    }
  };
  const editExteriorViewHandler = e => {
    e.preventDefault();
    // Editing exterior view in the state
    const exteriorViewToEdit = addEditExteriorViewService(
      currentExteriorView,
      showAlert,
    );
    if (exteriorViewToEdit) {
      freeProjectS2InputHandler(null, "exteriorViews", [
        exteriorViewToEdit,
        ...freeProjectS2.exteriorViews.filter(
          view => view.id !== exteriorViewToEdit.id,
        ),
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Exterior view updated successfully.",
      });
      toggleModal();
    }
  };
  const deleteExteriorViewHandler = () => {
    freeProjectS2InputHandler(null, "exteriorViews", [
      ...freeProjectS2.exteriorViews.filter(
        view => view.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Exterior view deleted successfully.",
    });
    toggleModal();
  };

  // Interior states and functions
  const defaultInteriorView = {
    id: null,
    name: "",
    description: "",
    video: null,
  };
  const [currentInteriorView, setCurrentInteriorView] =
    useState(defaultInteriorView);
  const currentInteriorViewInputHandler = (e, name = null, value = null) => {
    setCurrentInteriorView({
      ...currentInteriorView,
      [name || e.target.name]: value || e.target.value,
    });
  };
  const addNewInteriorViewHandler = e => {
    e.preventDefault();
    // Adding new interior view to the state
    const interiorViewToAdd = addEditInteriorViewService(
      currentInteriorView,
      showAlert,
    );
    if (interiorViewToAdd) {
      freeProjectS2InputHandler(null, "interiorViews", [
        ...freeProjectS2.interiorViews,
        { ...interiorViewToAdd, id: ulid() },
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Interior view added successfully.",
      });
      toggleModal();
    }
  };
  const editInteriorViewHandler = e => {
    e.preventDefault();
    // Editing interior view in the state
    const interiorViewToEdit = addEditInteriorViewService(
      currentInteriorView,
      showAlert,
    );
    if (interiorViewToEdit) {
      freeProjectS2InputHandler(null, "interiorViews", [
        interiorViewToEdit,
        ...freeProjectS2.interiorViews.filter(
          view => view.id !== interiorViewToEdit.id,
        ),
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Interior view updated successfully.",
      });
      toggleModal();
    }
  };
  const deleteInteriorViewHandler = () => {
    freeProjectS2InputHandler(null, "interiorViews", [
      ...freeProjectS2.interiorViews.filter(
        view => view.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Interior view deleted successfully.",
    });
    toggleModal();
  };

  // Materials states and functions
  const defaultMaterial = {
    id: null,
    name: "",
    vendor: "",
    rate: 0,
    image: null,
  };
  const [currentMaterial, setCurrentMaterial] = useState(defaultMaterial);
  const currentMaterialInputHandler = (e, name = null, value = null) => {
    setCurrentMaterial({
      ...currentMaterial,
      [name || e.target.name]: value || e.target.value,
    });
  };
  const addNewMaterialHandler = e => {
    e.preventDefault();
    // Adding new material to the state
    const materialToAdd = addEditMaterialService(currentMaterial, showAlert);
    if (materialToAdd) {
      freeProjectS2InputHandler(null, "materials", [
        ...freeProjectS2.materials,
        { ...materialToAdd, id: ulid() },
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Material added successfully.",
      });
      toggleModal();
    }
  };
  const editMaterialHandler = e => {
    e.preventDefault();
    // Editing material in the state
    const materialToEdit = addEditMaterialService(currentMaterial, showAlert);
    console.log(materialToEdit);
    if (materialToEdit) {
      freeProjectS2InputHandler(null, "materials", [
        materialToEdit,
        ...freeProjectS2.materials.filter(
          material => material.id !== materialToEdit.id,
        ),
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Material updated successfully.",
      });
      toggleModal();
    }
  };
  const deleteMaterialHandler = () => {
    freeProjectS2InputHandler(null, "materials", [
      ...freeProjectS2.materials.filter(
        material => material.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Material deleted successfully.",
    });
    toggleModal();
  };

  // General state for deleting items
  const defaultItemToDelete = {
    name: null,
    id: null,
  };
  const [itemToDelete, setItemToDelete] = useState(defaultItemToDelete);

  // Modal states and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMetadata, setModalMetadata] = useState({
    type: null,
    action: null,
  });
  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  useEffect(() => {
    if (!isModalOpen) {
      setModalMetadata({
        type: null,
        action: null,
      });
      setCurrentProgram(defaultProgram);
      setCurrentExteriorView(defaultExteriorView);
      setCurrentInteriorView(defaultInteriorView);
      setCurrentMaterial(defaultMaterial);
    }
  }, [isModalOpen]);

  return (
    <>
      <form className="h-full flex gap-4 w-full max-w-7xl mx-auto pr-2">
        <div className="h-full w-full grid grid-cols-2 gap-4">
          <div>
            <FileInput
              file={freeProjectS2.designFile}
              message={"Attach design file"}
              accept={"application/pdf"}
              typeStartsWith={"application/pdf"}
              inputHandler={freeProjectS2InputHandler}
              name="designFile"
              htmlFor={"designFile"}
              wrongFileTypeWarning="Please attach a pdf file."
            />
            <div>
              <MultiFileInput
                message={"Attach images"}
                filesArray={freeProjectS2.images}
                accept={"image/*"}
                typeStartsWith={"image"}
                name="images"
                htmlFor={"images"}
                inputHandler={freeProjectS2InputHandler}
                wrongFileTypeWarning="Some of the files were not images and were not attached."
              />
              <MultiFileDisplay
                filesArray={freeProjectS2.images}
                removeFileHandler={freeProjectS2InputHandler}
              />
            </div>
            <ProgramSection
              programs={freeProjectS2.programs}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentProgram={setCurrentProgram}
              setItemToDelete={setItemToDelete}
            />
          </div>
          <div className="h-full overflow-hidden grid grid-rows-3 gap-4">
            <ExteriorSection
              exteriorViews={freeProjectS2.exteriorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentExteriorView={setCurrentExteriorView}
              setItemToDelete={setItemToDelete}
            />
            <InteriorSection
              interiorViews={freeProjectS2.interiorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentInteriorView={setCurrentInteriorView}
              setItemToDelete={setItemToDelete}
            />
            <MaterialsSection
              materials={freeProjectS2.materials}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentMaterial={setCurrentMaterial}
              setItemToDelete={setItemToDelete}
            />
          </div>
        </div>
        <Button
          type="button"
          text="Upload"
          isTransitioned={true}
          className="block ml-auto self-end"
          onClick={addFreeProjectS2Handler}
        />
      </form>
      {isModalOpen && (
        <Modal toggleModal={toggleModal} isModalOpen={isModalOpen}>
          {modalMetadata.action === "DELETE" ? (
            <DeleteModal
              toggleModal={toggleModal}
              itemToDelete={itemToDelete}
              deleteHandler={
                modalMetadata.type === "PROGRAMS"
                  ? deleteProgramHandler
                  : modalMetadata.type === "EXTERIOR_VIEWS"
                  ? deleteExteriorViewHandler
                  : modalMetadata.type === "INTERIOR_VIEWS"
                  ? deleteInteriorViewHandler
                  : modalMetadata.type === "MATERIALS" && deleteMaterialHandler
              }
            />
          ) : modalMetadata.type == "PROGRAMS" ? (
            <ProgramModal
              currentProgram={currentProgram}
              currentProgramInputHandler={currentProgramInputHandler}
              addNewProgramHandler={addNewProgramHandler}
              editProgramHandler={editProgramHandler}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type == "EXTERIOR_VIEWS" ? (
            <ExteriorModal
              currentExteriorView={currentExteriorView}
              currentExteriorViewInputHandler={currentExteriorViewInputHandler}
              addNewExteriorViewHandler={addNewExteriorViewHandler}
              editExteriorViewHandler={editExteriorViewHandler}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type == "INTERIOR_VIEWS" ? (
            <InteriorModal
              currentInteriorView={currentInteriorView}
              currentInteriorViewInputHandler={currentInteriorViewInputHandler}
              addNewInteriorViewHandler={addNewInteriorViewHandler}
              editInteriorViewHandler={editInteriorViewHandler}
              modalMetadata={modalMetadata}
            />
          ) : (
            modalMetadata.type == "MATERIALS" && (
              <MaterialsModal
                currentMaterial={currentMaterial}
                currentMaterialInputHandler={currentMaterialInputHandler}
                addNewMaterialHandler={addNewMaterialHandler}
                editMaterialHandler={editMaterialHandler}
                modalMetadata={modalMetadata}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default FreeProjectS2;
