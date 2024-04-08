import Image from "next/image";
import {
  Dropdown,
  H2,
  Table,
  Td,
  Th,
  AdminTableContainer,
  Button,
  Spinner,
} from "@/components/";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";

const ProgramSection = ({
  programs,
  setModalMetadata,
  toggleModal,
  setCurrentProgram,
  setItemToDelete,
  className = "",
}) => {
  const addProgramClickHandler = () => {
    setModalMetadata({
      type: "PROGRAMS",
      action: "ADD",
    });
    toggleModal();
  };

  const editProgramClickHandler = e => {
    setModalMetadata({
      type: "PROGRAMS",
      action: "EDIT",
    });
    toggleModal();
    const programId = e.currentTarget.dataset.programId;
    const program = programs.find(program => program.id === programId);
    setCurrentProgram({ ...program, id: programId });
  };

  const deleteProgramClickHandler = e => {
    setModalMetadata({
      type: "PROGRAMS",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "program",
      id: e.currentTarget.dataset.programId,
    });
  };

  return (
    <>
      <AdminTableContainer
        className={`w-full flex flex-col gap-y-2 ${className}`}>
        <H2 text="Programs" />
        {programs ? (
          programs.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="text-sm">
                <tr>
                  <Th position="beginning">Category</Th>
                  <Th>Quantity</Th>
                  <Th>Spaces</Th>
                  <Th position="end">Sizes</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {programs.map((program, programIndex) =>
                  Array.from({ length: program.quantity }).map(
                    (_, subCategoryIndex) => (
                      <tr key={`${programIndex}${subCategoryIndex}`}>
                        {subCategoryIndex === 0 && (
                          <>
                            <Td
                              position="beginning"
                              rowSpan={program.quantity}
                              isLastRow={programIndex === programs.length - 1}>
                              {program.category}
                            </Td>
                            <Td
                              rowSpan={program.quantity}
                              isLastRow={programIndex === programs.length - 1}>
                              {program.quantity}
                            </Td>
                          </>
                        )}
                        <Td
                          isLastRow={
                            programIndex === programs.length - 1 &&
                            subCategoryIndex ===
                              program.subCategories?.length - 1
                          }>
                          {program.subCategories[subCategoryIndex]?.space}
                        </Td>
                        <Td
                          isLastRow={
                            programIndex === programs.length - 1 &&
                            subCategoryIndex ===
                              program.subCategories?.length - 1
                          }>
                          {program.subCategories[subCategoryIndex]?.size}
                        </Td>
                        {subCategoryIndex === 0 && (
                          <>
                            <Td
                              position="end"
                              rowSpan={program.quantity}
                              isLastRow={programIndex === programs.length - 1}>
                              <Dropdown
                                className="w-fit"
                                contentClassName={
                                  "w-max flex items-center bg-white border-2 border-accent-1-base px-1 rounded-lg shadow-dropdown absolute top-1/2 -translate-y-1/2 -left-1 -translate-x-full"
                                }
                                buttonClassName="hover:bg-accent-1-extra-light p-1.5 rounded-full lg:p-2"
                                triggerContent={
                                  <>
                                    <Image
                                      src={ellipsisIcon}
                                      alt="ellipsis"
                                      className="min-w-4 w-4 lg:min-w-5 lg:w-5"
                                    />
                                  </>
                                }>
                                <button
                                  title="Edit program"
                                  data-program-id={program.id}
                                  onClick={editProgramClickHandler}
                                  className="hover:bg-accent-1-extra-light p-2 rounded-full">
                                  <Image
                                    src={editIcon}
                                    alt="edit"
                                    className="w-4 lg:w-5"
                                  />
                                </button>
                                <button
                                  title="Delete program"
                                  data-program-id={program.id}
                                  onClick={deleteProgramClickHandler}
                                  className="hover:bg-accent-1-extra-light p-2 rounded-full">
                                  <Image
                                    src={deleteIcon}
                                    alt="delete"
                                    className="w-4 lg:w-5"
                                  />
                                </button>
                              </Dropdown>
                            </Td>
                          </>
                        )}
                      </tr>
                    ),
                  ),
                )}
              </tbody>
            </Table>
          ) : (
            <div className="flex-1 font-medium flex items-center justify-center">
              <p>No programs added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading programs..." />
          </div>
        )}
        <Button
          text="add program"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addProgramClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default ProgramSection;
