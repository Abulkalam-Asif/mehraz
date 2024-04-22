"use client";
import { AdminInputBox, AdminModal } from "@/components";
import { useEffect } from "react";

const ProgramModal = ({
  currentProgram,
  currentProgramInputHandler,
  addNewProgramHandler,
  editProgramHandler,
  modalMetadata,
}) => {
  useEffect(() => {
    const currentSubcategoriesCount = currentProgram.subCategories?.length;
    const currentQuantity = Number(currentProgram.quantity);
    currentProgramInputHandler(
      "subCategories",
      currentSubcategoriesCount < currentQuantity
        ? [...currentProgram.subCategories].concat(
            Array.from({
              length: currentQuantity - currentSubcategoriesCount,
            }).map(() => ({ space: "", size: "" })),
          )
        : [...currentProgram.subCategories?.slice(0, currentProgram.quantity)],
    );
  }, [currentProgram.quantity]);

  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD" ? "Add program" : "Edit program"
        }
        buttonText={
          modalMetadata.action === "ADD" ? "Add program" : "Update program"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewProgramHandler
            : editProgramHandler
        }
        className={"flex items-center gap-8 sm:flex-col"}>
        <div className="w-1/2 space-y-2 sm:w-full">
          <AdminInputBox
            label="Enter category"
            value={currentProgram.category}
            inputHandler={currentProgramInputHandler}
            idHtmlFor="category"
            name="category"
            maxLength={15}
            required={true}
          />
          <AdminInputBox
            label="Enter quantity"
            value={currentProgram.quantity}
            inputHandler={currentProgramInputHandler}
            idHtmlFor="quantity"
            name="quantity"
            type="number"
            max={99}
            min={1}
            required={true}
          />
        </div>
        <div className="max-h-32 w-1/2 flex flex-col overflow-y-auto pr-2 sm:w-full">
          {currentProgram.quantity > 0 ? (
            Array.from({ length: currentProgram.quantity }).map(
              (_, subCategoryIndex) => (
                <div
                  key={subCategoryIndex}
                  className="flex flex-col gap-2 items-center">
                  <AdminInputBox
                    className="w-full"
                    maxLength={15}
                    required={true}
                    label={`Enter space ${subCategoryIndex + 1}`}
                    value={
                      currentProgram.subCategories[subCategoryIndex]?.space
                    }
                    inputHandler={(_, value) => {
                      currentProgramInputHandler(
                        "subCategories",
                        [...currentProgram.subCategories].map(
                          (subCategory, index) => {
                            if (index === subCategoryIndex) {
                              return { ...subCategory, space: value };
                            }
                            return subCategory;
                          },
                        ),
                      );
                    }}
                    idHtmlFor={`space${subCategoryIndex}`}
                    name={`space${subCategoryIndex}`}
                  />
                  <AdminInputBox
                    maxLength={15}
                    required={true}
                    className="w-full"
                    label={`Enter size ${subCategoryIndex + 1}`}
                    value={currentProgram.subCategories[subCategoryIndex]?.size}
                    inputHandler={(_, value) =>
                      currentProgramInputHandler(
                        "subCategories",
                        [...currentProgram.subCategories].map(
                          (subCategory, index) => {
                            if (index === subCategoryIndex) {
                              return { ...subCategory, size: value };
                            }
                            return subCategory;
                          },
                        ),
                      )
                    }
                    idHtmlFor={`size${subCategoryIndex}`}
                    name={`size${subCategoryIndex}`}
                  />
                  {subCategoryIndex + 1 !== Number(currentProgram.quantity) && (
                    <hr className="w-full border-t-2 border-accent-1-base my-2" />
                  )}
                </div>
              ),
            )
          ) : (
            <p className="text-center">Enter valid quantity</p>
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default ProgramModal;
