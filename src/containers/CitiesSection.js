import { Button, Dropdown, H2, Spinner, Td } from "@/components";
import { Table } from ".";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import Image from "next/image";

const CitiesSection = ({
  setCurrentCity,
  cities,
  setModalMetadata,
  toggleModal,
}) => {
  const addCityClickHandler = () => {
    setModalMetadata({
      type: "city",
      action: "add",
    });
    toggleModal();
  };
  const editCityClickHandler = (e) => {
    setModalMetadata({
      type: "city",
      action: "edit",
    });
    toggleModal();
    const cityId = e.target.dataset.cityId;
    const city = cities.find((city) => city.id === cityId);
    setCurrentCity(city);
  };
  return (
    <>
      <div className="flex flex-col gap-y-2 lg:h-full lg:overflow-y-hidden">
        <H2 text="cities" />
        {cities ? (
          cities.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto py-2">
              <tbody className="text-sm">
                {cities?.map(({ id, name }) => (
                  <tr key={id}>
                    <Td
                      isLastRow={id === cities.length - 1}
                      position="beginning">
                      {name}
                    </Td>
                    <Td
                      isLastRow={id === cities.length - 1}
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
              <p>No cities added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading cities..." />
          </div>
        )}
        <Button
          text="add city"
          className="text-xs mr-auto ml-4"
          onClick={addCityClickHandler}
        />
      </div>
    </>
  );
};

export default CitiesSection;
