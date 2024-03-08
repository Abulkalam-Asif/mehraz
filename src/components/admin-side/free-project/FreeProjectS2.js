"use client";
import Button from "../Button";
import FileInput from "./FileInput";
import MultiFileInput from "../MultiFileInput";
import MultiFileDisplay from "../MultiFileDisplay";
import ExteriorSection from "./ExteriorSection";
import InteriorSection from "./InteriorSection";
import { useContext, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import ExteriorModal from "./ExteriorModal";
import { addEditExteriorViewService } from "@/services/admin-side/free-project/exteriorViews";
import { AlertContext } from "@/context/AlertContext";
import { ulid } from "ulid";

const interiorViews = [
  {
    name: "front",
    video: "something",
    description: "something",
  },
  {
    name: "back",
    video: "something",
    description: "something",
  },
  {
    name: "left",
    video: "something",
    description: "something",
  },
  {
    name: "right",
    video: "something",
    description: "something",
  },
];

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
        type: "success",
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
        type: "success",
        message: "Exterior view updated successfully.",
      });
      toggleModal();
    }
  };

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
            />
            <InteriorSection interiorViews={interiorViews} />
            <InteriorSection interiorViews={interiorViews} />
            {/* <InteriorSection interiorViews={interiorViews} /> */}
            {/* <InteriorSection interiorViews={interiorViews} /> */}
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
          {modalMetadata.type == "EXTERIOR_VIEWS" ? (
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
