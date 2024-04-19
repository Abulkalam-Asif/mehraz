import {
  AdminTableContainer,
  H2,
  RPServicesInput,
  Spinner,
  Table,
  Td,
  Th,
} from "@/components";

const ProductRatesSection = ({
  designRates,
  constructionRates,
  readyProjectS4InputHandler,
  className = "",
  currentDesignAreaInSqFt,
}) => {
  return (
    <>
      <AdminTableContainer
        className={`w-full flex flex-col gap-y-4 overflow-y-auto ${className}`}>
        <div>
          <H2 text={"design"} className="mb-2" />
          {designRates ? (
            designRates.length > 0 ? (
              <Table border={false}>
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning">Service</Th>
                    <Th>Rate</Th>
                    <Th position="end">Cost</Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium">
                  {designRates.map((designRate, index) => (
                    <tr key={index}>
                      <Td
                        className="px-2 py-1"
                        position="beginning"
                        isLastRow={designRates.length - 1 === index}>
                        {designRate.service}
                      </Td>
                      <Td isLastRow={designRates.length - 1 === index}>
                        <RPServicesInput
                          value={designRate.rate}
                          fieldType="rate"
                          productType="designRates"
                          inputHandler={readyProjectS4InputHandler}
                          rateId={designRate.id}
                          rates={designRates}
                          currentDesignAreaInSqFt={currentDesignAreaInSqFt}
                        />
                      </Td>
                      <Td
                        position="end"
                        isLastRow={designRates.length - 1 === index}>
                        <RPServicesInput
                          value={designRate.cost}
                          fieldType="cost"
                          productType="designRates"
                          inputHandler={readyProjectS4InputHandler}
                          rateId={designRate.id}
                          rates={designRates}
                          currentDesignAreaInSqFt={currentDesignAreaInSqFt}
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="flex-1 font-medium flex items-center justify-center">
                <p>No design services added yet.</p>
              </div>
            )
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Spinner size={"sm"} text="Loading design services..." />
            </div>
          )}
        </div>
        <div>
          <H2 text={"construction"} className="mb-2" />
          {constructionRates ? (
            constructionRates.length > 0 ? (
              <Table border={false}>
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning">Service</Th>
                    <Th>Rate</Th>
                    <Th position="end">Cost</Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium">
                  {constructionRates.map((constructionRate, index) => (
                    <tr key={index}>
                      <Td
                        className="px-2 py-1"
                        position="beginning"
                        isLastRow={constructionRates.length - 1 === index}>
                        {constructionRate.service}
                      </Td>
                      <Td isLastRow={constructionRates.length - 1 === index}>
                        <RPServicesInput
                          value={constructionRate.rate}
                          fieldType="rate"
                          productType="constructionRates"
                          rateId={constructionRate.id}
                          inputHandler={readyProjectS4InputHandler}
                          rates={constructionRates}
                          currentDesignAreaInSqFt={currentDesignAreaInSqFt}
                        />
                      </Td>
                      <Td
                        position="end"
                        isLastRow={constructionRates.length - 1 === index}>
                        <RPServicesInput
                          value={constructionRate.cost}
                          fieldType="cost"
                          productType="constructionRates"
                          rateId={constructionRate.id}
                          inputHandler={readyProjectS4InputHandler}
                          rates={constructionRates}
                          currentDesignAreaInSqFt={currentDesignAreaInSqFt}
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="flex-1 font-medium flex items-center justify-center">
                <p>No construction services added yet.</p>
              </div>
            )
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Spinner size={"sm"} text="Loading construction services..." />
            </div>
          )}
        </div>
      </AdminTableContainer>
    </>
  );
};

export default ProductRatesSection;
