import {
  AdminTableContainer,
  H2,
  Table,
  Td,
  Th,
  MaterialQtyInput,
} from "@/components";

const RPMaterialsSection = ({
  title,
  materials,
  selectedMaterials,
  inputHandler,
  className = "",
  isErrorOccurredWhileFetching = false,
}) => {
  return (
    <>
      <AdminTableContainer
        className={`w-full flex flex-col gap-y-2 ${className}`}>
        <H2 text={title} />
        {(isErrorOccurredWhileFetching && !materials) ||
        materials?.length === 0 ? (
          <div className="flex-1 font-medium flex items-center justify-center">
            <p className="text-red-500">No materials found.</p>
          </div>
        ) : (
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
                      checked={selectedMaterials?.some(
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
                  <Td position="end" isLastRow={index === materials.length - 1}>
                    <MaterialQtyInput
                      value={
                        selectedMaterials?.find(material => material.id === id)
                          ?.quantity || 1
                      }
                      disabled={
                        !selectedMaterials?.some(material => material.id === id)
                      }
                      min={1}
                      max={999}
                      inputHandler={value => {
                        inputHandler(
                          "materials",
                          selectedMaterials?.map(material => {
                            if (material.id === id) {
                              return { ...material, quantity: value };
                            }
                            return material;
                          }),
                        );
                      }}
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </AdminTableContainer>
    </>
  );
};

export default RPMaterialsSection;
