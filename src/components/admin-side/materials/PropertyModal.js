import { AdminInputBox, AdminModal, AdminSelect } from "@/components";

const PropertyModal = ({
  addNewPropertyHandler,
  cities,
  currentProperty,
  currentPropertyInputHandler,
  editPropertyHandler,
  modalMetadata,
}) => {
  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD" ? "Add category" : "Edit category"
        }
        buttonText={
          modalMetadata.action === "ADD" ? "Add category" : "Update category"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewPropertyHandler
            : editPropertyHandler
        }
        className="grid grid-cols-2 gap-4">
        <AdminInputBox
          label="Enter area"
          value={currentProperty.area}
          inputHandler={currentPropertyInputHandler}
          idHtmlFor="area"
          name="area"
          required={true}
          maxLength={15}
        />
        <AdminInputBox
          label="Enter description"
          value={currentProperty.description}
          inputHandler={currentPropertyInputHandler}
          idHtmlFor="description"
          name="description"
          type="textarea"
          className="row-span-2"
          required={true}
          maxLength={150}
        />
        <AdminInputBox
          label="Enter location"
          value={currentProperty.location}
          inputHandler={currentPropertyInputHandler}
          idHtmlFor="location"
          name="location"
          required={true}
          maxLength={50}
        />
        <AdminInputBox
          label="Enter demand"
          value={currentProperty.demand}
          inputHandler={currentPropertyInputHandler}
          idHtmlFor="demand"
          name="demand"
          required={true}
          maxLength={15}
        />
        <AdminSelect
          label="Select city"
          value={currentProperty.city}
          inputHandler={currentPropertyInputHandler}
          idHtmlFor="city"
          name="city"
          required={true}
          options={cities.map(city => ({ label: city.name, value: city.id }))}
        />
        <AdminSelect
          label="Select type"
          value={currentProperty.type}
          inputHandler={currentPropertyInputHandler}
          idHtmlFor="type"
          name="type"
          required={true}
          options={[
            {
              label: "LAND . PLOT",
              value: "LAND . PLOT",
            },
            {
              label: "RESIDENTIAL",
              value: "RESIDENTIAL",
            },
            {
              label: "COMMERCIAL",
              value: "COMMERCIAL",
            },
            {
              label: "OTHER",
              value: "OTHER",
            },
          ]}
        />
      </AdminModal>
    </>
  );
};

export default PropertyModal;
