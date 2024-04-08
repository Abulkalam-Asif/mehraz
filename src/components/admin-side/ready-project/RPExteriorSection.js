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
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";

const RPExteriorSection = ({
  title,
  exteriorViews,
  setModalMetadata,
  toggleModal,
  setCurrentExteriorView,
  setItemToDelete,
}) => {
  const addExteriorViewClickHandler = () => {
    setModalMetadata({
      type: "EXTERIOR_VIEWS",
      action: "ADD",
    });
    toggleModal();
  };

  const editExteriorViewClickHandler = e => {
    setModalMetadata({
      type: "EXTERIOR_VIEWS",
      action: "EDIT",
    });
    toggleModal();
    const exteriorId = e.currentTarget.dataset.exteriorId;
    const exterior = exteriorViews.find(view => view.id === exteriorId);
    setCurrentExteriorView(exterior);
  };
  const deleteExteriorViewClickHandler = e => {
    setModalMetadata({
      type: "EXTERIOR_VIEWS",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "exterior view",
      id: e.currentTarget.dataset.exteriorId,
    });
  };
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2">
        <H2 text={title} />
        {exteriorViews ? (
          exteriorViews.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="text-sm">
                <tr>
                  <Th position="beginning">name</Th>
                  <Th>description</Th>
                  <Th>option 1</Th>
                  <Th position="end">option 2</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {exteriorViews?.map((view, index) => (
                  <tr key={index}>
                    <Td
                      position="beginning"
                      isLastRow={index === exteriorViews.length - 1}>
                      {view.name}
                    </Td>
                    <Td isLastRow={index === exteriorViews.length - 1}>
                      {view.description}
                    </Td>
                    <Td isLastRow={index === exteriorViews.length - 1}>
                      {view.option != "OPTION2" ? (
                        <FaCheckCircle size={14} className="text-green-500" />
                      ) : (
                        <FaMinusCircle size={14} />
                      )}
                    </Td>
                    <Td isLastRow={index === exteriorViews.length - 1}>
                      {view.option != "OPTION1" ? (
                        <FaCheckCircle size={14} className="text-green-500" />
                      ) : (
                        <FaMinusCircle size={14} />
                      )}
                    </Td>
                    <Td
                      position="end"
                      align="center"
                      isLastRow={index === exteriorViews.length - 1}>
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
                          data-exterior-id={view.id}
                          onClick={editExteriorViewClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={editIcon}
                            alt="edit"
                            className="w-4 lg:w-5"
                          />
                        </button>
                        <button
                          title="Delete view"
                          data-exterior-id={view.id}
                          onClick={deleteExteriorViewClickHandler}
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
          text="add exterior view"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addExteriorViewClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default RPExteriorSection;
