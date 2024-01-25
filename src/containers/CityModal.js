import { InputBox, RolesAnalyticsCitiesModal } from "@/components";

const CityModal = ({
  addNewCityHandler,
  showModalSpinner,
  newCity,
  setNewCity,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading="add city"
        buttonText="add city"
        onButtonClick={addNewCityHandler}
        showModalSpinner={showModalSpinner}>
        <InputBox
          label="Enter city name"
          value={newCity}
          setInput={setNewCity}
          idHtmlFor="city"
        />
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default CityModal;
