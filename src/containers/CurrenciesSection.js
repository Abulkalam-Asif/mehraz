import { Button, Dropdown, H2, Spinner, Td, Th } from "@/components";
import { Table, RolesAnalyticsCitiesContainer } from "./";
import Image from "next/image";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";

const CurrenciesSection = ({ currencies, setModalMetadata, toggleModal }) => {
  const addCurrencyClickHandler = () => {
    setModalMetadata({
      type: "currency",
      action: "add",
    });
    toggleModal();
  };
  const editCurrencyClickHandler = () => {
    setModalMetadata({
      type: "currency",
      action: "edit",
    });
    toggleModal();
    // const currencyId = e.target.dataset.currencyId;
    // const currency = currencies.find((currency) => currency.id === currencyId);
    // setCurrentCurrency(currency);
  };

  return (
    <>
      <RolesAnalyticsCitiesContainer className="row-span-1 flex flex-col gap-y-2 lg:w-full lg:overflow-y-hidden lg:row-span-full">
        <H2 text="currencies" />
        {currencies ? (
          currencies.length > 0 ? (
            <>
              <Table border={false} className="h-full overflow-y-auto">
                <thead className="bg-accent-1-base text-sm">
                  <tr>
                    <Th position="beginning">name</Th>
                    <Th>cities</Th>
                    <Th position="end">in pkr</Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {currencies?.map((currency, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === currencies.length - 1}>
                        {currency.name}
                      </Td>
                      <Td isLastRow={i === currencies.length - 1}>
                        {/* {currency.cities?.map(({ id, name }) => (
                          <span key={id}>
                            <span>{name}</span>
                            {i !== currency.cities.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        ))} */}
                      </Td>
                      <Td isLastRow={i === currencies.length - 1}>
                        {currency.valueInPkr}
                      </Td>
                      <Td
                        position="end"
                        isLastRow={i === currencies.length - 1}>
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
                            title="Edit currency"
                            className="hover:bg-accent-1-extra-light p-2 rounded-full">
                            <Image
                              src={editIcon}
                              alt="edit"
                              className="w-4 lg:w-5"
                            />
                          </button>
                          <button
                            title="Delete currency"
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
            </>
          ) : (
            <div className="flex-1 font-medium flex items-center justify-center">
              <p>No currencies added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading currencies..." />
          </div>
        )}
        <Button
          text="add currency"
          className="text-xs mr-auto ml-4"
          onClick={addCurrencyClickHandler}
        />
      </RolesAnalyticsCitiesContainer>
    </>
  );
};

export default CurrenciesSection;
