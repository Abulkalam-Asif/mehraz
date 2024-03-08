import Image from "next/image";
import Dropdown from "../Dropdown";
import H2 from "../H2";
import Table from "../Table";
import Td from "../Td";
import Th from "../Th";
import FreeProjectContainer from "./FreeProjectContainer";
import { deleteIcon, editIcon, ellipsisIcon, linkIcon } from "@/assets";
import Button from "../Button";

const ExteriorSection = ({
  exteriorViews,
  setModalMetadata,
  toggleModal,
  setCurrentExteriorView,
}) => {
  const addExteriorClickHandler = () => {
    setModalMetadata({
      type: "EXTERIOR_VIEWS",
      action: "add",
    });
    toggleModal();
  };

  const editExteriorClickHandler = e => {
    setModalMetadata({
      type: "EXTERIOR_VIEWS",
      action: "edit",
    });
    toggleModal();
    const exteriorId = e.currentTarget.dataset.exteriorId;
    const exterior = exteriorViews.find(view => view.id === exteriorId);
    setCurrentExteriorView(exterior);
  };
  const deleteExteriorClickHandler = e => {
    setModalMetadata({
      type: "EXTERIOR_VIEWS",
      action: "delete",
    });
    toggleModal();
  };
  return (
    <>
      <FreeProjectContainer className="flex flex-col gap-y-2">
        <H2 text="Exterior 360 views" />
        {exteriorViews ? (
          exteriorViews.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="text-sm">
                <tr>
                  <Th position="beginning">name</Th>
                  <Th position="end">description</Th>
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
                    <Td
                      position="end"
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
                          onClick={editExteriorClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={editIcon}
                            alt="edit"
                            className="w-4 lg:w-5"
                          />
                        </button>
                        <button
                          title="Delete currency"
                          data-exterior-id={index}
                          onClick={deleteExteriorClickHandler}
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
            <Spinner size={"sm"} text="Loading currencies..." />
          </div>
        )}
        <Button
          text="add exterior view"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addExteriorClickHandler}
        />
      </FreeProjectContainer>
    </>
  );
};

export default ExteriorSection;
