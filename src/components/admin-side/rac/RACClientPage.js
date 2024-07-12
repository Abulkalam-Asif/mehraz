"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  ToggleViewButtonMobile,
  CitiesSection,
  CityModal,
  CurrenciesSection,
  CurrencyModal,
  OfficeLocSection,
  OfficeModal,
  PlotModal,
  PlotsSection,
  RACContainer,
  RolesSection,
  StyleModal,
  StylesSection,
  DeleteModal,
  UserProductAnalyticsSection,
} from "@/components";
import { convertRolesToRows } from "@/utilities/admin-side/roles-analytics-cities/convertRolesToRows";
import {
  addNewCityService,
  deleteCityService,
  editCityService,
} from "@/services/admin-side/roles-analytics-cities/cities";
import {
  addNewCurrencyService,
  deleteCurrencyService,
  editCurrencyService,
} from "@/services/admin-side/roles-analytics-cities/currencies";
import {
  addNewOfficeLocationService,
  deleteOfficeLocationService,
  editOfficeLocationService,
} from "@/services/admin-side/roles-analytics-cities/officeLocations";
import {
  addNewPlotService,
  deletePlotService,
  editPlotService,
} from "@/services/admin-side/roles-analytics-cities/plots";
import {
  addNewStyleService,
  deleteStyleService,
  editStyleService,
} from "@/services/admin-side/roles-analytics-cities/styles";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const roles = {
  admins: ["ali", "bilal", "ahmad"],
  architects: ["abulkalam", "jafar"],
  receptionists: ["hamza"],
};

const mobileButtonsData = [
  { text: "roles", name: "roles" },
  { text: "currencies", name: "currencies" },
  { text: "cities", name: "cities" },
  { text: "offices", name: "officeLocations" },
  { text: "plots", name: "plots" },
  { text: "styles", name: "styles" },
  { text: "analytics", name: "analytics" },
];

