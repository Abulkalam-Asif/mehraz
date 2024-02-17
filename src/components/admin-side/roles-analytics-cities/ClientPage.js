"use client";
import { useContext, useEffect, useState } from "react";
import {
  Modal,
  RolesAnalyticsCitiesButtonMobile,
  CitiesSection,
  CityModal,
  CurrenciesSection,
  CurrencyModal,
  OfficeLocSection,
  OfficeModal,
  PlotModal,
  PlotsSection,
  RolesAnalyticsCitiesContainer,
  RolesSection,
  StyleModal,
  StylesSection,
  DeleteModal,
  UserProductAnalyticsSection,
} from "@/components";
import { AlertContext } from "@/app/context/AlertContext";
import { convertRolesToRows } from "@/utilities/admin-panel/roles-analytics-cities/roles";
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

const ClientPage = ({ currencies, cities, officeLocations, plots, styles }) => {
  const { showAlert } = useContext(AlertContext);
  const [showModalSpinner, setShowModalSpinner] = useState(false);

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
    },
  };
  const [currentCity, setCurrentCity] = useState(defaultCity);
  const currentCityInputHandler = (e) => {
    setCurrentCity((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const addNewCityHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewCityService(
      cities,
      currentCity,
      setShowModalSpinner,
      showAlert,
      hideModal
    );
  };
  const editCityHandler = (e) => {
    e.preventDefault();
    // Calling the service
    editCityService(
      cities,
      currentCity,
      setShowModalSpinner,
      showAlert,
      hideModal
    );
  };
  const deleteCityHandler = (e) => {
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

  const currentCurrencyInputHandler = (e, value = null) => {
    setCurrentCurrency((prevState) => ({
      ...prevState,
      [e.target.name]: value || e.target.value,
    }));
  };

  const addNewCurrencyHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewCurrencyService(
      currentCurrency,
      currencies,
      showAlert,
      setShowModalSpinner,
      hideModal
    );
  };

  const editCurrencyHandler = (e) => {
    e.preventDefault();
    // returns array of the ids of the cities that were previously selected
    const prevCities = currencies
      .find((currency) => currency.id === currentCurrency.id)
      .cities.map((city) => city.id);
    // Calling the service
    editCurrencyService(
      currentCurrency,
      prevCities,
      currencies,
      showAlert,
      setShowModalSpinner,
      hideModal
    );
  };
  const deleteCurrencyHandler = (e) => {
    e.preventDefault();
    // Calling the service
    deleteCurrencyService(
      itemToDelete,
      setShowModalSpinner,
      showAlert,
      hideModal
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
    defaultOfficeLocation
  );
  const currentOfficeLocationInputHandler = (e) => {
    setCurrentOfficeLocation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewOfficeLocationHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewOfficeLocationService(
      currentOfficeLocation,
      showAlert,
      setShowModalSpinner,
      hideModal,
      officeLocations
    );
  };

  const editOfficeLocationHandler = (e) => {
    e.preventDefault();
    // Calling the service
    editOfficeLocationService(
      currentOfficeLocation,
      showAlert,
      setShowModalSpinner,
      hideModal
    );
  };

  const deleteOfficeLocationHandler = (e) => {
    e.preventDefault();
    // Calling the service
    deleteOfficeLocationService(
      itemToDelete,
      setShowModalSpinner,
      showAlert,
      hideModal
    );
  };

  // Plots states and functions
  const deafultPlot = {
    id: null,
    area: 0,
    unit: "",
    usage: {
      projects: 0,
    },
  };
  const [currentPlot, setCurrentPlot] = useState(deafultPlot);
  const currentPlotInputHandler = (e) => {
    setCurrentPlot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewPlotHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewPlotService(
      currentPlot,
      showAlert,
      plots,
      setShowModalSpinner,
      hideModal
    );
  };

  const editPlotHandler = (e) => {
    e.preventDefault();
    // Calling the service
    editPlotService(
      currentPlot,
      showAlert,
      plots,
      setShowModalSpinner,
      hideModal
    );
  };

  const deletePlotHandler = (e) => {
    e.preventDefault();
    // Calling the service
    deletePlotService(itemToDelete, setShowModalSpinner, showAlert, hideModal);
  };

  // Styles states and functions
  const deafultStyle = {
    id: null,
    name: "",
    image: null,
    usage: {
      projects: 0,
    },
  };
  const [currentStyle, setCurrentStyle] = useState(deafultStyle);

  const currentStyleInputHandler = (e) => {
    setCurrentStyle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewStyleHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewStyleService(
      currentStyle,
      styles,
      showAlert,
      setShowModalSpinner,
      hideModal
    );
  };

  const editStyleHandler = (e) => {
    e.preventDefault();
    // Calling the service
    editStyleService(
      currentStyle,
      styles,
      showAlert,
      setShowModalSpinner,
      hideModal
    );
  };

  const deleteStyleHandler = (e) => {
    e.preventDefault();
    // Calling the service
    deleteStyleService(itemToDelete, setShowModalSpinner, showAlert, hideModal);
  };

  // General state for deleting items
  const defaultItemToDelete = {
    type: null,
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
    setIsModalOpen((prevState) => !prevState);
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
      setCurrentStyle(deafultStyle);
      setItemToDelete(defaultItemToDelete);
    }
  }, [isModalOpen]);

  // Expandable Section Button (for mobile) states and functions
  const [expandedSection, setExpandedSection] = useState(null);
  return (
    <>
      {/* This div will be displayed for over 1024px width */}
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      {/* for 0-1024 width, calc(100vh - (AdminHeader height + 3rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)] lg:hidden">
        <div className="w-full h-full grid grid-rows-3 gap-2">
          <RolesSection rolesRows={rolesRows} />
          <CurrenciesSection
            currencies={currencies}
            setCurrentCurrency={setCurrentCurrency}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
        </div>
        <RolesAnalyticsCitiesContainer className="w-full grid grid-rows-4">
          <CitiesSection
            cities={cities}
            setCurrentCity={setCurrentCity}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
          <OfficeLocSection
            officeLocations={officeLocations}
            setCurrentOfficeLocation={setCurrentOfficeLocation}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
          <PlotsSection
            plots={plots}
            setCurrentPlot={setCurrentPlot}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
          <StylesSection
            styles={styles}
            setCurrentStyle={setCurrentStyle}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
        </RolesAnalyticsCitiesContainer>
        <UserProductAnalyticsSection />
      </div>
      {/* This div will be displayed for up to 1024px width */}
      <div className="hidden lg:h-[calc(100vh-7rem-3rem)] lg:flex flex-col items-center justify-start gap-y-3 w-full mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {mobileButtonsData?.map((buttonData, index) => (
            <RolesAnalyticsCitiesButtonMobile
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
            currencies={currencies}
            setCurrentCurrency={setCurrentCurrency}
            setModalMetadata={setModalMetadata}
            toggleModal={toggleModal}
            setItemToDelete={setItemToDelete}
          />
        ) : expandedSection === "cities" ? (
          <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
            <CitiesSection
              cities={cities}
              setCurrentCity={setCurrentCity}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RolesAnalyticsCitiesContainer>
        ) : expandedSection === "officeLocations" ? (
          <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
            <OfficeLocSection
              officeLocations={officeLocations}
              setCurrentOfficeLocation={setCurrentOfficeLocation}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RolesAnalyticsCitiesContainer>
        ) : expandedSection === "plots" ? (
          <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
            <PlotsSection
              plots={plots}
              setCurrentPlot={setCurrentPlot}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RolesAnalyticsCitiesContainer>
        ) : expandedSection === "styles" ? (
          <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
            <StylesSection
              styles={styles}
              setCurrentStyle={setCurrentStyle}
              setModalMetadata={setModalMetadata}
              toggleModal={toggleModal}
              setItemToDelete={setItemToDelete}
            />
          </RolesAnalyticsCitiesContainer>
        ) : (
          expandedSection === "analytics" && <UserProductAnalyticsSection />
        )}
      </div>
      {isModalOpen && (
        <Modal toggleModal={toggleModal} isModalOpen={isModalOpen}>
          {modalMetadata.action === "delete" ? (
            <DeleteModal
              showModalSpinner={showModalSpinner}
              toggleModal={toggleModal}
              itemToDelete={itemToDelete}
              deleteHandler={
                itemToDelete.type === "city"
                  ? deleteCityHandler
                  : itemToDelete.type === "currency"
                  ? deleteCurrencyHandler
                  : itemToDelete.type === "office"
                  ? deleteOfficeLocationHandler
                  : itemToDelete.type === "plot"
                  ? deletePlotHandler
                  : itemToDelete.type === "style" && deleteStyleHandler
              }
            />
          ) : modalMetadata.type === "city" ? (
            <CityModal
              addNewCityHandler={addNewCityHandler}
              editCityHandler={editCityHandler}
              currentCity={currentCity}
              currentCityInputHandler={currentCityInputHandler}
              showModalSpinner={showModalSpinner}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type === "currency" ? (
            <CurrencyModal
              addNewCurrencyHandler={addNewCurrencyHandler}
              editCurrencyHandler={editCurrencyHandler}
              currentCurrency={currentCurrency}
              currentCurrencyInputHandler={currentCurrencyInputHandler}
              showModalSpinner={showModalSpinner}
              modalMetadata={modalMetadata}
              cities={cities}
            />
          ) : modalMetadata.type === "office" ? (
            <OfficeModal
              addNewOfficeLocationHandler={addNewOfficeLocationHandler}
              editOfficeLocationHandler={editOfficeLocationHandler}
              currentOfficeLocation={currentOfficeLocation}
              currentOfficeLocationInputHandler={
                currentOfficeLocationInputHandler
              }
              setCurrentOfficeLocation={setCurrentOfficeLocation}
              showModalSpinner={showModalSpinner}
              modalMetadata={modalMetadata}
            />
          ) : modalMetadata.type === "plot" ? (
            <PlotModal
              addNewPlotHandler={addNewPlotHandler}
              editPlotHandler={editPlotHandler}
              currentPlot={currentPlot}
              currentPlotInputHandler={currentPlotInputHandler}
              showModalSpinner={showModalSpinner}
              modalMetadata={modalMetadata}
            />
          ) : (
            modalMetadata.type === "style" && (
              <StyleModal
                addNewStyleHandler={addNewStyleHandler}
                editStyleHandler={editStyleHandler}
                currentStyle={currentStyle}
                currentStyleInputHandler={currentStyleInputHandler}
                setCurrentStyle={setCurrentStyle}
                showModalSpinner={showModalSpinner}
                modalMetadata={modalMetadata}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default ClientPage;
