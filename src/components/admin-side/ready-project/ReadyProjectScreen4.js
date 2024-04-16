"use client";
import {
  AdminCustomSelect,
  AdminInputBox2,
  DeleteModal,
  FileInput,
  Modal,
  MultiFileInput,
  MultiImagesDisplay,
  ProductRatesSection,
  ProgramModal,
  ProgramSection,
  RPExteriorModal,
  RPExteriorSection,
  RPInteriorModal,
  RPInteriorSection,
  RPMaterialsSection,
  TagsInput,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { addEditProgramService } from "@/services/admin-side/free-project/programs";
import { addEditRPExteriorViewService } from "@/services/admin-side/ready-project/exteriorViews";
import { addEditRPInteriorViewService } from "@/services/admin-side/ready-project/interiorViews";
import { useEffect, useState } from "react";
import { ulid } from "ulid";
import getRPDesignsProductRates from "@/Firebase/admin-side/ready_project/getRPDesignsProductRates";

const ReadyProjectScreen4 = ({
  materials,
  rpDesignsData,
  readyProjectS4,
  readyProjectS4InputHandler,
  // productRatesData,
}) => {
  // UNDO
  const [productRatesData, setProductRatesData] = useState(null);
  useEffect(() => {
    getRPDesignsProductRates().then(data => setProductRatesData(data));
  }, []);

  const { showAlert } = useContext(AlertContext);
  const [currentDesignId, setCurrentDesignId] = useState(rpDesignsData[0].id);
  const [currentDesignState, setCurrentDesignState] = useState(null);

  useEffect(() => {
    setCurrentDesignState(readyProjectS4[currentDesignId]);
  }, [currentDesignId, readyProjectS4]);

  // Exterior states and functions
  const defaultExteriorView = {
    id: null,
    name: "",
    description: "",
    option: "OPTION1",
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
    // Calling the service
    const exteriorViewToAdd = addEditRPExteriorViewService(
      currentExteriorView,
      showAlert,
    );
    if (exteriorViewToAdd) {
      readyProjectS4InputHandler(currentDesignId, "exteriorViews", [
        ...currentDesignState?.exteriorViews,
        { ...exteriorViewToAdd, id: ulid() },
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Exterior view added.",
      });
      toggleModal();
    }
  };
  const editExteriorViewHandler = e => {
    e.preventDefault();
    // Calling the service
    const exteriorViewToEdit = addEditRPExteriorViewService(
      currentExteriorView,
      showAlert,
    );
    if (exteriorViewToEdit) {
      readyProjectS4InputHandler(currentDesignId, "exteriorViews", [
        exteriorViewToEdit,
        ...currentDesignState?.exteriorViews.filter(
          view => view.id !== exteriorViewToEdit.id,
        ),
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Exterior view updated.",
      });
      toggleModal();
    }
  };
  const deleteExteriorViewHandler = () => {
    readyProjectS4InputHandler(currentDesignId, "exteriorViews", [
      ...currentDesignState?.exteriorViews.filter(
        view => view.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Exterior view deleted.",
    });
    toggleModal();
  };

  // Interior states and functions
  const defaultInteriorView = {
    id: null,
    name: "",
    description: "",
    option: "OPTION1",
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
    // Calling the service
    const interiorViewToAdd = addEditRPInteriorViewService(
      currentInteriorView,
      showAlert,
    );
    if (interiorViewToAdd) {
      readyProjectS4InputHandler(currentDesignId, "interiorViews", [
        ...currentDesignState?.interiorViews,
        { ...interiorViewToAdd, id: ulid() },
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Interior view added.",
      });
      toggleModal();
    }
  };
  const editInteriorViewHandler = e => {
    e.preventDefault();
    // Calling the service
    const interiorViewToEdit = addEditRPInteriorViewService(
      currentInteriorView,
      showAlert,
    );
    if (interiorViewToEdit) {
      readyProjectS4InputHandler(currentDesignId, "interiorViews", [
        interiorViewToEdit,
        ...currentDesignState?.interiorViews.filter(
          view => view.id !== interiorViewToEdit.id,
        ),
      ]);
      showAlert({
        type: "SUCCESS",
        message: "Interior view updated.",
      });
      toggleModal();
    }
  };
  const deleteInteriorViewHandler = () => {
    readyProjectS4InputHandler(currentDesignId, "interiorViews", [
      ...currentDesignState?.interiorViews.filter(
        view => view.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Interior view deleted.",
    });
    toggleModal();
  };

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
      readyProjectS4InputHandler(currentDesignId, "programs", [
        ...currentDesignState?.programs,
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
      readyProjectS4InputHandler(currentDesignId, "programs", [
        programToEdit,
        ...currentDesignState?.programs.filter(
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
    readyProjectS4InputHandler(currentDesignId, "programs", [
      ...currentDesignState?.programs.filter(
        program => program.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Program deleted successfully.",
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
      setCurrentExteriorView(defaultExteriorView);
      setCurrentInteriorView(defaultInteriorView);
      setCurrentProgram(defaultProgram);
    }
  }, [isModalOpen]);

  return (
    <>
      <form
        className="h-full w-full max-w-8xl mx-auto py-4 pr-2 grid grid-cols-3 gap-8"
        onSubmit={e => e.preventDefault()}>
        {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height - 2rem) */}
        <div className="h-[calc(100vh-6rem-6rem-2rem)] flex flex-col gap-4">
          <AdminCustomSelect
            title="Select a Design"
            idHtmlFor="design"
            name="design"
            inputHandler={(_, value) => {
              setCurrentDesignId(value);
            }}
            selectedOption={currentDesignId}
            options={rpDesignsData.map(design => ({
              value: design.id,
              label: (
                <>
                  <span className="block">{design.area}</span>
                  <span className="block">{design.familyUnit} </span>
                  {design.floor.split(",").map((floor, index) => (
                    <span key={index} className="block">
                      {floor.trim()}
                    </span>
                  ))}
                </>
              ),
            }))}
          />
          <FileInput
            accept={"video/*"}
            name="video"
            htmlFor={"video"}
            idHtmlFor={"video"}
            message={"Attach a video"}
            typeStartsWith={"video"}
            inputHandler={(name, value) =>
              readyProjectS4InputHandler(currentDesignId, name, value)
            }
            wrongFileTypeWarning="Please attach a video."
            file={currentDesignState?.video}
            showPreview={true}
          />
          <AdminInputBox2
            label="Design cost"
            type="number"
            idHtmlFor="designCost"
            name="designCost"
            value={currentDesignState?.designCost}
            inputHandler={(name, value) =>
              readyProjectS4InputHandler(currentDesignId, name, value)
            }
            max={999999}
            required={true}
          />
          <AdminInputBox2
            label="construction cost"
            type="number"
            idHtmlFor="constructionCost"
            name="constructionCost"
            value={currentDesignState?.constructionCost}
            inputHandler={(name, value) =>
              readyProjectS4InputHandler(currentDesignId, name, value)
            }
            max={9999999}
            required={true}
          />
          <TagsInput
            label="Keywords"
            idHtmlFor="keywords"
            inputHandler={(name, value) =>
              readyProjectS4InputHandler(currentDesignId, name, value)
            }
            name="keywords"
            tagsArr={currentDesignState?.keywords}
            required={true}
          />
        </div>
        <div className="h-[calc(100vh-6rem-6rem-2rem)] grid grid-rows-2 gap-4">
          <div className="h-full grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="h-full overflow-y-hidden flex flex-col gap-2 lg:h-auto">
              <MultiFileInput
                className="h-full"
                message={"Attach images (option 1)"}
                filesArray={currentDesignState?.imagesOp1}
                accept={"image/*"}
                typeStartsWith={"image"}
                name="imagesOp1"
                htmlFor={"imagesOp1"}
                inputHandler={(name, value) =>
                  readyProjectS4InputHandler(currentDesignId, name, value)
                }
                wrongFileTypeWarning="Some of the files were not images and were not attached."
              />
              {currentDesignState?.imagesOp1?.length > 0 ? (
                <MultiImagesDisplay
                  className="h-full overflow-y-auto p-2"
                  imagesArray={currentDesignState?.imagesOp1}
                  removeImageHandler={(name, value) =>
                    readyProjectS4InputHandler(currentDesignId, name, value)
                  }
                  name={"imagesOp1"}
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                  <p>Option 1 images will be displayed here</p>
                </div>
              )}
            </div>
            <div className="h-full overflow-y-hidden flex flex-col gap-2 lg:h-auto">
              <MultiFileInput
                message={"Attach images (option 2)"}
                filesArray={currentDesignState?.imagesOp2}
                accept={"image/*"}
                typeStartsWith={"image"}
                name="imagesOp2"
                htmlFor={"imagesOp2"}
                inputHandler={(name, value) =>
                  readyProjectS4InputHandler(currentDesignId, name, value)
                }
                wrongFileTypeWarning="Some of the files were not images and were not attached."
              />
              {currentDesignState?.imagesOp2?.length > 0 ? (
                <MultiImagesDisplay
                  className="overflow-y-auto p-2"
                  imagesArray={currentDesignState?.imagesOp2}
                  removeImageHandler={(name, value) =>
                    readyProjectS4InputHandler(currentDesignId, name, value)
                  }
                  name={"imagesOp2"}
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                  <p>Option 2 images will be displayed here</p>
                </div>
              )}
            </div>
          </div>
          <ProgramSection
            className="h-full"
            programs={currentDesignState?.programs}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentProgram={setCurrentProgram}
            setItemToDelete={setItemToDelete}
          />
        </div>
        <ProductRatesSection productRatesData={productRatesData} />
        <div className="h-[calc(100vh-6rem-6rem-2rem)] grid grid-rows-3 gap-4">
          <AdminInputBox2
            type="textarea"
            label="Description"
            idHtmlFor="description"
            name="description"
            value={currentDesignState?.description}
            inputHandler={(name, value) =>
              readyProjectS4InputHandler(currentDesignId, name, value)
            }
            required={true}
            maxLength={150}
          />
          <AdminInputBox2
            type="textarea"
            label="option 1 description"
            idHtmlFor="descriptionOp1"
            name="descriptionOp1"
            value={currentDesignState?.descriptionOp1}
            inputHandler={(name, value) =>
              readyProjectS4InputHandler(currentDesignId, name, value)
            }
            required={true}
            maxLength={150}
          />
          <AdminInputBox2
            type="textarea"
            label="option 2 description"
            idHtmlFor="descriptionOp2"
            name="descriptionOp2"
            value={currentDesignState?.descriptionOp2}
            inputHandler={(name, value) =>
              readyProjectS4InputHandler(currentDesignId, name, value)
            }
            required={true}
            maxLength={150}
          />
        </div>
        <div className="h-[calc(100vh-6rem-6rem-2rem)] grid grid-rows-2 gap-4">
          <RPExteriorSection
            title={"Exterior Views"}
            exteriorViews={currentDesignState?.exteriorViews}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentExteriorView={setCurrentExteriorView}
            setItemToDelete={setItemToDelete}
          />
          <RPInteriorSection
            title={"Interior Views"}
            interiorViews={currentDesignState?.interiorViews}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentInteriorView={setCurrentInteriorView}
            setItemToDelete={setItemToDelete}
          />
        </div>
        <RPMaterialsSection
          className="h-[calc(100vh-6rem-6rem-2rem)]"
          title={"materials"}
          materials={materials}
          selectedMaterials={currentDesignState?.materials}
          inputHandler={(name, value) => {
            readyProjectS4InputHandler(currentDesignId, name, value);
          }}
        />
      </form>
      {isModalOpen && (
        <Modal toggleModal={toggleModal} isModalOpen={isModalOpen}>
          {modalMetadata.action === "DELETE" ? (
            <DeleteModal
              toggleModal={toggleModal}
              itemToDelete={itemToDelete}
              deleteHandler={
                modalMetadata.type === "EXTERIOR_VIEWS"
                  ? deleteExteriorViewHandler
                  : modalMetadata.type === "INTERIOR_VIEWS"
                  ? deleteInteriorViewHandler
                  : modalMetadata.type === "PROGRAMS" && deleteProgramHandler
              }
            />
          ) : modalMetadata.type === "EXTERIOR_VIEWS" ? (
            <RPExteriorModal
              currentExteriorView={currentExteriorView}
              currentExteriorViewInputHandler={currentExteriorViewInputHandler}
              addNewExteriorViewHandler={addNewExteriorViewHandler}
              editExteriorViewHandler={editExteriorViewHandler}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type === "INTERIOR_VIEWS" ? (
            <RPInteriorModal
              currentInteriorView={currentInteriorView}
              currentInteriorViewInputHandler={currentInteriorViewInputHandler}
              addNewInteriorViewHandler={addNewInteriorViewHandler}
              editInteriorViewHandler={editInteriorViewHandler}
              modalMetadata={modalMetadata}
            />
          ) : (
            modalMetadata.type === "PROGRAMS" && (
              <ProgramModal
                currentProgram={currentProgram}
                currentProgramInputHandler={currentProgramInputHandler}
                addNewProgramHandler={addNewProgramHandler}
                editProgramHandler={editProgramHandler}
                modalMetadata={modalMetadata}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default ReadyProjectScreen4;
