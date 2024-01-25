import { Button, H2, Th, Td, Spinner } from "@/components";
import { Table } from ".";
import Image from "next/image";
import { linkIcon } from "@/assets";

const CurrenciesSectionDesktop = ({
  officeLocations,
  setModalContent,
  toggleModal,
}) => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <H2 text="office locations" />
        {officeLocations ? (
          <Table border={false} className="h-full overflow-y-auto px-3 py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning" className="w-1/4">
                  city
                </Th>
                <Th className="w-1/4">address</Th>
                <Th className="w-1/4">link</Th>
                <Th position="end" className="w-1/4">
                  image
                </Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {officeLocations.map((location, i) => (
                <tr key={i}>
                  <Td
                    position="beginning"
                    isLastRow={i === officeLocations.length - 1}>
                    {location.city}
                  </Td>
                  <Td isLastRow={i === officeLocations.length - 1}>
                    {location.address}
                  </Td>
                  <Td isLastRow={i === officeLocations.length - 1}>
                    <a
                      target="_blank"
                      href={location.mapsLink}
                      className="underline flex items-center gap-2">
                      <span>link to maps</span>
                      <Image src={linkIcon} alt="link" />
                    </a>
                  </Td>
                  <Td
                    position="end"
                    isLastRow={i === officeLocations.length - 1}>
                    <a
                      target="_blank"
                      href={location.image}
                      className="underline flex items-center gap-2">
                      <span>image</span>
                      <Image src={linkIcon} alt="link" />
                    </a>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading offices..." />
          </div>
        )}
        <Button
          text="add office"
          onClick={() => {
            setModalContent("office");
            toggleModal();
          }}
          className="text-xs mr-auto"
        />
      </div>
    </>
  );
};

export default CurrenciesSectionDesktop;
