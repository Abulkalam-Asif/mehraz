import {
  Button,
  Dropdown,
  H2,
  Td,
  Th,
  Table,
  RACContainer,
} from "@/components";
import Image from "next/image";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const CurrenciesSection = ({
  currencies,
  setCurrentCurrency,
  setModalMetadata,
  toggleModal,
  setItemToDelete,
  citiesCount,
  isErrorOccurredWhileFetching = false,
}) => {
  const { showAlert } = useContext(AlertContext);
  const addCurrencyClickHandler = () => {
    if (citiesCount === 0) {
      showAlert({
        type: "WARNING",
        message: "Please add at least one city to add a currency.",
      });
      return;
    }
    setModalMetadata({
      type: "CURRENCY",
      action: "ADD",
    });
    toggleModal();
  };

  const editCurrencyClickHandler = e => {
    setModalMetadata({
      type: "CURRENCY",
      action: "EDIT",
    });
    toggleModal();
    const currencyId = e.currentTarget.dataset.currencyId;
    const currency = currencies.find(currency => currency.id === currencyId);
    // Just using the ids of the cities
    const cities = currency.cities.map(({ id }) => id);
    setCurrentCurrency({
      ...currency,
      cities,
    });
  };

  const deleteCurrencyClickHandler = e => {
    setModalMetadata({
      type: "CURRENCY",
      action: "DELETE",
    });
    toggleModal();
    const currencyId = e.currentTarget.dataset.currencyId;
    const currency = currencies.find(currency => currency.id === currencyId);
    setItemToDelete({
      id: currency.id,
      name: "currency",
    });
  };

  return (
    <>
      <RACContainer className="row-span-1 flex flex-col gap-y-2 lg:w-full lg:overflow-y-hidden lg:row-span-full">
        <H2 text="currencies" />
        {isErrorOccurredWhileFetching || currencies?.length === 0 ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No currencies found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto">
            <thead className="bg-accent-1-base text-sm">
              <tr>
                <Th position="beginning">name</Th>
                <Th>cities</Th>
                <Th position="end">in pkr</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {currencies?.map((currency, index) => (
                <tr key={index}>
                  <Td
                    position="beginning"
                    isLastRow={index === currencies.length - 1}>
                    {currency.name}
                  </Td>
                  <Td isLastRow={index === currencies.length - 1}>
                    {currency.cities?.map(({ id, name }, cityIndex) => (
                      <span key={id}>
                        <span>{name}</span>
                        {cityIndex !== currency.cities.length - 1 && (
                          <span>, </span>
                        )}
                      </span>
                    ))}
                  </Td>
                  <Td isLastRow={index === currencies.length - 1}>
                    {currency.valueInPkr}
                  </Td>
                  <Td
                    position="end"
                    isLastRow={index === currencies.length - 1}>
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
                        data-currency-id={currency.id}
                        onClick={editCurrencyClickHandler}
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image
                          src={editIcon}
                          alt="edit"
                          className="w-4 lg:w-5"
                        />
                      </button>
                      <button
                        title="Delete currency"
                        data-currency-id={currency.id}
                        onClick={deleteCurrencyClickHandler}
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
          text="add currency"
          className="mr-auto ml-4"
          size="xs"
          onClick={addCurrencyClickHandler}
        />
      </RACContainer>
    </>
  );
};

export default CurrenciesSection;
