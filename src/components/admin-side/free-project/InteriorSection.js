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

const InteriorSection = ({
  interiorViews,
  setModalMetadata,
  toggleModal,
  setCurrentInteriorView,
  setItemToDelete,
}) => {
  const addInteriorViewClickHandler = () => {
    setModalMetadata({
      type: "INTERIOR_VIEWS",
      action: "ADD",
    });
    toggleModal();
  };

  const editInteriorViewClickHandler = e => {
    setModalMetadata({
      type: "INTERIOR_VIEWS",
      action: "EDIT",
    });
    toggleModal();
    const interiorId = e.currentTarget.dataset.interiorId;
    const interior = interiorViews.find(view => view.id === interiorId);
    setCurrentInteriorView(interior);
  };
  const deleteInteriorViewClickHandler = e => {
    setModalMetadata({
      type: "INTERIOR_VIEWS",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "interior view",
      id: e.currentTarget.dataset.interiorId,
    });
  };
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2">
        <H2 text="Interior 360 views" />
        {interiorViews ? (
          interiorViews.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="text-sm">
                <tr>
                  <Th position="beginning">name</Th>
                  <Th position="end">description</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {interiorViews?.map((view, index) => (
                  <tr key={index}>
                    <Td
                      position="beginning"
                      isLastRow={index === interiorViews.length - 1}>
                      {view.name}
                    </Td>
                    <Td isLastRow={index === interiorViews.length - 1}>
                      {view.description}
                    </Td>
                    <Td
                      position="end"
                      align="center"
                      isLastRow={index === interiorViews.length - 1}>
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
                          title="Edit view"
                          data-interior-id={view.id}
                          onClick={editInteriorViewClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={editIcon}
                            alt="edit"
                            className="w-4 lg:w-5"
                          />
                        </button>
                        <button
                          title="Delete view"
                          data-interior-id={view.id}
                          onClick={deleteInteriorViewClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={deleteIcon}
                            alt="delete"
                            className="w-4 lg:w-5"
                          />
                        </button>
                      </Dropdown>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="flex-1 font-medium flex items-center justify-center">
              <p>No views added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading views..." />
          </div>
        )}
        <Button
          text="add interior view"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addInteriorViewClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default InteriorSection;
