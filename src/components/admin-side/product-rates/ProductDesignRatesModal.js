"use client";
import { AdminCheckbox, AdminInputBox, AdminModal } from "@/components";

const ProductDesignRatesModal = ({
  currentDesignRate,
  currentDesignRateInputHandler,
  addNewDesignRateHandler,
  editDesignRateHandler,
  modalMetadata,
}) => {
  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD"
            ? "Add design rate"
            : "Edit design rate"
        }
        buttonText={
          modalMetadata.action === "ADD"
            ? "Add design rate"
            : "Update design rate"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewDesignRateHandler
            : editDesignRateHandler
        }
        className={"flex items-stretch gap-8 sm:flex-col sm:gap-4"}>
        <div className="w-1/2 gap-2 sm:w-full">
          <AdminInputBox
            label="Enter service"
            value={currentDesignRate.service}
            inputHandler={currentDesignRateInputHandler}
            idHtmlFor="service"
            name="service"
            required={true}
            maxLength={20}
          />
          <AdminInputBox
            label="Enter rate"
            value={currentDesignRate.rate}
            inputHandler={currentDesignRateInputHandler}
            idHtmlFor="rate"
            name="rate"
            required={true}
            type="number"
            min={1}
            max={9999999}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 sm:w-full">
          <AdminInputBox
            label="Enter description"
            value={currentDesignRate.description}
            inputHandler={currentDesignRateInputHandler}
            idHtmlFor="description"
            type="textarea"
            name="description"
            required={true}
            maxLength={100}
            className="flex-1"
          />
          <AdminCheckbox
            label="Is design rate fixed?"
            checked={currentDesignRate.isFixed}
            inputHandler={currentDesignRateInputHandler}
            idHtmlFor="isFixed"
            name="isFixed"
          />
        </div>
      </AdminModal>
    </>
  );
};

export default ProductDesignRatesModal;
