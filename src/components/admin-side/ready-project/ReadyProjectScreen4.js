"use client";
import {
  RPSelect,
  AdminInputBox2,
  DeleteModal,
  FileInput,
  Modal,
  MultiFileInput,
  RPMultiImageDisplay,
  ProductRatesSection,
  ProgramModal,
  ProgramSection,
  RPExteriorModal,
  RPExteriorSection,
  RPInteriorModal,
  RPInteriorSection,
  RPMaterialsSection,
  TagsInput,
  Button,
  Spinner,
  ConfirmationModal,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { addEditProgramService } from "@/services/admin-side/free-project/programs";
import { addEditRPExteriorViewService } from "@/services/admin-side/ready-project/exteriorViews";
import { addEditRPInteriorViewService } from "@/services/admin-side/ready-project/interiorViews";
import { useEffect, useState } from "react";
import { ulid } from "ulid";
import getCurrentRPDesign from "@/Firebase/admin-side/ready_project/getFunctions/getCurrentRPDesign";

const ReadyProjectScreen4 = ({
  materials,
  rpDesignsData,
  readyProjectS4Design,
  readyProjectS4InputHandler,
  setReadyProjectS4Design,
  uploadedDesigns,
  productRates,
  addReadyProjectS4DesignHandler,
  updateReadyProjectS4DesignHandler,
  defaultReadyProjectS4Design,
  isErrorOccurredWhileFetching,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [currentDesign, setCurrentDesign] = useState(rpDesignsData[0]);
  const [showFetchSpinner, setShowFetchSpinner] = useState(true);

  const fetchCurrentDesign = async () => {
    try {
      const currentRPDesign = await getCurrentRPDesign(currentDesign.id);
      setReadyProjectS4Design({
        ...currentRPDesign,
        isInDefaultState: true,
      });
      if (!productRates || productRates.length === 0) {
        setReadyProjectS4Design(prevState => ({
          ...prevState,
          designRates: [],
          constructionRates: [],
        }));
      }
    } catch (error) {
      showAlert({
        type: "ERROR",
        message: error.message,
      });
    } finally {
      setShowFetchSpinner(false);
    }
  };

  useEffect(() => {
    // Checking if the required data is fetched successfully
    console.log(rpDesignsData, uploadedDesigns);
    if (isErrorOccurredWhileFetching) {
      showAlert({
        type: "ERROR",
        message:
          "An error occurred while fetching data. Please check your internet connection and try again.",
      });
    } else if (materials?.length === 0 || productRates?.length === 0) {
      showAlert({
        type: "ERROR",
        message: "Please upload the missing data first.",
      });
    }

    if (uploadedDesigns?.includes(currentDesign.id)) {
      setShowFetchSpinner(true);
      fetchCurrentDesign();
    } else {
      const updatedProductRates =
        productRates?.map(productRate => ({
          ...productRate,
          cost: Math.round(productRate.rate * currentDesign.areaInSqFt),
        })) || [];
      const totalCost = Math.round(
        updatedProductRates.reduce((acc, rate) => {
          return acc + rate.cost;
        }, 0) *
          (1 - readyProjectS4Design.discount / 100),
      );

      setReadyProjectS4Design({
        ...defaultReadyProjectS4Design,
        totalCost,
        designRates: updatedProductRates.filter(rate => rate.type === "DESIGN"),
        constructionRates: updatedProductRates.filter(
          rate => rate.type === "CONSTRUCTION",
        ),
      });
      setShowFetchSpinner(false);
    }
  }, [currentDesign]);

  // Exterior states and functions
  const defaultExteriorView = {
    id: null,
    name: "",
    description: "",
    option: "OPTION1",
    video: null,
    isUploaded: false,
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
      readyProjectS4InputHandler("exteriorViews", [
        ...readyProjectS4Design?.exteriorViews,
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
      readyProjectS4InputHandler("exteriorViews", [
        exteriorViewToEdit,
        ...readyProjectS4Design?.exteriorViews.filter(
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
    const isUploaded = readyProjectS4Design.exteriorViews.find(
      view => view.id === itemToDelete.id,
    );
    if (isUploaded) {
      if (typeof readyProjectS4Design?.viewsToDelIds === "object") {
        readyProjectS4InputHandler("viewsToDelIds", [
          ...readyProjectS4Design?.viewsToDelIds,
          itemToDelete.id,
        ]);
      } else {
        readyProjectS4InputHandler("viewsToDelIds", [itemToDelete.id]);
      }
    }
    readyProjectS4InputHandler("exteriorViews", [
      ...readyProjectS4Design?.exteriorViews.filter(
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
    isUploaded: false,
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
      readyProjectS4InputHandler("interiorViews", [
        ...readyProjectS4Design?.interiorViews,
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
      readyProjectS4InputHandler("interiorViews", [
        interiorViewToEdit,
        ...readyProjectS4Design?.interiorViews.filter(
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
    const isUploaded = readyProjectS4Design.interiorViews.find(
      view => view.id === itemToDelete.id,
    );
    if (isUploaded) {
      if (typeof readyProjectS4Design?.viewsToDelIds === "object") {
        readyProjectS4InputHandler("viewsToDelIds", [
          ...readyProjectS4Design?.viewsToDelIds,
          itemToDelete.id,
        ]);
      } else {
        readyProjectS4InputHandler("viewsToDelIds", [itemToDelete.id]);
      }
    }
    readyProjectS4InputHandler("interiorViews", [
      ...readyProjectS4Design?.interiorViews.filter(
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
    isUploaded: false,
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
      readyProjectS4InputHandler("programs", [
        ...readyProjectS4Design?.programs,
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
      readyProjectS4InputHandler("programs", [
        programToEdit,
        ...readyProjectS4Design?.programs.filter(
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
    const isUploaded = readyProjectS4Design.programs.find(
      program => program.id === itemToDelete.id,
    );
    if (isUploaded) {
      if (typeof readyProjectS4Design?.programsToDelIds === "object") {
        readyProjectS4InputHandler("programsToDelIds", [
          ...readyProjectS4Design?.programsToDelIds,
          itemToDelete.id,
        ]);
      } else {
        readyProjectS4InputHandler("programsToDelIds", [itemToDelete.id]);
      }
    }
    readyProjectS4InputHandler("programs", [
      ...readyProjectS4Design?.programs.filter(
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

  // Design select handler. If the user tries to change an unsaved design, a confirmation modal will appear
  const designSelectHandler = value => {
    if (!readyProjectS4Design.isInDefaultState) {
      setConfirmationModalMetadata({
        confirmationMessage:
          "If you change the design, the unsaved data will be lost. Do you want to proceed?",
        confirmationHandler: () => {
          setCurrentDesign(rpDesignsData.find(design => design.id === value));
        },
      });
      toggleConfirmationModal();
    } else {
      setCurrentDesign(rpDesignsData.find(design => design.id === value));
    }
  };

  // Confirmation modal states and functions
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(prevState => !prevState);
  const [confirmationModalMetadata, setConfirmationModalMetadata] = useState({
    confirmationMessage: "",
    confirmationHandler: () => {},
  });

  return showFetchSpinner ? (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <Spinner size={"lg"} text={"Fetching data..."} />
    </div>
  ) : (
    <>
      <form
        className="h-full w-full max-w-8xl mx-auto py-4 pr-2 grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 md:h-auto gap-8"
        onSubmit={e => e.preventDefault()}>
        <div className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0 flex flex-col gap-4 overflow-y-auto pr-1">
          <RPSelect
            title="Select a Design"
            idHtmlFor="design"
            name="design"
            designSelectHandler={designSelectHandler}
            uploadedDesigns={uploadedDesigns}
            selectedOption={currentDesign?.id}
            options={rpDesignsData.map(design => ({
              value: design.id,
              label: (
                <>
                  <span>{design.area}</span>
                  <span>{design.familyUnit} </span>
                  {design.floor.split(",").map((floor, index) => (
                    <span key={index}>{floor.trim()}</span>
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
            inputHandler={readyProjectS4InputHandler}
            wrongFileTypeWarning="Please attach a video."
            file={readyProjectS4Design?.video}
            showPreview={true}
          />
          <AdminInputBox2
            label="Design cost"
            type="text"
            idHtmlFor="designCost"
            name="designCost"
            value={readyProjectS4Design?.designCost}
            inputHandler={readyProjectS4InputHandler}
            maxLength={15}
            required={true}
          />
          <AdminInputBox2
            label="Construction cost"
            type="text"
            idHtmlFor="constructionCost"
            name="constructionCost"
            value={readyProjectS4Design?.constructionCost}
            inputHandler={readyProjectS4InputHandler}
            maxLength={15}
            required={true}
          />
          <TagsInput
            label="Keywords"
            idHtmlFor="keywords"
            inputHandler={readyProjectS4InputHandler}
            name="keywords"
            tagsArr={readyProjectS4Design?.keywords}
            required={true}
          />
          <AdminInputBox2
            label="option 1"
            idHtmlFor="op1Name"
            name="op1Name"
            value={readyProjectS4Design?.op1Name}
            inputHandler={readyProjectS4InputHandler}
            maxLength={18}
            required={true}
          />
          <AdminInputBox2
            label="option 2"
            idHtmlFor="op2Name"
            name="op2Name"
            value={readyProjectS4Design?.op2Name}
            inputHandler={readyProjectS4InputHandler}
            maxLength={18}
            required={true}
          />
        </div>
        <div className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0 grid grid-rows-2 gap-4">
          <div className="h-full grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="h-full overflow-y-hidden flex flex-col gap-2 lg:h-auto">
              <MultiFileInput
                className="h-full"
                message={"Attach images (option 1)"}
                filesArray={readyProjectS4Design?.imagesOp1}
                accept={"image/*"}
                typeStartsWith={"image"}
                name="imagesOp1"
                htmlFor={"imagesOp1"}
                inputHandler={readyProjectS4InputHandler}
                wrongFileTypeWarning="Some of the files were not images and were not attached."
              />
              {readyProjectS4Design?.imagesOp1?.length > 0 ? (
                <RPMultiImageDisplay
                  className="md:h-32 overflow-y-auto p-2"
                  imagesArray={readyProjectS4Design?.imagesOp1}
                  name={"imagesOp1"}
                  removeImageHandler={(name, newFilesArray, deletedImage) => {
                    if (deletedImage) {
                      if (
                        typeof readyProjectS4Design?.imagesOp1ToDel === "object"
                      ) {
                        // If there is an array of images to delete, add the new image to it
                        readyProjectS4InputHandler("imagesOp1ToDel", [
                          ...readyProjectS4Design?.imagesOp1ToDel,
                          deletedImage,
                        ]);
                      } else {
                        // If there is no array of images to delete, create one with the new image
                        readyProjectS4InputHandler("imagesOp1ToDel", [
                          deletedImage,
                        ]);
                      }
                    }
                    readyProjectS4InputHandler(name, newFilesArray);
                  }}
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl md:h-32">
                  <p>Option 1 images will be displayed here</p>
                </div>
              )}
            </div>
            <div className="h-full overflow-y-hidden flex flex-col gap-2 lg:h-auto">
              <MultiFileInput
                className="h-full"
                message={"Attach images (option 2)"}
                filesArray={readyProjectS4Design?.imagesOp2}
                accept={"image/*"}
                typeStartsWith={"image"}
                name="imagesOp2"
                htmlFor={"imagesOp2"}
                inputHandler={readyProjectS4InputHandler}
                wrongFileTypeWarning="Some of the files were not images and were not attached."
              />
              {readyProjectS4Design?.imagesOp2?.length > 0 ? (
                <RPMultiImageDisplay
                  className="md:h-32 overflow-y-auto p-2"
                  imagesArray={readyProjectS4Design?.imagesOp2}
                  name={"imagesOp2"}
                  removeImageHandler={(name, newFilesArray, deletedImage) => {
                    if (deletedImage) {
                      if (
                        typeof readyProjectS4Design?.imagesOp2ToDel === "object"
                      ) {
                        // If there is an array of images to delete, add the new image to it
                        readyProjectS4InputHandler("imagesOp2ToDel", [
                          ...readyProjectS4Design?.imagesOp2ToDel,
                          deletedImage,
                        ]);
                      } else {
                        // If there is no array of images to delete, create one with the new image
                        readyProjectS4InputHandler("imagesOp2ToDel", [
                          deletedImage,
                        ]);
                      }
                    }
                    readyProjectS4InputHandler(name, newFilesArray);
                  }}
                />
              ) : (
                <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl md:h-32">
                  <p>Option 2 images will be displayed here</p>
                </div>
              )}
            </div>
          </div>
          <ProgramSection
            className="h-full"
            programs={readyProjectS4Design?.programs}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentProgram={setCurrentProgram}
            setItemToDelete={setItemToDelete}
          />
        </div>
        <div className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0 grid grid-rows-3 gap-4">
          <AdminInputBox2
            type="textarea"
            label="Description"
            idHtmlFor="description"
            name="description"
            value={readyProjectS4Design?.description}
            inputHandler={readyProjectS4InputHandler}
            required={true}
            maxLength={150}
          />
          <AdminInputBox2
            type="textarea"
            label="option 1 description"
            idHtmlFor="descriptionOp1"
            name="descriptionOp1"
            value={readyProjectS4Design?.descriptionOp1}
            inputHandler={readyProjectS4InputHandler}
            required={true}
            maxLength={150}
          />
          <AdminInputBox2
            type="textarea"
            label="option 2 description"
            idHtmlFor="descriptionOp2"
            name="descriptionOp2"
            value={readyProjectS4Design?.descriptionOp2}
            inputHandler={readyProjectS4InputHandler}
            required={true}
            maxLength={150}
          />
        </div>
        <div className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0 grid grid-rows-2 gap-4">
          <RPExteriorSection
            title={"Exterior Views"}
            exteriorViews={readyProjectS4Design?.exteriorViews}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentExteriorView={setCurrentExteriorView}
            setItemToDelete={setItemToDelete}
          />
          <RPInteriorSection
            title={"Interior Views"}
            interiorViews={readyProjectS4Design?.interiorViews}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentInteriorView={setCurrentInteriorView}
            setItemToDelete={setItemToDelete}
          />
        </div>
        <RPMaterialsSection
          className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0"
          title={"materials"}
          materials={materials}
          selectedMaterials={readyProjectS4Design?.materials}
          inputHandler={(name, value) => {
            readyProjectS4InputHandler(name, value);
          }}
          isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
        />
        <ProductRatesSection
          className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0"
          designRates={readyProjectS4Design.designRates}
          constructionRates={readyProjectS4Design.constructionRates}
          readyProjectS4InputHandler={readyProjectS4InputHandler}
          currentDesignAreaInSqFt={currentDesign.areaInSqFt}
          discount={readyProjectS4Design.discount}
          totalCost={readyProjectS4Design.totalCost}
          isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
        />
        <div className="flex items-center justify-end gap-4 col-start-3 lg:col-start-2 md:col-start-1">
          <Button
            type="button"
            text="upload design"
            isTransitioned={true}
            onClick={() => {
              uploadedDesigns?.includes(currentDesign.id)
                ? updateReadyProjectS4DesignHandler(currentDesign.id, false)
                : addReadyProjectS4DesignHandler(currentDesign.id, false);
            }}
          />
          <Button
            type="button"
            text="upload & finish"
            color="accent-2-outlined"
            isTransitioned={true}
            onClick={() => {
              uploadedDesigns?.includes(currentDesign.id)
                ? updateReadyProjectS4DesignHandler(currentDesign.id, true)
                : addReadyProjectS4DesignHandler(currentDesign.id, true);
            }}
          />
        </div>
      </form>
      {isConfirmationModalOpen && (
        <Modal
          toggleModal={toggleConfirmationModal}
          isModalOpen={isConfirmationModalOpen}>
          <ConfirmationModal
            toggleModal={toggleConfirmationModal}
            confirmationMessage={confirmationModalMetadata.confirmationMessage}
            confirmationHandler={confirmationModalMetadata.confirmationHandler}
          />
        </Modal>
      )}
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