const RACClientPage = ({
  currencies,
  cities,
  officeLocations,
  plots,
  styles,
  units,
  isErrorOccurredWhileFetching,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [showModalSpinner, setShowModalSpinner] = useState(false);

  useEffect(() => {
    Object.keys(isErrorOccurredWhileFetching).forEach(key => {
      if (isErrorOccurredWhileFetching[key]) {
        showAlert({
          type: "ERROR",
          message:
            "An error occurred while fetching data. Please check your internet connection and try again.",
        });
      }
    });
  }, []);

  // Roles states and functions
  const [rolesRows, setRolesRows] = useState(null);
  useEffect(() => {
    // Converting array of roles into array of rows to be displayed in the table
    convertRolesToRows(roles, setRolesRows);
  }, []);

  // Cities states and functions
  const defaultCity = {
    id: null,
    name: "",
    usage: {
      currencies: 0,
      projects: 0,
      properties: 0,
    },
  };
  const [currentCity, setCurrentCity] = useState(defaultCity);
  const currentCityInputHandler = (name, value) => {
    setCurrentCity(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addNewCityHandler = e => {
    e.preventDefault();
    // Calling the service
    addNewCityService(
      cities,
      currentCity,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const editCityHandler = e => {
    e.preventDefault();
    // Calling the service
    editCityService(
      cities,
      currentCity,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };
  const deleteCityHandler = e => {
    e.preventDefault();
    // Calling the service
    deleteCityService(itemToDelete, setShowModalSpinner, showAlert, hideModal);
  };

  // Currencies states and functions
  const defaultCurrency = {
    id: null,
    name: "",
    cities: [],
    valueInPkr: 0,
    usage: {
      projects: 0,
    },
  };
  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);

  const currentCurrencyInputHandler = (name, value) => {
    setCurrentCurrency(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewCurrencyHandler = e => {
    e.preventDefault();
    // Calling the service
    addNewCurrencyService(
      currentCurrency,
      currencies,
      showAlert,
      setShowModalSpinner,
      hideModal,
    );
  };

  const editCurrencyHandler = e => {
    e.preventDefault();
    // returns array of the ids of the cities that were previously selected
    const prevCities = currencies
      .find(currency => currency.id === currentCurrency.id)
      .cities.map(city => city.id);
    // Calling the service
    editCurrencyService(
      currentCurrency,
      prevCities,
      currencies,
      showAlert,
      setShowModalSpinner,
      hideModal,
    );
  };
  const deleteCurrencyHandler = e => {
    e.preventDefault();
    // Calling the service
    deleteCurrencyService(
      itemToDelete,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };

  // Office locations states and functions
  const defaultOfficeLocation = {
    id: null,
    name: "",
    address: "",
    mapsLink: "",
    image: null,
  };
  const [currentOfficeLocation, setCurrentOfficeLocation] = useState(
    defaultOfficeLocation,
  );
  const currentOfficeLocationInputHandler = (name, value) => {
    setCurrentOfficeLocation(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewOfficeLocationHandler = e => {
    e.preventDefault();
    // Calling the service
    addNewOfficeLocationService(
      currentOfficeLocation,
      showAlert,
      setShowModalSpinner,
      hideModal,
      officeLocations,
    );
  };

  const editOfficeLocationHandler = e => {
    e.preventDefault();
    // Calling the service
    editOfficeLocationService(
      currentOfficeLocation,
      showAlert,
      setShowModalSpinner,
      hideModal,
    );
  };

  const deleteOfficeLocationHandler = e => {
    e.preventDefault();
    // Calling the service
    deleteOfficeLocationService(
      itemToDelete,
      setShowModalSpinner,
      showAlert,
      hideModal,
    );
  };

  // Plots states and functions
  const deafultPlot = {
    id: null,
    area: 0,
    unit: units[0]?.id,
    category: "UPTO_18",
    usage: {
      projects: 0,
    },
  };
  const [currentPlot, setCurrentPlot] = useState(deafultPlot);
  const currentPlotInputHandler = (name, value) => {
    setCurrentPlot(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewPlotHandler = e => {
    e.preventDefault();
    // Calling the service
    addNewPlotService(
      currentPlot,
      showAlert,
      plots,
      setShowModalSpinner,
      hideModal,
    );
  };

  const editPlotHandler = e => {
    e.preventDefault();
    // Calling the service
    editPlotService(
      currentPlot,
      showAlert,
      plots,
      setShowModalSpinner,
      hideModal,
    );
  };

  const deletePlotHandler = e => {
    e.preventDefault();
    // Calling the service
    deletePlotService(itemToDelete, setShowModalSpinner, showAlert, hideModal);
  };

  // Styles states and functions
  const defaultStyle = {
    id: null,
    name: "",
    budget: "LOW",
    image: null,
    usage: {
      projects: 0,
    },
  };
  const [currentStyle, setCurrentStyle] = useState(defaultStyle);

  const currentStyleInputHandler = (name, value) => {
    setCurrentStyle(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewStyleHandler = e => {
    e.preventDefault();
    // Calling the service
    addNewStyleService(
      currentStyle,
      styles,
      showAlert,
      setShowModalSpinner,
      hideModal,
    );
  };

  const editStyleHandler = e => {
    e.preventDefault();
    // Calling the service
    editStyleService(
      currentStyle,
      styles,
      showAlert,
      setShowModalSpinner,
      hideModal,
    );
  };

  const deleteStyleHandler = e => {
    e.preventDefault();
    // Calling the service
    deleteStyleService(itemToDelete, setShowModalSpinner, showAlert, hideModal);
  };

  // General state for deleting items
  const defaultItemToDelete = {
    name: null,
    id: null,
  };
  const [itemToDelete, setItemToDelete] = useState(defaultItemToDelete);

  // Modal states and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMetadata, setModalMetadata] = useState({
    type: null,
    action: null,
  });
  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentCity(defaultCity);
      setModalMetadata({
        type: null,
        action: null,
      });
      setCurrentCurrency(defaultCurrency);
      setCurrentOfficeLocation(defaultOfficeLocation);
      setCurrentPlot(deafultPlot);
      setCurrentStyle(defaultStyle);
      setItemToDelete(defaultItemToDelete);
    }
  }, [isModalOpen]);

  // Expandable Section Button (for mobile) states and functions
  const [expandedSection, setExpandedSection] = useState(null);
  return (
    <>
      {/* This div will be displayed for over 1024px width */}
      <div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 h-page-container-admin xl:h-page-container-admin-xl min-h-page-container-admin-inner max-h-page-container-admin-inner pb-4 lg:hidden">
        <div className="w-full h-full grid grid-rows-3 gap-2">
          <RolesSection rolesRows={rolesRows} />
          <CurrenciesSection
            isErrorOccurredWhileFetching={
              isErrorOccurredWhileFetching.currencies
            }
            currencies={currencies}
            setCurrentCurrency={setCurrentCurrency}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
            citiesCount={cities?.length}
          />
        </div>
        <RACContainer className="w-full grid grid-rows-4">
          <CitiesSection
            isErrorOccurredWhileFetching={isErrorOccurredWhileFetching.cities}
            cities={cities}
            setCurrentCity={setCurrentCity}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
          <OfficeLocSection
            isErrorOccurredWhileFetching={
              isErrorOccurredWhileFetching.officeLocations
            }
            officeLocations={officeLocations}
            setCurrentOfficeLocation={setCurrentOfficeLocation}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
          <PlotsSection
            isErrorOccurredWhileFetching={isErrorOccurredWhileFetching.plots}
            plots={plots}
            units={units}
            setCurrentPlot={setCurrentPlot}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
          <StylesSection
            isErrorOccurredWhileFetching={isErrorOccurredWhileFetching.styles}
            styles={styles}
            setCurrentStyle={setCurrentStyle}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
        </RACContainer>
        <UserProductAnalyticsSection />
      </div>
      <div className="hidden lg:h-[calc(100vh-7rem-3rem)] lg:flex flex-col items-center justify-start gap-y-3 w-full mx-auto pt-4 sm:pt-2">
        <div className="flex flex-wrap justify-center gap-2">
          {mobileButtonsData?.map((buttonData, index) => (
            <ToggleViewButtonMobile
              key={index}
              text={buttonData.text}
              name={buttonData.name}
              expandedSection={expandedSection}
              setExpandedSection={setExpandedSection}
            />
          ))}
        </div>
        {expandedSection === "roles" ? (
          <RolesSection rolesRows={rolesRows} />
        ) : expandedSection === "currencies" ? (
          <CurrenciesSection
            isErrorOccurredWhileFetching={
              isErrorOccurredWhileFetching.currencies
            }
            currencies={currencies}
            setCurrentCurrency={setCurrentCurrency}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
        ) : expandedSection === "cities" ? (
          <RACContainer className="w-full overflow-hidden">
            <CitiesSection
              isErrorOccurredWhileFetching={isErrorOccurredWhileFetching.cities}
              cities={cities}
              setCurrentCity={setCurrentCity}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RACContainer>
        ) : expandedSection === "officeLocations" ? (
          <RACContainer className="w-full overflow-hidden">
            <OfficeLocSection
              isErrorOccurredWhileFetching={
                isErrorOccurredWhileFetching.officeLocations
              }
              officeLocations={officeLocations}
              setCurrentOfficeLocation={setCurrentOfficeLocation}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RACContainer>
        ) : expandedSection === "plots" ? (
          <RACContainer className="w-full overflow-hidden">
            <PlotsSection
              isErrorOccurredWhileFetching={isErrorOccurredWhileFetching.plots}
              plots={plots}
              units={units}
              setCurrentPlot={setCurrentPlot}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RACContainer>
        ) : expandedSection === "styles" ? (
          <RACContainer className="w-full overflow-hidden">
            <StylesSection
              isErrorOccurredWhileFetching={isErrorOccurredWhileFetching.styles}
              styles={styles}
              setCurrentStyle={setCurrentStyle}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RACContainer>
        ) : (
          expandedSection === "analytics" && <UserProductAnalyticsSection />
        )}
      </div>
      {isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          showModalSpinner={showModalSpinner}>
          {modalMetadata.action === "DELETE" ? (
            <DeleteModal
              toggleModal={toggleModal}
              itemToDelete={itemToDelete}
              deleteHandler={
                modalMetadata.type === "CITY"
                  ? deleteCityHandler
                  : modalMetadata.type === "CURRENCY"
                  ? deleteCurrencyHandler
                  : modalMetadata.type === "OFFICE"
                  ? deleteOfficeLocationHandler
                  : modalMetadata.type === "PLOT"
                  ? deletePlotHandler
                  : modalMetadata.type === "STYLE" && deleteStyleHandler
              }
            />
          ) : modalMetadata.type === "CITY" ? (
            <CityModal
              addNewCityHandler={addNewCityHandler}
              editCityHandler={editCityHandler}
              currentCity={currentCity}
              currentCityInputHandler={currentCityInputHandler}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type === "CURRENCY" ? (
            <CurrencyModal
              addNewCurrencyHandler={addNewCurrencyHandler}
              editCurrencyHandler={editCurrencyHandler}
              currentCurrency={currentCurrency}
              currentCurrencyInputHandler={currentCurrencyInputHandler}
              modalMetadata={modalMetadata}
              cities={cities}
            />
          ) : modalMetadata.type === "OFFICE" ? (
            <OfficeModal
              addNewOfficeLocationHandler={addNewOfficeLocationHandler}
              editOfficeLocationHandler={editOfficeLocationHandler}
              currentOfficeLocation={currentOfficeLocation}
              currentOfficeLocationInputHandler={
                currentOfficeLocationInputHandler
              }
              setCurrentOfficeLocation={setCurrentOfficeLocation}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type === "PLOT" ? (
            <PlotModal
              addNewPlotHandler={addNewPlotHandler}
              editPlotHandler={editPlotHandler}
              currentPlot={currentPlot}
              currentPlotInputHandler={currentPlotInputHandler}
              modalMetadata={modalMetadata}
              units={units}
            />
          ) : (
            modalMetadata.type === "STYLE" && (
              <StyleModal
                addNewStyleHandler={addNewStyleHandler}
                editStyleHandler={editStyleHandler}
                currentStyle={currentStyle}
                currentStyleInputHandler={currentStyleInputHandler}
                setCurrentStyle={setCurrentStyle}
                modalMetadata={modalMetadata}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default RACClientPage;
