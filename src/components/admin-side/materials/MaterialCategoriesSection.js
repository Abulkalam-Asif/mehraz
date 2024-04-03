import Image from "next/image";
import {
  Dropdown,
  H2,
  Table,
  Td,
  Th,
  AdminTableContainer,
  Button,
  Spinner,
} from "@/components/";
import { deleteIcon, editIcon, ellipsisIcon } from "@/assets";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";

const MaterialCategoriesSection = ({
  materialCategories,
  setModalMetadata,
  toggleModal,
  setCurrentMaterialCategory,
  setItemToDelete,
}) => {
  const addMaterialCategoryClickHandler = () => {
    setModalMetadata({
      type: "MATERIAL_CATEGORIES",
      action: "ADD",
    });
    toggleModal();
  };

  const editMaterialCategoryClickHandler = e => {
    setModalMetadata({
      type: "MATERIAL_CATEGORIES",
      action: "EDIT",
    });
    toggleModal();
    const materialCategoryId = e.currentTarget.dataset.materialCategoryId;
    const materialCategory = materialCategories.find(
      category => category.id === materialCategoryId,
    );
    setCurrentMaterialCategory(materialCategory);
  };
  const deleteMaterialCategoryClickHandler = e => {
    setModalMetadata({
      type: "MATERIAL_CATEGORIES",
      action: "DELETE",
    });
    toggleModal();
    setItemToDelete({
      name: "material category",
      id: e.currentTarget.dataset.materialCategoryId,
    });
  };
  return (
    <>
      <AdminTableContainer className="w-full flex flex-col gap-y-2">
        <H2 text="Categories" />
        {materialCategories ? (
          materialCategories.length > 0 ? (
            <Table border={false} className="h-full overflow-y-auto">
              <thead className="bg-accent-1-base text-sm">
                <tr>
                  <Th position="beginning">name</Th>
                  <Th>image</Th>
                  <Th>cover</Th>
                  <Th position="end">fix cover</Th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {materialCategories?.map((category, index) => (
                  <tr key={index}>
                    <Td
                      position="beginning"
                      isLastRow={index === materialCategories.length - 1}>
                      {category.name}
                    </Td>
                    <Td
                      align="center"
                      isLastRow={index === materialCategories.length - 1}>
                      {category.image ? (
                        <FaCheckCircle size={14} className="text-green-500" />
                      ) : (
                        <FaMinusCircle size={14} />
                      )}
                    </Td>
                    <Td
                      align="center"
                      isLastRow={index === materialCategories.length - 1}>
                      {category.coverImage ? (
                        <FaCheckCircle size={14} className="text-green-500" />
                      ) : (
                        <FaMinusCircle size={14} />
                      )}
                    </Td>
                    <Td
                      align="center"
                      isLastRow={index === materialCategories.length - 1}>
                      {category.fixCoverImage ? (
                        <FaCheckCircle size={14} className="text-green-500" />
                      ) : (
                        <FaMinusCircle size={14} />
                      )}
                    </Td>
                    <Td
                      position="end"
                      align="center"
                      isLastRow={index === materialCategories.length - 1}>
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
                          title="Edit category"
                          data-material-category-id={category.id}
                          onClick={editMaterialCategoryClickHandler}
                          className="hover:bg-accent-1-extra-light p-2 rounded-full">
                          <Image
                            src={editIcon}
                            alt="edit"
                            className="w-4 lg:w-5"
                          />
                        </button>
                        <button
                          title="Delete category"
                          data-material-category-id={category.id}
                          onClick={deleteMaterialCategoryClickHandler}
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
              <p>No categories added yet.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={"sm"} text="Loading categories..." />
          </div>
        )}
        <Button
          text="add material category"
          className="mr-auto ml-4"
          type="button"
          size="xs"
          onClick={addMaterialCategoryClickHandler}
        />
      </AdminTableContainer>
    </>
  );
};

export default MaterialCategoriesSection;
