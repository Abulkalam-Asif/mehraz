import { Button, Dropdown, H2, Spinner, Td, Table } from "@/components";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import Image from "next/image";

const CitiesSection = ({
  setCurrentCity,
  cities,
  setModalMetadata,
  toggleModal,
  setItemToDelete,
  isErrorOccurredWhileFetching = false,
}) => {
  const addCityClickHandler = () => {
    setModalMetadata({
      type: "CITY",
      action: "ADD",
    });
    toggleModal();
  };
  const editCityClickHandler = e => {
    setModalMetadata({
      type: "CITY",
      action: "EDIT",
    });
    toggleModal();
    const cityId = e.currentTarget.dataset.cityId;
    const city = cities.find(city => city.id === cityId);
    setCurrentCity(city);
  };

  const deleteCityClickHandler = e => {
    setModalMetadata({
      type: "CITY",
      action: "DELETE",
    });
    toggleModal();
    const cityId = e.currentTarget.dataset.cityId;
    const city = cities.find(city => city.id === cityId);
    setItemToDelete({
      id: city.id,
      name: "city",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-2 lg:h-full lg:overflow-y-hidden">
        <H2 text="cities" />
        {isErrorOccurredWhileFetching || cities?.length === 0 ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No cities found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto py-2">
            <tbody className="text-sm">
              {cities?.map(({ id, name }, index) => (
                <tr key={index}>
                  <Td
                    isLastRow={index === cities.length - 1}
                    position="beginning">
                    {name}
                  </Td>
                  <Td
                    isLastRow={index === cities.length - 1}
                    position="end"
                    align="center">
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
                        title="Edit city"
                        data-city-id={id}
                        onClick={editCityClickHandler}
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image
                          src={editIcon}
                          alt="edit"
                          className="w-4 lg:w-5"
                        />
                      </button>
                      <button
                        title="Delete city"
                        data-city-id={id}
                        onClick={deleteCityClickHandler}
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
          text="add city"
          className="mr-auto ml-4"
          size="xs"
          onClick={addCityClickHandler}
        />
      </div>
    </>
  );
};

export default CitiesSection;
