import {
  AdminTableContainer,
  Button,
  H2,
  ProductRatesInput,
  Table,
  Td,
  Th,
} from "@/components";

const ProductRatesChangesSection = ({
  newChanges,
  isErrorOccurredWhileFetching,
  newChangesInputHandler,
  updateChangesHandler,
}) => {
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2 row-span-2">
        <H2 text={"changes"} />
        {isErrorOccurredWhileFetching ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No data found.</p>
          </div>
        ) : (
          <Table border={false} className="h-full overflow-y-auto py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning">type</Th>
                <Th>changes</Th>
                <Th position="end">rate</Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {newChanges?.map(change => (
                <tr key={change.id}>
                  <Td position="beginning" isLastRow={change.id === "HIGH"}>
                    {change.id}
                  </Td>
                  <Td isLastRow={change.id === "HIGH"}>
                    <ProductRatesInput
                      value={change.changes}
                      inputHandler={value =>
                        newChangesInputHandler(change.id, "changes", value)
                      }
                      maxLength={20}
                    />
                  </Td>
                  <Td position="end" isLastRow={change.id === "HIGH"}>
                    <ProductRatesInput
                      value={change.rate}
                      inputHandler={value =>
                        newChangesInputHandler(change.id, "rate", value)
                      }
                      maxLength={20}
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Button
          text="update changes"
          className="ml-auto mr-4"
          type="button"
          size="sm"
          onClick={updateChangesHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default ProductRatesChangesSection;
