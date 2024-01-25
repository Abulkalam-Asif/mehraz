import { Button, H2, Th, Td, Spinner } from "@/components";
import { Table } from ".";
import { linkIcon } from "@/assets";
import Image from "next/image";

const CurrenciesSectionDesktop = ({ styles, setModalContent, toggleModal }) => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <H2 text="styles" />
        {styles ? (
          <Table border={false} className="h-full overflow-y-auto px-3 py-2">
            <thead className="text-sm">
              <tr>
                <Th position="beginning" className="w-1/2">
                  name
                </Th>
                <Th position="end" className="w-1/2">
                  image
                </Th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold">
              {styles?.map((style, i) => (
                <tr key={i}>
                  <Td position="beginning" isLastRow={i === styles.length - 1}>
                    {style.name}
                  </Td>
                  <Td position="end" isLastRow={i === styles.length - 1}>
                    <a
                      target="_blank"
                      href={style.image}
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
            <Spinner size={"sm"} text="Loading styles..." />
          </div>
        )}
        <Button
          text="add style"
          className="text-xs mr-auto"
          onClick={() => {
            setModalContent("style");
            toggleModal();
          }}
        />
      </div>
    </>
  );
};

export default CurrenciesSectionDesktop;
