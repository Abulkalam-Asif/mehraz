import { Button, H2, Th, Td, Spinner, Dropdown } from "@/components";
import { Table } from ".";
import Image from "next/image";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";

const CurrenciesSection = ({ plots, setModalContent, toggleModal }) => {
  return (
    <>
      <div className="flex flex-col gap-y-2 lg:h-full lg:overflow-y-hidden">
        <H2 text="plots" />
        {plots ? (
          // TODO: Show "No plots found" if plots.length === 0
          <Table border={false} className="h-full overflow-y-auto py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning">area</Th>
                <Th position="end">unit</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {plots?.map((plot, i) => (
                <tr key={i}>
                  <Td position="beginning" isLastRow={i === plots.length - 1}>
                    {plot.area}
                  </Td>
                  <Td isLastRow={i === plots.length - 1}>{plot.unit}</Td>
                  <Td
                    align="center"
                    position="end"
                    isLastRow={i === plots.length - 1}>
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
                        title="Edit plot"
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image src={editIcon} alt="edit" className="w-4 lg:w-5" />
                      </button>
                      <button
                        title="Delete plot"
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image src={deleteIcon} alt="delete" className="w-4 lg:w-5" />
                      </button>
                    </Dropdown>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading plots..." />
          </div>
        )}

        <Button
          text="add plot"
          onClick={() => {
            setModalContent("plot");
            toggleModal();
          }}
          className="text-xs mr-auto ml-4"
        />
      </div>
    </>
  );
};

export default CurrenciesSection;
