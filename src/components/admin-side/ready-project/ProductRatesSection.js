"use client";
import { AdminTableContainer, H2, Spinner, Table, Td, Th } from "@/components";
import { useEffect, useState } from "react";

const ProductRatesSection = ({ productRatesData, className = "" }) => {
  const [designServices, setDesignServices] = useState(null);
  const [constructionServices, setConstructionServices] = useState(null);
  useEffect(() => {
    setDesignServices(
      productRatesData?.filter(productRate => productRate.type === "DESIGN"),
    );
    setConstructionServices(
      productRatesData?.filter(
        productRate => productRate.type === "CONSTRUCTION",
      ),
    );
  }, [productRatesData]);

  return (
    <>
      <AdminTableContainer
        className={`w-full flex flex-col gap-y-2 ${className}`}>
        <H2 text={"design"} />
        {designServices ? (
          designServices.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead>
                <tr>
                  <Th position="beginning">Service</Th>
                  <Th>Rate</Th>
                  <Th position="end">Cost</Th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {designServices.map((designService, index) => (
                  <tr key={index}>
                    <Td
                      className="px-2 py-1"
                      position="beginning"
                      isLastRow={designServices.length - 1 === index}>
                      {designService.service}
                    </Td>
                    <Td isLastRow={designServices.length - 1 === index}>
                      <input type="number" />
                    </Td>
                    <Td
                      position="end"
                      isLastRow={designServices.length - 1 === index}>
                      <input type="number" />
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
        <H2 text={"construction"} />
        {constructionServices ? (
          constructionServices.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead>
                <tr>
                  <Th position="beginning">Service</Th>
                  <Th>Rate</Th>
                  <Th position="end">Cost</Th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {constructionServices.map((construcionService, index) => (
                  <tr key={index}>
                    <Td
                      className="px-2 py-1"
                      position="beginning"
                      isLastRow={constructionServices.length - 1 === index}>
                      {construcionService.service}
                    </Td>
                    <Td isLastRow={constructionServices.length - 1 === index}>
                      <input type="number" />
                    </Td>
                    <Td
                      position="end"
                      isLastRow={constructionServices.length - 1 === index}>
                      <input type="number" />
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
      </AdminTableContainer>
    </>
  );
};

export default ProductRatesSection;
