import { Spinner, AdminTableContainer, H2, Table, Td, Th } from "@/components";

const RPMaterialsSection = ({
  title,
  materials,
  selectedMaterials,
  inputHandler,
  className = "",
}) => {
  return (
    <>
      <AdminTableContainer
        className={`w-full flex flex-col gap-y-2 ${className}`}>
        <H2 text={title} />
        {materials ? (
          materials?.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="text-sm">
                <tr>
                  <Th position="beginning">select</Th>
                  <Th>name</Th>
                  <Th>vendor</Th>
                  <Th position="end">qty</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {materials?.map(({ id, name, vendor }, index) => (
                  <tr key={id}>
                    <Td
                      align="center"
                      position="beginning"
                      className="p-1  "
                      isLastRow={index === materials.length - 1}>
                      <input
                        type="checkbox"
                        checked={selectedMaterials?.includes(
                          material => material.id === id,
                        )}
                        onChange={e => {
                          if (e.target.checked) {
                            inputHandler("materials", [
                              ...selectedMaterials,
                              { id, quantity: 1 },
                            ]);
                          } else {
                            inputHandler(
                              "materials",
                              selectedMaterials?.filter(
                                material => material.id !== id,
                              ),
                            );
                          }
                        }}
                      />
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>{name}</Td>
                    <Td isLastRow={index === materials.length - 1}>{vendor}</Td>
                    <Td
                      position="end"
                      isLastRow={index === materials.length - 1}>
                      {selectedMaterials?.find(
                        material => material.id === id,
                      ) ? (
                        <input />
                      ) : (
                        <></>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="flex-1 font-medium flex items-center justify-center">
              <p>No materials added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading views..." />
          </div>
        )}
      </AdminTableContainer>
    </>
  );
};

export default RPMaterialsSection;
