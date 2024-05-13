"use client";
import { useEffect, useState } from "react";
import { addEditRPExteriorViewService } from "@/services/admin-side/ready-project/exteriorViews";
import { addEditRPInteriorViewService } from "@/services/admin-side/ready-project/interiorViews";
import {
  RPExteriorSection,
  RPInteriorSection,
  RPExteriorModal,
  RPInteriorModal,
  Button,
  Modal,
  DeleteModal,
  MultiFileInput,
  RPMultiImageDisplay,
  RPMaterialsSection,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { ulid } from "ulid";

const ReadyProjectScreen3 = ({
  readyProjectS3,
  readyProjectS3InputHandler,
  addReadyProjectS3Handler,
  updateReadyProjectS3Handler,
  uploadedScreensCount,
  materials,
  isErrorOccurredWhileFetching,
}) => {
  const { showAlert } = useContext(AlertContext);
  useEffect(() => {
    if (isErrorOccurredWhileFetching) {
      showAlert({
        type: "ERROR",
        message:
          "An error occurred while fetching data. Please check your internet connection and try again.",
      });
    } else if (materials?.length === 0) {
      showAlert({
        type: "ERROR",
        message: "Please upload the missing data first.",
      });
    }
  }, []);

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
      readyProjectS3InputHandler("exteriorViews", [
        ...readyProjectS3.exteriorViews,
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
      readyProjectS3InputHandler("exteriorViews", [
        exteriorViewToEdit,
        ...readyProjectS3.exteriorViews.filter(
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
    const isUploaded = readyProjectS3.exteriorViews.find(
      view => view.id === itemToDelete.id,
    ).isUploaded;
    if (isUploaded) {
      if (typeof readyProjectS3?.viewsToDelIds === "object") {
        readyProjectS3InputHandler("viewsToDelIds", [
          ...readyProjectS3?.viewsToDelIds,
          itemToDelete.id,
        ]);
      } else {
        readyProjectS3InputHandler("viewsToDelIds", [itemToDelete.id]);
      }
    }
    readyProjectS3InputHandler("exteriorViews", [
      ...readyProjectS3.exteriorViews.filter(
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
      readyProjectS3InputHandler("interiorViews", [
        ...readyProjectS3.interiorViews,
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
      readyProjectS3InputHandler("interiorViews", [
        interiorViewToEdit,
        ...readyProjectS3.interiorViews.filter(
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
    const isUploaded = readyProjectS3.interiorViews.find(
      view => view.id === itemToDelete.id,
    ).isUploaded;
    if (isUploaded) {
      if (typeof readyProjectS3?.viewsToDelIds === "object") {
        readyProjectS3InputHandler("viewsToDelIds", [
          ...readyProjectS3?.viewsToDelIds,
          itemToDelete.id,
        ]);
      } else {
        readyProjectS3InputHandler("viewsToDelIds", [itemToDelete.id]);
      }
    }
    readyProjectS3InputHandler("interiorViews", [
      ...readyProjectS3.interiorViews.filter(
        view => view.id !== itemToDelete.id,
      ),
    ]);
    showAlert({
      type: "SUCCESS",
      message: "Interior view deleted.",
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
    }
  }, [isModalOpen]);

  return (
    <>
      <form
        className="h-full w-full max-w-7xl mx-auto py-4 pr-2 space-y-6"
        onSubmit={e => e.preventDefault()}>
        <div className="h-full w-full grid grid-cols-2 gap-4 lg:grid-cols-1 lg:h-full sm:h-auto">
          <div className="h-full min-h-page-container-admin-inner max-h-page-container-admin-inner overflow-hidden grid grid-rows-2 gap-4 sm:flex sm:flex-col sm:min-h-min sm:max-h-max">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
              <div className="h-full overflow-y-hidden flex flex-col gap-2 sm:h-auto">
                <MultiFileInput
                  message={"Attach images (option 1)"}
                  filesArray={readyProjectS3.imagesOp1}
                  accept={"image/*"}
                  typeStartsWith={"image"}
                  name="imagesOp1"
                  htmlFor={"imagesOp1"}
                  inputHandler={readyProjectS3InputHandler}
                  wrongFileTypeWarning="Some of the files were not images and were not attached."
                />
                {readyProjectS3.imagesOp1?.length > 0 ? (
                  <RPMultiImageDisplay
                    className="overflow-y-auto p-2"
                    imagesArray={readyProjectS3.imagesOp1}
                    name={"imagesOp1"}
                    removeImageHandler={(name, newFilesArray, deletedImage) => {
                      if (deletedImage) {
                        if (
                          typeof readyProjectS3?.imagesOp1ToDel === "object"
                        ) {
                          // If there is an array of images to delete, add the new image to it
                          readyProjectS3InputHandler("imagesOp1ToDel", [
                            ...readyProjectS3?.imagesOp1ToDel,
                            deletedImage,
                          ]);
                        } else {
                          // If there is no array of images to delete, create one with the new image
                          readyProjectS3InputHandler("imagesOp1ToDel", [
                            deletedImage,
                          ]);
                        }
                      }
                      readyProjectS3InputHandler(name, newFilesArray);
                    }}
                  />
                ) : (
                  <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                    <p>Option 1 images will be displayed here</p>
                  </div>
                )}
              </div>
              <div className="h-full overflow-y-hidden flex flex-col gap-2 sm:h-auto">
                <MultiFileInput
                  message={"Attach images (option 2)"}
                  filesArray={readyProjectS3.imagesOp2}
                  accept={"image/*"}
                  typeStartsWith={"image"}
                  name="imagesOp2"
                  htmlFor={"imagesOp2"}
                  inputHandler={readyProjectS3InputHandler}
                  wrongFileTypeWarning="Some of the files were not images and were not attached."
                />
                {readyProjectS3.imagesOp2?.length > 0 ? (
                  <RPMultiImageDisplay
                    className="overflow-y-auto p-2"
                    imagesArray={readyProjectS3.imagesOp2}
                    name={"imagesOp2"}
                    removeImageHandler={(name, newFilesArray, deletedImage) => {
                      if (deletedImage) {
                        if (
                          typeof readyProjectS3?.imagesOp2ToDel === "object"
                        ) {
                          // If there is an array of images to delete, add the new image to it
                          readyProjectS3InputHandler("imagesOp2ToDel", [
                            ...readyProjectS3?.imagesOp2ToDel,
                            deletedImage,
                          ]);
                        } else {
                          // If there is no array of images to delete, create one with the new image
                          readyProjectS3InputHandler("imagesOp2ToDel", [
                            deletedImage,
                          ]);
                        }
                      }
                      readyProjectS3InputHandler(name, newFilesArray);
                    }}
                  />
                ) : (
                  <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                    <p>Option 2 images will be displayed here</p>
                  </div>
                )}
              </div>
            </div>
            <RPMaterialsSection
              title={"Common materials"}
              materials={materials}
              selectedMaterials={readyProjectS3.materials}
              inputHandler={readyProjectS3InputHandler}
              isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
            />
          </div>
          <div className="h-full min-h-page-container-admin-inner max-h-page-container-admin-inner overflow-hidden grid grid-rows-3 gap-4 sm:flex sm:flex-col sm:h-auto sm:min-h-min sm:max-h-max">
            <RPExteriorSection
              title={"Common Exterior 360 views"}
              exteriorViews={readyProjectS3.exteriorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentExteriorView={setCurrentExteriorView}
              setItemToDelete={setItemToDelete}
            />
            <RPInteriorSection
              title={"Common Interior 360 views"}
              interiorViews={readyProjectS3.interiorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentInteriorView={setCurrentInteriorView}
              setItemToDelete={setItemToDelete}
            />
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                text="Next step"
                isTransitioned={true}
                onClick={() => {
                  uploadedScreensCount === 2
                    ? addReadyProjectS3Handler(false)
                    : updateReadyProjectS3Handler(false);
                }}
              />
              <Button
                type="button"
                text="finish"
                color="accent-2-outlined"
                isTransitioned={true}
                onClick={() => {
                  uploadedScreensCount === 2
                    ? addReadyProjectS3Handler(true)
                    : updateReadyProjectS3Handler(true);
                }}
              />
            </div>
          </div>
        </div>
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
                  : modalMetadata.type === "INTERIOR_VIEWS" &&
                    deleteInteriorViewHandler
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
          ) : (
            modalMetadata.type === "INTERIOR_VIEWS" && (
              <RPInteriorModal
                currentInteriorView={currentInteriorView}
                currentInteriorViewInputHandler={
                  currentInteriorViewInputHandler
                }
                addNewInteriorViewHandler={addNewInteriorViewHandler}
                editInteriorViewHandler={editInteriorViewHandler}
                modalMetadata={modalMetadata}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default ReadyProjectScreen3;
