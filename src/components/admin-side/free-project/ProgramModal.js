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
    currentProgramInputHandler(
      null,
      "subCategories",
      currentProgram.subCategories.length < currentProgram.quantity
        ? [...currentProgram.subCategories, { space: "", size: "" }]
        : [...currentProgram.subCategories.slice(0, currentProgram.quantity)],
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
        className={"flex items-center gap-8"}>
        <div className="w-1/2 space-y-2">
          <AdminInputBox
            label="Enter category"
            value={currentProgram.category}
            inputHandler={currentProgramInputHandler}
            idHtmlFor="category"
            name="category"
          />
          <AdminInputBox
            label="Enter quantity"
            value={currentProgram.quantity}
            inputHandler={currentProgramInputHandler}
            idHtmlFor="quantity"
            name="quantity"
            type="number"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          {Array.from({ length: currentProgram.quantity }).map(
            (_, subCategoryIndex) => (
              <div
                key={subCategoryIndex}
                className="flex flex-col gap-4 items-center">
                <AdminInputBox
                  label={`Enter space ${subCategoryIndex + 1}`}
                  value={currentProgram.subCategories[subCategoryIndex]?.space}
                  inputHandler={e =>
                    currentProgramInputHandler(
                      null,
                      "subCategories",
                      [...currentProgram.subCategories].map(
                        (subCategory, index) => {
                          if (index === subCategoryIndex) {
                            return { ...subCategory, space: e.target.value };
                          }
                          return subCategory;
                        },
                      ),
                    )
                  }
                  idHtmlFor={`space${subCategoryIndex}`}
                  name={`space${subCategoryIndex}`}
                />
                <AdminInputBox
                  label={`Enter size ${subCategoryIndex + 1}`}
                  value={currentProgram.subCategories[subCategoryIndex]?.size}
                  inputHandler={e =>
                    currentProgramInputHandler(
                      null,
                      "subCategories",
                      [...currentProgram.subCategories].map(
                        (subCategory, index) => {
                          if (index === subCategoryIndex) {
                            return { ...subCategory, size: e.target.value };
                          }
                          return subCategory;
                        },
                      ),
                    )
                  }
                  idHtmlFor={`size${subCategoryIndex}`}
                  name={`size${subCategoryIndex}`}
                />
              </div>
            ),
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default ProgramModal;
