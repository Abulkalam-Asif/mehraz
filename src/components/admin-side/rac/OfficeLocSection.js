import { Button, H2, Th, Td, Dropdown, Table } from "@/components";
import Image from "next/image";
import { deleteIcon, editIcon, ellipsisIcon, linkIcon } from "@/assets";

const OfficeLocSection = ({
  officeLocations,
  setCurrentOfficeLocation,
  setModalMetadata,
  toggleModal,
  setItemToDelete,
  isErrorOccurredWhileFetching = false,
}) => {
  const addOfficeClickHandler = () => {
    setModalMetadata({
      type: "OFFICE",
      action: "ADD",
    });
    toggleModal();
  };
  const editOfficeClickHandler = e => {
    setModalMetadata({
      type: "OFFICE",
      action: "EDIT",
    });
    toggleModal();
    const officeId = e.currentTarget.dataset.officeId;
    const office = officeLocations.find(office => office.id === officeId);
    setCurrentOfficeLocation(office);
  };

  const deleteOfficeClickHandler = e => {
    setModalMetadata({
      type: "OFFICE",
      action: "DELETE",
    });
    toggleModal();
    const officeId = e.currentTarget.dataset.officeId;
    const office = officeLocations.find(office => office.id === officeId);
    setItemToDelete({
      id: office.id,
      name: "office",
    });
  };
  return (
    <>
      <div className="flex flex-col gap-y-2 lg:h-full lg:overflow-y-hidden">
        <H2 text="office locations" />
        {isErrorOccurredWhileFetching || officeLocations?.length === 0 ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No offices found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning">Name</Th>
                <Th>address</Th>
                <Th>maps</Th>
                <Th position="end">image</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {officeLocations?.map((location, index) => (
                <tr key={index}>
                  <Td
                    position="beginning"
                    isLastRow={index === officeLocations.length - 1}>
                    {location.name}
                  </Td>
                  <Td isLastRow={index === officeLocations.length - 1}>
                    {location.address}
                  </Td>
                  <Td isLastRow={index === officeLocations.length - 1}>
                    <a
                      target="_blank"
                      href={location?.mapsLink}
                      className="underline flex items-center gap-2">
                      <span>link</span>
                      <Image src={linkIcon} alt="link" />
                    </a>
                  </Td>
                  <Td isLastRow={index === officeLocations.length - 1}>
                    <a
                      target="_blank"
                      href={location.image}
                      className="underline flex items-center gap-2">
                      <span>link</span>
                      <Image src={linkIcon} alt="link" />
                    </a>
                  </Td>
                  <Td
                    position="end"
                    align="center"
                    isLastRow={index === officeLocations.length - 1}>
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
                        title="Edit office"
                        onClick={editOfficeClickHandler}
                        data-office-id={location.id}
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image
                          src={editIcon}
                          alt="edit"
                          className="w-4 lg:w-5"
                        />
                      </button>
                      <button
                        title="Delete office"
                        onClick={deleteOfficeClickHandler}
                        data-office-id={location.id}
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
          text="add office"
          onClick={addOfficeClickHandler}
          className="mr-auto ml-4"
          size="xs"
        />
      </div>
    </>
  );
};

export default OfficeLocSection;
