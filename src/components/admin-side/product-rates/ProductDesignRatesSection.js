import Image from "next/image";
import {
  Dropdown,
  H2,
  Table,
  Td,
  Th,
  AdminTableContainer,
  Button,
} from "@/components/";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";

const ProductDesignRatesSection = ({
  designRates,
  isErrorOccurredWhileFetching,
  setModalMetadata,
  toggleModal,
  setCurrentDesignRate,
  setItemToDelete,
}) => {
  const addDesignRateClickHandler = () => {
    setModalMetadata({
      type: "DESIGN_RATES",
      action: "ADD",
    });
    toggleModal();
  };

  const editDesignRateClickHandler = e => {
    setModalMetadata({
      type: "DESIGN_RATES",
      action: "EDIT",
    });
    const serviceId = e.currentTarget.dataset.serviceId;
    toggleModal();
    const designRate = designRates.find(rate => rate.id === serviceId);
    setCurrentDesignRate(designRate);
  };
  const deleteDesignRateClickHandler = e => {
    setModalMetadata({
      type: "DESIGN_RATES",
      action: "DELETE",
    });
    toggleModal();
    const serviceId = e.currentTarget.dataset.serviceId;
    const designRate = designRates.find(rate => rate.id === serviceId);
    setItemToDelete({
      id: serviceId,
      name: "design rate",
    });
  };
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2 row-span-2">
        <H2 text={"Design"} />
        {isErrorOccurredWhileFetching || designRates?.length === 0 ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No design rates found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning">Fix</Th>
                <Th>service</Th>
                <Th>rate</Th>
                <Th position="end">description</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {designRates?.map((designRate, index) => (
                <tr key={index}>
                  <Td
                    position="beginning"
                    isLastRow={index === designRates.length - 1}>
                    {designRate?.isFixed ? (
                      <FaCheckCircle size={14} className="text-green-500" />
                    ) : (
                      <FaMinusCircle size={14} />
                    )}
                  </Td>
                  <Td isLastRow={index === designRates.length - 1}>
                    {designRate.service}
                  </Td>
                  <Td isLastRow={index === designRates.length - 1}>
                    {designRate.rate}
                  </Td>
                  <Td isLastRow={index === designRates.length - 1}>
                    {designRate.description}
                  </Td>
                  <Td
                    align="center"
                    position="end"
                    isLastRow={index === designRates.length - 1}>
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
                        title="Edit service"
                        data-service-id={designRate.id}
                        onClick={editDesignRateClickHandler}
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image
                          src={editIcon}
                          alt="edit"
                          className="w-4 lg:w-5"
                        />
                      </button>
                      <button
                        title="Delete service"
                        data-service-id={designRate.id}
                        onClick={deleteDesignRateClickHandler}
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
          text="add design rate"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addDesignRateClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default ProductDesignRatesSection;
