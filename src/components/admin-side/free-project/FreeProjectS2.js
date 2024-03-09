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
} from "@/components";
import { useContext, useEffect, useState } from "react";
import { addEditExteriorViewService } from "@/services/admin-side/free-project/exteriorViews";
import { AlertContext } from "@/context/AlertContext";
import { ulid } from "ulid";

const FreeProjectS2 = ({
  freeProjectS2InputHandler,
  addFreeProjectS2Handler,
  freeProjectS2,
}) => {
  const { showAlert } = useContext(AlertContext);
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
    if (addEditExteriorViewService(currentExteriorView, showAlert)) {
      freeProjectS2InputHandler(null, "exteriorViews", [
        ...freeProjectS2.exteriorViews,
        { ...currentExteriorView, id: ulid() },
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
    if (addEditExteriorViewService(currentExteriorView, showAlert)) {
      freeProjectS2InputHandler(null, "exteriorViews", [
        currentExteriorView,
        ...freeProjectS2.exteriorViews.filter(
          view => view.id !== currentExteriorView.id,
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

  const deleteInteriorViewHandler = () => {};
  const deleteMaterialHandler = () => {};

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
    }
  }, [isModalOpen]);

  return (
    <>
      <form className="h-full flex gap-4 w-full max-w-7xl mx-auto pr-2">
        <div className="h-full w-full grid grid-cols-3 gap-4">
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
          </div>
          <div className="h-full overflow-hidden col-span-2 grid grid-rows-3 gap-4">
            <ExteriorSection
              exteriorViews={freeProjectS2.exteriorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentExteriorView={setCurrentExteriorView}
              setItemToDelete={setItemToDelete}
            />
            <ExteriorSection
              exteriorViews={freeProjectS2.exteriorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentExteriorView={setCurrentExteriorView}
              setItemToDelete={setItemToDelete}
            />
            <ExteriorSection
              exteriorViews={freeProjectS2.exteriorViews}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setCurrentExteriorView={setCurrentExteriorView}
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
                modalMetadata.type === "EXTERIOR_VIEWS"
                  ? deleteExteriorViewHandler
                  : modalMetadata.type === "INTERIOR_VIEWS"
                  ? deleteInteriorViewHandler
                  : modalMetadata.type === "MATERIALS" && deleteMaterialHandler
              }
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
            <div>interior views</div>
          ) : (
            modalMetadata.type == "MATERIALS" && <div>materials</div>
          )}
        </Modal>
      )}
    </>
  );
};

export default FreeProjectS2;
