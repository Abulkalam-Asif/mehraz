import { Button, H2, Spinner, Td, Th } from "@/components";
import { Table, RolesAnalyticsCitiesContainer } from "./";

const CurrenciesSectionDesktop = ({
  currencies,
  setModalContent,
  toggleModal,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesContainer className="row-span-1 flex flex-col gap-y-2">
        <H2 text="currencies" />
        {currencies ? (
          <>
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="bg-accent-1-base text-sm">
                <tr>
                  <Th position="beginning" className="w-1/4 xl:w-1/3">
                    name
                  </Th>
                  <Th className="w-1/2 xl:w-1/3">cities</Th>
                  <Th position="end" className="w-1/4 xl:w-1/3">
                    in pkr
                  </Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {currencies.map((currency, i) => (
                  <tr key={i}>
                    <Td
                      position="beginning"
                      isLastRow={i === currencies.length - 1}>
                      {currency.name}
                    </Td>
                    <Td
                      isLastRow={i === currencies.length - 1}
                      className="flex gap-x-2 flex-wrap border-x-0">
                      {currency.cities.map((city, i) => (
                        <span key={i}>{city}</span>
                      ))}
                    </Td>
                    <Td position="end" isLastRow={i === currencies.length - 1}>
                      {currency.valueInPkr}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading currencies..." />
          </div>
        )}
        <Button
          text="add currency"
          className="text-xs mr-auto"
          onClick={() => {
            setModalContent("currency");
            toggleModal();
          }}
        />
      </RolesAnalyticsCitiesContainer>
    </>
  );
};

export default CurrenciesSectionDesktop;
