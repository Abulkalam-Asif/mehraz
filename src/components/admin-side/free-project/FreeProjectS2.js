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
  FreeProjectMaterialsSection,
  MaterialsModal,
  ProgramSection,
  ProgramModal,
  ToggleViewButtonMobile,
} from "@/components";
import { useEffect, useState } from "react";
import { addEditExteriorViewService } from "@/services/admin-side/free-project/exteriorViews";
import { addEditInteriorViewService } from "@/services/admin-side/free-project/interiorViews";
import { ulid } from "ulid";
import { addEditMaterialService } from "@/services/admin-side/free-project/materials";
import { addEditProgramService } from "@/services/admin-side/free-project/programs";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const mobileButtonsData = [
  { text: "design and images", name: "files" },
  { text: "programs", name: "programs" },
  { text: "exterior views", name: "exterior" },
  { text: "interior views", name: "interior" },
  { text: "materials", name: "materials" },
];

const FreeProjectS2 = ({
  freeProjectS2InputHandler,
  addFreeProjectS2Handler,
  freeProjectS2,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [expandedSection, setExpandedSection] = useState(null);

  // Program states and functions
  const defaultProgram = {
    id: null,
    category: "",
    quantity: 1,
    subCategories: [],
  };
  const [currentProgram, setCurrentProgram] = useState(defaultProgram);
  const currentProgramInputHandler = (name, value) => {
    setCurrentProgram({
      ...currentProgram,
      [name]: value,
    });
  };
  const addNewProgramHandler = e => {
    e.preventDefault();
    // Adding new program to the state
    const programToAdd = addEditProgramService(currentProgram, showAlert);
    if (programToAdd) {
      freeProjectS2InputHandler("programs", [
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
      freeProjectS2InputHandler("programs", [
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
    freeProjectS2InputHandler("programs", [
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
  const currentExteriorViewInputHandler = (name, value) => {
    setCurrentExteriorView({
      ...currentExteriorView,
      [name]: value,
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
      freeProjectS2InputHandler("exteriorViews", [
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
      freeProjectS2InputHandler("exteriorViews", [
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
    freeProjectS2InputHandler("exteriorViews", [
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
  const currentInteriorViewInputHandler = (name, value) => {
    setCurrentInteriorView({
      ...currentInteriorView,
      [name]: value,
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
      freeProjectS2InputHandler("interiorViews", [
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
      freeProjectS2InputHandler("interiorViews", [
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
    freeProjectS2InputHandler("interiorViews", [
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
  const currentMaterialInputHandler = (name, value) => {
    setCurrentMaterial({
      ...currentMaterial,
      [name]: value,
    });
  };
  const addNewMaterialHandler = e => {
    e.preventDefault();
    // Adding new material to the state
    const materialToAdd = addEditMaterialService(currentMaterial, showAlert);
    if (materialToAdd) {
      freeProjectS2InputHandler("materials", [
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
    if (materialToEdit) {
      freeProjectS2InputHandler("materials", [
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
    freeProjectS2InputHandler("materials", [
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
      <form
        className="flex gap-4 w-full max-w-7xl mx-auto pr-2"
        onSubmit={e => e.preventDefault()}>
        {/* This div will be displayed for over 1024px width */}
        <div className="w-full grid grid-cols-2 gap-4 lg:hidden">
          <div className="overflow-hidden grid grid-rows-2 gap-4">
            <div className="flex flex-col gap-4">
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
              {freeProjectS2.images?.length > 0 ? (
                <MultiFileDisplay
                  className="overflow-y-auto p-2"
                  filesArray={freeProjectS2.images}
                  removeFileHandler={freeProjectS2InputHandler}
                  name={"images"}
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                  <p>Attached images will be listed here</p>
                </div>
              )}
            </div>
            <ProgramSection
              programs={freeProjectS2.programs}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentProgram={setCurrentProgram}
              setItemToDelete={setItemToDelete}
            />
          </div>
          <div className="overflow-hidden grid grid-rows-3 gap-4">
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
            <FreeProjectMaterialsSection
              materials={freeProjectS2.materials}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentMaterial={setCurrentMaterial}
              setItemToDelete={setItemToDelete}
            />
          </div>
        </div>
        {/* This div will be displayed for up to 1024px width */}
        <div className="hidden lg:h-[calc(100vh-7rem-3rem)] lg:flex flex-col items-center justify-start gap-y-3 pt-4 mx-auto sm:pt-2">
          <div className="flex gap-4">
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
            <Button
              type="button"
              text="Upload"
              isTransitioned={true}
              className="hidden lg:block ml-auto self-start"
              onClick={addFreeProjectS2Handler}
            />
          </div>
          {expandedSection === "files" ? (
            <div className="w-full flex flex-col gap-4 overflow-y-auto">
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
              {freeProjectS2.images?.length > 0 ? (
                <MultiFileDisplay
                  className="overflow-y-auto p-2"
                  filesArray={freeProjectS2.images}
                  removeFileHandler={freeProjectS2InputHandler}
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                  <p>Attached images will be listed here</p>
                </div>
              )}
            </div>
          ) : expandedSection === "programs" ? (
            <ProgramSection
              programs={freeProjectS2.programs}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentProgram={setCurrentProgram}
              setItemToDelete={setItemToDelete}
            />
          ) : expandedSection === "exterior" ? (
            <ExteriorSection
              exteriorViews={freeProjectS2.exteriorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentExteriorView={setCurrentExteriorView}
              setItemToDelete={setItemToDelete}
            />
          ) : expandedSection === "interior" ? (
            <InteriorSection
              interiorViews={freeProjectS2.interiorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentInteriorView={setCurrentInteriorView}
              setItemToDelete={setItemToDelete}
            />
          ) : (
            expandedSection === "materials" && (
              <FreeProjectMaterialsSection
                materials={freeProjectS2.materials}
                setModalMetadata={setModalMetadata}
                toggleModal={toggleModal}
                setCurrentMaterial={setCurrentMaterial}
                setItemToDelete={setItemToDelete}
              />
            )
          )}
        </div>
        <Button
          type="button"
          text="Upload"
          isTransitioned={true}
          className="lg:hidden block ml-auto self-end"
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
          ) : modalMetadata.type === "PROGRAMS" ? (
            <ProgramModal
              currentProgram={currentProgram}
              currentProgramInputHandler={currentProgramInputHandler}
              addNewProgramHandler={addNewProgramHandler}
              editProgramHandler={editProgramHandler}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type === "EXTERIOR_VIEWS" ? (
            <ExteriorModal
              currentExteriorView={currentExteriorView}
              currentExteriorViewInputHandler={currentExteriorViewInputHandler}
              addNewExteriorViewHandler={addNewExteriorViewHandler}
              editExteriorViewHandler={editExteriorViewHandler}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type === "INTERIOR_VIEWS" ? (
            <InteriorModal
              currentInteriorView={currentInteriorView}
              currentInteriorViewInputHandler={currentInteriorViewInputHandler}
              addNewInteriorViewHandler={addNewInteriorViewHandler}
              editInteriorViewHandler={editInteriorViewHandler}
              modalMetadata={modalMetadata}
            />
          ) : (
            modalMetadata.type === "MATERIALS" && (
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
