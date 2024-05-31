"use client";
import { useContext, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import {
  DeleteModal,
  ProductConstructionRatesModal,
  ProductConstructionRatesSection,
  ProductDesignRatesModal,
  ProductDesignRatesSection,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";
import {
  addNewRateService,
  deleteRateService,
  editRateService,
} from "@/services/admin-side/product-rates/productRates";

const ProductRatesClientPage = ({
  productRates,
  isErrorOccurredWhileFetching,
}) => {
  const { showAlert } = useContext(AlertContext);

  let designRates = null,
    constructionRates = null;
  if (!isErrorOccurredWhileFetching) {
    designRates = productRates?.filter(rate => rate.type === "DESIGN");
    constructionRates = productRates.filter(
      rate => rate.type === "CONSTRUCTION",
    );
  }

  useEffect(() => {
    if (isErrorOccurredWhileFetching) {
      showAlert({
        type: "ERROR",
        message:
          "An error occurred while fetching data. Please check your internet connection and try again.",
      });
    }
  }, []);

  // Design rates state and functions
  const defaultDesignRate = {
    service: "",
    rate: 0,
    description: "",
    isFixed: false,
    type: "DESIGN",
  };
  const [currentDesignRate, setCurrentDesignRate] = useState(defaultDesignRate);
  const currentDesignRateInputHandler = (name, value) => {
    setCurrentDesignRate(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewDesignRateHandler = async () => {
    addNewRateService(
      currentDesignRate,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const editDesignRateHandler = async () => {
    editRateService(
      currentDesignRate,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };

  // Construction rates state and functions
  const defaultConstructionRate = {
    service: "",
    rate: 0,
    description: "",
    isFixed: false,
    type: "CONSTRUCTION",
  };
  const [currentConstructionRate, setCurrentConstructionRate] = useState(
    defaultConstructionRate,
  );
  const currentConstructionRateInputHandler = (name, value) => {
    setCurrentConstructionRate(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewConstructionRateHandler = async () => {
    addNewRateService(
      currentConstructionRate,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const editConstructionRateClickHandler = async () => {
    editRateService(
      currentConstructionRate,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };

  const deleteRateHandler = async () => {
    deleteRateService(itemToDelete, setShowModalSpinner, showAlert, hideModal);
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
  const [showModalSpinner, setShowModalSpinner] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);
  const hideModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) {
      setModalMetadata({
        type: null,
        action: null,
      });
      setCurrentDesignRate(defaultDesignRate);
      setCurrentConstructionRate(defaultConstructionRate);
    }
  }, [isModalOpen]);
  return (
    <>
      <div className="max-w-8xl w-full mx-auto h-page-container-admin xl:h-page-container-admin-xl grid grid-cols-2 gap-8">
        <div className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0 grid grid-rows-3 gap-4 overflow-y-auto">
          <ProductDesignRatesSection
            designRates={designRates}
            isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentDesignRate={setCurrentDesignRate}
            setItemToDelete={setItemToDelete}
          />
          <div>other div</div>
        </div>
        <div className="h-page-container-admin-inner min-h-page-container-admin-inner max-h-page-container-admin-inner md:h-auto md:min-h-0 grid grid-rows-3 gap-4 overflow-y-auto">
          <ProductConstructionRatesSection
            constructionRates={constructionRates}
            isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setCurrentConstructionRate={setCurrentConstructionRate}
            setItemToDelete={setItemToDelete}
          />
          <div>other div</div>
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
              deleteHandler={deleteRateHandler}
            />
          ) : modalMetadata.type === "DESIGN_RATES" ? (
            <ProductDesignRatesModal
              currentDesignRate={currentDesignRate}
              currentDesignRateInputHandler={currentDesignRateInputHandler}
              addNewDesignRateHandler={addNewDesignRateHandler}
              editDesignRateHandler={editDesignRateHandler}
              modalMetadata={modalMetadata}
            />
          ) : (
            modalMetadata.type === "CONSTRUCTION_RATES" && (
              <ProductConstructionRatesModal
                currentConstructionRate={currentConstructionRate}
                currentConstructionRateInputHandler={
                  currentConstructionRateInputHandler
                }
                addNewConstructionRateHandler={addNewConstructionRateHandler}
                editConstructionRateHandler={editConstructionRateClickHandler}
                modalMetadata={modalMetadata}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default ProductRatesClientPage;
