import { Button, H2, Spinner, Td } from "@/components";
import { Table } from ".";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import Image from "next/image";

const CurrenciesSectionDesktop = ({
  cities,
  setModalContent,
  toggleModal,
  editCityHandler,
}) => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <H2 text="cities" />
        {cities ? (
          <Table border={false} className="h-full overflow-y-auto px-3 py-2">
            <tbody className="text-sm">
              {cities.map((city, i) => (
                <tr key={i}>
                  <Td isLastRow={i === cities.length - 1} position="beginning">
                    {city}
                  </Td>
                  <Td
                    isLastRow={i === cities.length - 1}
                    position="end"
                    align="center">
                    <button>
                      <Image src={ellipsisIcon} alt="ellipsis" />
                    </button>
                    {/* <button
                        onClick={editCityHandler}
                        // data-city-id={city} TODO: Add ID of the city here
                        className="hover:bg-accent-1-base p-1.5 rounded-full">
                        <Image src={editIcon} alt="edit" className="w-4" />
                      </button>
                      <button
                        className="hover:bg-accent-1-base p-1.5 rounded-full"
                        // onClick={deleteProjectHandler}
                        // data-project-id={project_id}
                      >
                        <Image src={deleteIcon} alt="delete" className="w-4" />
                      </button> */}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading cities..." />
          </div>
        )}
        <Button
          text="add city"
          className="text-xs mr-auto"
          onClick={() => {
            setModalContent("city");
            toggleModal();
          }}
        />
      </div>
    </>
  );
};

export default CurrenciesSectionDesktop;
