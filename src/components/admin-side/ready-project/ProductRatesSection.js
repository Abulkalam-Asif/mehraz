"use client";
import {
  AdminInputBox,
  AdminTableContainer,
  H2,
  RPServicesInput,
  Spinner,
  Table,
  Td,
  Th,
} from "@/components";
import { useEffect } from "react";

const ProductRatesSection = ({
  designRates,
  constructionRates,
  readyProjectS4InputHandler,
  className = "",
  currentDesignAreaInSqFt,
  discount,
  totalCost,
  isErrorOccurredWhileFetching = false,
}) => {
  useEffect(() => {
    let total;
    if (designRates?.length > 0 && constructionRates?.length > 0) {
      total = Math.round(
        designRates?.reduce((acc, rate) => acc + Number(rate.cost), 0) +
          constructionRates?.reduce((acc, rate) => acc + Number(rate.cost), 0) *
            (1 - discount / 100),
      );
    } else {
      total = 0;
    }
    if (total !== totalCost) {
      readyProjectS4InputHandler("totalCost", total);
    }
  }, [designRates, constructionRates, discount, totalCost]);

  return (
    <>
      <AdminTableContainer
        className={`w-full relative flex flex-col gap-y-2 ${className}`}>
        <div className="w-full flex-1 flex flex-col gap-y-4 overflow-y-auto">
          <div>
            <H2 text={"design"} className="mb-2" />
            {isErrorOccurredWhileFetching && designRates.length === 0 ? (
              <div className="flex-1 font-medium flex items-center justify-center">
                <p className="text-red-500">No design services added yet.</p>
              </div>
            ) : (
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
                          min={0}
                          max={99999}
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
                          min={0}
                          max={99999999}
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
          <div>
            <H2 text={"construction"} className="mb-2" />
            {isErrorOccurredWhileFetching && constructionRates.length === 0 ? (
              <div className="flex-1 font-medium flex items-center justify-center">
                <p className="text-red-500">
                  No construction services added yet.
                </p>
              </div>
            ) : (
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
                          min={0}
                          max={99999}
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
                          min={0}
                          max={99999999}
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
        <div className="w-full flex items-center gap-2 py-2 bg-white">
          <AdminInputBox
            label="Discount (%)"
            min={0}
            max={100}
            type="number"
            className="w-full"
            value={discount}
            inputHandler={readyProjectS4InputHandler}
            idHtmlFor="discount"
            name="discount"
            required={true}
          />
          <AdminInputBox
            label="Total (PKR)"
            min={0}
            max={99999999}
            type="number"
            className="w-full"
            value={totalCost}
            idHtmlFor="totalCost"
            name="totalCost"
            required={true}
            disabled={true}
          />
        </div>
      </AdminTableContainer>
    </>
  );
};

export default ProductRatesSection;
