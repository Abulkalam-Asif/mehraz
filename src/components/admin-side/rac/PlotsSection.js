import { Button, H2, Th, Td, Dropdown, Table } from "@/components";
import Image from "next/image";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import { FaCheckCircle } from "react-icons/fa";

const PlotsSection = ({
  plots,
  units,
  setCurrentPlot,
  setModalMetadata,
  toggleModal,
  setItemToDelete,
  isErrorOccurredWhileFetching = false,
}) => {
  const addPlotClickHandler = () => {
    setModalMetadata({
      type: "PLOT",
      action: "ADD",
    });
    toggleModal();
  };
  const editPlotClickHandler = e => {
    setModalMetadata({
      type: "PLOT",
      action: "EDIT",
    });
    toggleModal();
    const plotId = e.currentTarget.dataset.plotId;
    const plot = plots.find(plot => plot.id === plotId);
    setCurrentPlot(plot);
  };

  const deletePlotClickHandler = e => {
    setModalMetadata({
      type: "PLOT",
      action: "DELETE",
    });
    toggleModal();
    const plotId = e.currentTarget.dataset.plotId;
    const plot = plots.find(plot => plot.id === plotId);
    setItemToDelete({
      id: plot.id,
      name: "plot",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-2 lg:h-full lg:overflow-y-hidden">
        <H2 text="plots" />
        {isErrorOccurredWhileFetching || plots?.length === 0 ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No plots found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning">area</Th>
                <Th>unit</Th>
                <Th position="end">&lt;</Th>
                <Th position="end">&ge;</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {plots?.map((plot, index) => (
                <tr key={index}>
                  <Td
                    position="beginning"
                    isLastRow={index === plots.length - 1}>
                    {plot.area}
                  </Td>
                  <Td isLastRow={index === plots.length - 1}>
                    {units?.find(unit => unit.id === plot.unit)?.name}
                  </Td>
                  <Td isLastRow={index === plots.length - 1} align="center">
                    {plot.category === "UPTO_18" && (
                      <FaCheckCircle size={14} className="text-green-500" />
                    )}
                  </Td>
                  <Td isLastRow={index === plots.length - 1} align="center">
                    {plot.category === "1_KANAL_ABOVE" && (
                      <FaCheckCircle size={14} className="text-green-500" />
                    )}
                  </Td>
                  <Td
                    align="center"
                    position="end"
                    isLastRow={index === plots.length - 1}>
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
                        data-plot-id={plot.id}
                        onClick={editPlotClickHandler}
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image
                          src={editIcon}
                          alt="edit"
                          className="w-4 lg:w-5"
                        />
                      </button>
                      <button
                        title="Delete plot"
                        data-plot-id={plot.id}
                        onClick={deletePlotClickHandler}
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
          text="add plot"
          onClick={addPlotClickHandler}
          className="mr-auto ml-4"
          size="xs"
        />
      </div>
    </>
  );
};

export default PlotsSection;
