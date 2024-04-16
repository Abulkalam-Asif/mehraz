import Image from "next/image";
import {
  Dropdown,
  Table,
  Td,
  Th,
  AdminTableContainer,
  Button,
  Spinner,
  H2,
} from "@/components/";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const PropertiesSection = ({
  properties,
  setModalMetadata,
  toggleModal,
  setCurrentProperty,
  setItemToDelete,
  cities,
}) => {
  const { showAlert } = useContext(AlertContext);
  const addPropertyClickHandler = () => {
    if (cities.length === 0) {
      showAlert({
        type: "ERROR",
        message: "Please add a city first.",
      });
      return;
    }
    setModalMetadata({
      type: "PROPERTIES",
      action: "ADD",
    });
    toggleModal();
  };

  const editPropertyClickHandler = e => {
    setModalMetadata({
      type: "PROPERTIES",
      action: "EDIT",
    });
    toggleModal();
    const propertyId = e.currentTarget.dataset.propertyId;
    const property = properties.find(property => property.id === propertyId);
    setCurrentProperty(property);
  };
  const deletePropertyClickHandler = e => {
    setModalMetadata({
      type: "PROPERTIES",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "property",
      id: e.currentTarget.dataset.propertyId,
    });
  };
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2 col-span-2">
        <H2 text="Properties" />
        {properties ? (
          properties.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="bg-accent-1-base text-sm">
                <tr>
                  <Th position="beginning">area</Th>
                  <Th>description</Th>
                  <Th>location</Th>
                  <Th>demand</Th>
                  <Th>city</Th>
                  <Th position="end">type</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {properties?.map((property, index) => (
                  <tr key={index}>
                    <Td
                      position="beginning"
                      isLastRow={index === properties.length - 1}>
                      {property.area}
                    </Td>
                    <Td
                      position="beginning"
                      isLastRow={index === properties.length - 1}>
                      {property.description}
                    </Td>
                    <Td isLastRow={index === properties.length - 1}>
                      {property.location}
                    </Td>
                    <Td isLastRow={index === properties.length - 1}>
                      {property.demand}
                    </Td>
                    <Td isLastRow={index === properties.length - 1}>
                      {cities.find(city => city.id === property.city)?.name}
                    </Td>
                    <Td isLastRow={index === properties.length - 1}>
                      {property.type}
                    </Td>
                    <Td
                      position="end"
                      align="center"
                      isLastRow={index === properties.length - 1}>
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
                          title="Edit property"
                          data-property-id={property.id}
                          onClick={editPropertyClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={editIcon}
                            alt="edit"
                            className="w-4 lg:w-5"
                          />
                        </button>
                        <button
                          title="Delete property"
                          data-property-id={property.id}
                          onClick={deletePropertyClickHandler}
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
              <p>No properties added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading properties..." />
          </div>
        )}
        <Button
          text="add property"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addPropertyClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default PropertiesSection;
