import { Button, H2, Th, Td, Spinner, Dropdown } from "@/components";
import { Table } from ".";
import Image from "next/image";
import { deleteIcon, editIcon, ellipsisIcon, linkIcon } from "@/assets";

const OfficeLocSection = ({
  officeLocations,
  setModalMetadata,
  toggleModal,
}) => {
  const addOfficeClickHandler = () => {
    setModalMetadata({
      type: "office",
      action: "add",
    });
    toggleModal();
  };
  const editOfficeClickHandler = () => {
    setModalMetadata({
      type: "office",
      action: "edit",
    });
    toggleModal();
    // const officeId = e.target.dataset.officeId;
    // const office = officeLocations.find((office) => office.id === officeId);
    // setNewOffice(office);
  };
  return (
    <>
      <div className="flex flex-col gap-y-2 lg:h-full lg:overflow-y-hidden">
        <H2 text="office locations" />
        {officeLocations ? (
          officeLocations.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto py-2">
              <thead className="text-sm">
                <tr>
                  <Th position="beginning">city</Th>
                  <Th>address</Th>
                  <Th>maps</Th>
                  <Th position="end">image</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {officeLocations?.map((location, i) => (
                  <tr key={i}>
                    <Td
                      position="beginning"
                      isLastRow={i === officeLocations.length - 1}>
                      {location.city}
                    </Td>
                    <Td isLastRow={i === officeLocations.length - 1}>
                      {location.address}
                    </Td>
                    <Td isLastRow={i === officeLocations.length - 1}>
                      <a
                        target="_blank"
                        href={location?.mapsLink}
                        className="underline flex items-center gap-2">
                        <span>link</span>
                        <Image src={linkIcon} alt="link" />
                      </a>
                    </Td>
                    <Td isLastRow={i === officeLocations.length - 1}>
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
                      isLastRow={i === officeLocations.length - 1}>
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
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={editIcon}
                            alt="edit"
                            className="w-4 lg:w-5"
                          />
                        </button>
                        <button
                          title="Delete office"
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
              <p>No office locations added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading offices..." />
          </div>
        )}
        <Button
          text="add office"
          onClick={addOfficeClickHandler}
          className="text-xs mr-auto ml-4"
        />
      </div>
    </>
  );
};

export default OfficeLocSection;
