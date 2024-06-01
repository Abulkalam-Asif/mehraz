import { Button, H2, Th, Td, Dropdown, Table } from "@/components";
import { deleteIcon, editIcon, ellipsisIcon, linkIcon } from "@/assets";
import Image from "next/image";

const StylesSection = ({
  styles,
  setCurrentStyle,
  setModalMetadata,
  toggleModal,
  setItemToDelete,
  isErrorOccurredWhileFetching = false,
}) => {
  const addStyleClickHandler = () => {
    setModalMetadata({
      type: "STYLE",
      action: "ADD",
    });
    toggleModal();
  };
  const editStyleClickHandler = e => {
    setModalMetadata({
      type: "STYLE",
      action: "EDIT",
    });
    toggleModal();
    const styleId = e.currentTarget.dataset.styleId;
    const currentStyle = styles.find(style => style.id === styleId);
    setCurrentStyle(currentStyle);
  };

  const deleteStyleClickHandler = e => {
    setModalMetadata({
      type: "STYLE",
      action: "DELETE",
    });
    toggleModal();
    const styleId = e.currentTarget.dataset.styleId;
    const currentStyle = styles.find(style => style.id === styleId);
    setItemToDelete({
      id: currentStyle.id,
      name: "style",
    });
  };
  return (
    <>
      <div className="flex flex-col gap-y-2 lg:h-full lg:overflow-y-hidden">
        <H2 text="styles" />
        {isErrorOccurredWhileFetching || styles?.length === 0 ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No styles found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning">name</Th>
                <Th>budget</Th>
                <Th position="end">image</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {styles?.map((style, index) => (
                <tr key={index}>
                  <Td
                    position="beginning"
                    isLastRow={index === styles.length - 1}>
                    {style.name}
                  </Td>
                  <Td isLastRow={index === styles.length - 1}>
                    {style.budget}
                  </Td>
                  <Td position="end" isLastRow={index === styles.length - 1}>
                    <a
                      target="_blank"
                      href={style.image}
                      className="underline flex items-center gap-2">
                      <span>image</span>
                      <Image src={linkIcon} alt="link" />
                    </a>
                  </Td>
                  <Td
                    position="end"
                    align="center"
                    isLastRow={index === styles.length - 1}>
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
                        title="Edit style"
                        data-style-id={style.id}
                        onClick={editStyleClickHandler}
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image
                          src={editIcon}
                          alt="edit"
                          className="w-4 lg:w-5"
                        />
                      </button>
                      <button
                        title="Delete style"
                        data-style-id={style.id}
                        onClick={deleteStyleClickHandler}
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
        )}
        <Button
          text="add style"
          className="mr-auto ml-4"
          size="xs"
          onClick={addStyleClickHandler}
        />
      </div>
    </>
  );
};

export default StylesSection;
