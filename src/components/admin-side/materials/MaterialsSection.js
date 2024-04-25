import Image from "next/image";
import {
  Dropdown,
  Table,
  Td,
  Th,
  AdminTableContainer,
  Button,
  Spinner,
} from "@/components/";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const MaterialsSection = ({
  materials,
  materialCategories,
  setModalMetadata,
  toggleModal,
  setCurrentMaterial,
  setItemToDelete,
  cities,
}) => {
  const { showAlert } = useContext(AlertContext);
  const addMaterialClickHandler = () => {
    if (materialCategories.length === 0) {
      showAlert({
        type: "ERROR",
        message: "Please add a material category first.",
      });
      return;
    }
    setModalMetadata({
      type: "MATERIALS",
      action: "ADD",
    });
    toggleModal();
  };

  const editMaterialClickHandler = e => {
    setModalMetadata({
      type: "MATERIALS",
      action: "EDIT",
    });
    toggleModal();
    const materialId = e.currentTarget.dataset.materialId;
    const material = materials.find(material => material.id === materialId);
    setCurrentMaterial({
      ...material,
      isFixed: materialCategories.some(
        category => category.fixedMaterialId === material.id,
      ),
    });
  };
  const deleteMaterialClickHandler = e => {
    setModalMetadata({
      type: "MATERIALS",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "material",
      id: e.currentTarget.dataset.materialId,
    });
  };
  return (
    <>
      <AdminTableContainer className="w-full row-span-3 flex flex-col gap-y-2">
        {materials ? (
          materials.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="bg-accent-1-base text-sm">
                <tr>
                  <Th position="beginning">fix</Th>
                  <Th>name</Th>
                  <Th>vendor</Th>
                  <Th>rate</Th>
                  <Th>category</Th>
                  <Th>description</Th>
                  <Th>specs</Th>
                  <Th>cities</Th>
                  <Th position="end">ordered as</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {materials?.map((material, index) => (
                  <tr key={index}>
                    <Td
                      align="center"
                      position="beginning"
                      isLastRow={index === materials.length - 1}>
                      {materialCategories.some(
                        category => category.fixedMaterialId === material.id,
                      ) ? (
                        <FaCheckCircle size={14} className="text-green-500" />
                      ) : (
                        <FaMinusCircle size={14} />
                      )}
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {material.name}
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {material.vendor}
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {material.rate}
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {
                        materialCategories?.find(
                          category => category.id === material.category,
                        )?.name
                      }
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {material.description}
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      <ul className="list-disc list-inside">
                        {material.specs
                          ?.filter(spec => spec !== "")
                          ?.map((spec, index) => (
                            <li key={index}>{spec}</li>
                          ))}
                      </ul>
                    </Td>

                    <Td isLastRow={index === materials.length - 1}>
                      <ul className="list-disc list-inside">
                        {material.cities
                          ?.map(
                            cityId =>
                              cities.find(city => city.id === cityId)?.name,
                          )
                          ?.map((city, index) => (
                            <li key={index}>{city}</li>
                          ))}
                      </ul>
                    </Td>
                    <Td isLastRow={index === materials.length - 1}>
                      {material.orderedAs}
                    </Td>
                    <Td
                      position="end"
                      align="center"
                      isLastRow={index === materials.length - 1}>
                      <Dropdown
                        className="w-fit"
                        contentClassName={
                          "w-max flex items-center bg-white border-2 border-accent-1-base px-1 rounded-lg shadow-dropdown absolute top-1/2 -translate-y-1/2 -left-1 -translate-x-full"
                        }
                        buttonClassName="hover:bg-accent-1-extra-light p-1.5 rounded-full lg:p-2"
                        triggerContent={
                          <>
                            <Image
                              src={ellipsisIcon}
                              alt="ellipsis"
                              className="min-w-4 w-4 lg:min-w-5 lg:w-5"
                            />
                          </>
                        }>
                        <button
                          title="Edit material"
                          data-material-id={material.id}
                          onClick={editMaterialClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={editIcon}
                            alt="edit"
                            className="w-4 lg:w-5"
                          />
                        </button>
                        <button
                          title="Delete material"
                          data-material-id={material.id}
                          onClick={deleteMaterialClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={deleteIcon}
                            alt="delete"
                            className="w-4 lg:w-5"
                          />
                        </button>
                      </Dropdown>
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
            <Spinner size={"sm"} text="Loading materials..." />
          </div>
        )}
        <Button
          text="add material"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addMaterialClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default MaterialsSection;
