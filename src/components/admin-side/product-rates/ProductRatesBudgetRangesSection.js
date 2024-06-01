import {
  AdminTableContainer,
  Button,
  H2,
  ProductRatesInput,
  Table,
  Td,
  Th,
} from "@/components";

const ProductRatesBudgetRangesSection = ({
  newBudgetRanges,
  isErrorOccurredWhileFetching,
  newBudgetRangesInputHandler,
  updateBudgetRangesHandler,
}) => {
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2 row-span-2">
        <H2 text={"budget"} />
        {isErrorOccurredWhileFetching ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No data found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning">type</Th>
                <Th>min</Th>
                <Th position="end">max</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {newBudgetRanges?.map(budgetRange => (
                <tr key={budgetRange.id}>
                  <Td
                    position="beginning"
                    isLastRow={budgetRange.id === "HIGH"}>
                    {budgetRange.id}
                  </Td>
                  <Td isLastRow={budgetRange.id === "HIGH"}>
                    <ProductRatesInput
                      value={budgetRange.min}
                      inputHandler={value =>
                        newBudgetRangesInputHandler(
                          budgetRange.id,
                          "min",
                          value,
                        )
                      }
                      min={1}
                      max={100000000}
                      type="number"
                    />
                  </Td>
                  <Td position="end" isLastRow={budgetRange.id === "HIGH"}>
                    <ProductRatesInput
                      value={budgetRange.max}
                      inputHandler={value =>
                        newBudgetRangesInputHandler(
                          budgetRange.id,
                          "max",
                          value,
                        )
                      }
                      min={1}
                      max={100000000}
                      type="number"
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Button
          text="update budget"
          className="ml-auto mr-4"
          type="button"
          size="sm"
          onClick={updateBudgetRangesHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default ProductRatesBudgetRangesSection;
