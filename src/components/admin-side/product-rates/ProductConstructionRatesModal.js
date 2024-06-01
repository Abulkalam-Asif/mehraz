"use client";
import { AdminCheckbox, AdminInputBox, AdminModal } from "@/components";

const ProductConstructionRatesModal = ({
  currentConstructionRate,
  currentConstructionRateInputHandler,
  addNewConstructionRateHandler,
  editConstructionRateHandler,
  modalMetadata,
}) => {
  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD"
            ? "Add construction rate"
            : "Edit construction rate"
        }
        buttonText={
          modalMetadata.action === "ADD"
            ? "Add construction rate"
            : "Update construction rate"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewConstructionRateHandler
            : editConstructionRateHandler
        }
        className={"flex items-stretch gap-8 sm:gap-4 sm:flex-col"}>
        <div className="w-1/2 gap-2 sm:w-full">
          <AdminInputBox
            label="Enter service"
            value={currentConstructionRate.service}
            inputHandler={currentConstructionRateInputHandler}
            idHtmlFor="service"
            name="service"
            required={true}
            maxLength={20}
          />
          <AdminInputBox
            label="Enter rate"
            value={currentConstructionRate.rate}
            inputHandler={currentConstructionRateInputHandler}
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
            value={currentConstructionRate.description}
            inputHandler={currentConstructionRateInputHandler}
            idHtmlFor="description"
            type="textarea"
            name="description"
            required={true}
            maxLength={100}
            className="flex-1"
          />
          <AdminCheckbox
            label="Is construction rate fixed?"
            checked={currentConstructionRate.isFixed}
            inputHandler={currentConstructionRateInputHandler}
            idHtmlFor="isFixed"
            name="isFixed"
          />
        </div>
      </AdminModal>
    </>
  );
};

export default ProductConstructionRatesModal;
