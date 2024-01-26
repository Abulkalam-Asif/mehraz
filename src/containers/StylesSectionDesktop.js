import { Button, H2, Th, Td, Spinner, Dropdown } from "@/components";
import { Table } from ".";
import { deleteIcon, editIcon, ellipsisIcon, linkIcon } from "@/assets";
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
                <Th position="beginning">name</Th>
                <Th position="end">image</Th>
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
                  <Td
                    position="end"
                    align="center"
                    isLastRow={i === styles.length - 1}>
                    <Dropdown
                      className="w-fit"
                      contentClassName={
                        "w-max flex items-center bg-white border-2 border-accent-1-base px-1 rounded-lg shadow-dropdown absolute top-1/2 -translate-y-1/2 -left-1 -translate-x-full"
                      }
                      buttonClassName="hover:bg-accent-1-extra-light p-1.5 rounded-full"
                      triggerContent={
                        <>
                          <Image
                            src={ellipsisIcon}
                            alt="ellipsis"
                            className="min-w-3 w-3"
                          />
                        </>
                      }>
                      <button
                        title="Edit style"
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image src={editIcon} alt="edit" className="w-4" />
                      </button>
                      <button
                        title="Delete style"
                        className="hover:bg-accent-1-extra-light p-2 rounded-full">
                        <Image src={deleteIcon} alt="delete" className="w-4" />
                      </button>
                    </Dropdown>
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
