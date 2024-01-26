"use client";
import { chevronLeftIcon } from "@/assets";
import { H1, Modal, RolesAnalyticsCitiesButtonMobile } from "@/components";
import {
  CitiesSection,
  CityModal,
  CurrenciesSection,
  CurrenciesSectionMobile,
  CurrencyModal,
  OfficeLocSection,
  OfficeModal,
  PlotModal,
  PlotsSection,
  RolesAnalyticsCitiesContainer,
  RolesSection,
  RolesSectionMobile,
  StyleModal,
  StylesSection,
  UserProductAnalyticsSection,
} from "@/containers";
import useCurrenciesFromDB from "@/Firebase/Currency Functions/GetCurrenciesFromFirebase";
import useCitiesFromDB from "@/Firebase/City Functions/getCitiesFromFirebase";
import useOfficesFromDB from "@/Firebase/Office Functions/getOfficesFromDB";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "@/app/context/AlertContext";
import { addNewCityService } from "@/services/admin-side/roles-analytics-cities/cities";
import { addNewCurrencyService } from "@/services/admin-side/roles-analytics-cities/currencies";
import { convertRolesToRows } from "@/utilities/admin-panel/roles-analytics-cities/roles";
import { addNewOfficeLocationService } from "@/services/admin-side/roles-analytics-cities/officeLocations";
import { addNewPlotService } from "@/services/admin-side/roles-analytics-cities/plots";
import usePlotsFromDB from "@/Firebase/Plots/getPlotsFromFirestore";
import { addNewStyleService } from "@/services/admin-side/roles-analytics-cities/styles";

const roles = {
  admins: [
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
  ],
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

const RolesAnalyticsCities = () => {
  const { showAlert } = useContext(AlertContext);
  const [showModalSpinner, setShowModalSpinner] = useState(false);

  // Roles states and functions
  const [rolesRows, setRolesRows] = useState(null);
  useEffect(() => {
    // Converting array of roles into array of rows to be displayed in the table
    convertRolesToRows(roles, setRolesRows);
  }, []);

  // Currencies states and functions
  const [currencies, setCurrencies] = useState(null);
  // Fetching currencies from DB
  useCurrenciesFromDB(currencies, setCurrencies);

  const defaultCurrency = {
    name: "",
    cities: [],
    inPkr: 0,
  };
  const [newCurrency, setNewCurrency] = useState(defaultCurrency);

  const newCurrencyInputHandler = (e, value = null) => {
    setNewCurrency((prevState) => ({
      ...prevState,
      [e.target.name]: value || e.target.value,
    }));
  };

  const addNewCurrencyHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewCurrencyService(
      newCurrency,
      currencies,
      showAlert,
      setShowModalSpinner,
      setNewCurrency,
      hideModal,
      defaultCurrency
    );
  };

  // Cities states and functions
  const [cities, setCities] = useState(null);
  // Fetching cities from DB
  useCitiesFromDB(setCities);

  const [newCity, setNewCity] = useState("");
  const addNewCityHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewCityService(
      cities,
      newCity,
      setNewCity,
      setShowModalSpinner,
      showAlert,
      hideModal
    );
  };
  const editCityHandler = (e) => {
    e.preventDefault();
    // Calling the service
    editCityService(setModalContent, toggleModal);
  };

  // Office locations states and functions
  const [officeLocations, setOfficeLocations] = useState(null);
  // Fetching office locations from DB
  useOfficesFromDB(officeLocations, setOfficeLocations);

  const [newOfficeLocation, setNewOfficeLocation] = useState({
    city: "",
    address: "",
    mapsLink: "",
    image: null,
  });

  const newOfficeLocationInputHandler = (e) => {
    setNewOfficeLocation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewOfficeLocationHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewOfficeLocationService(
      newOfficeLocation,
      showAlert,
      setShowModalSpinner,
      setNewOfficeLocation,
      hideModal
    );
  };

  // Plots states and functions
  const [plots, setPlots] = useState(null);
  // Fetching plots from DB
  usePlotsFromDB(setPlots);

  const [newPlot, setNewPlot] = useState({
    area: 0,
    unit: "",
  });
  const newPlotInputHandler = (e) => {
    setNewPlot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewPlotHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewPlotService(
      newPlot,
      setNewPlot,
      showAlert,
      plots,
      setShowModalSpinner,
      toggleModal
    );
  };

  // Styles states and functions
  const [styles, setStyles] = useState([
    {
      name: "general",
      image: null,
    },
    {
      name: "modern",
      image: null,
    },
  ]);
  // TODO (Backend): Fetch styles from DB

  const [newStyle, setNewStyle] = useState({
    name: "",
    image: null,
  });

  const newStyleInputHandler = (e) => {
    setNewStyle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewStyleHandler = (e) => {
    e.preventDefault();
    // Calling the service
    addNewStyleService(
      newStyle,
      styles,
      showAlert,
      setShowModalSpinner,
      hideModal
    );
  };

  // Modal states and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  // Expandable Section Button (for mobile) states and functions
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <>
      {/* for 1024+, calc(100vh - (AdminHeader height + 1rem)) */}
      {/* for 0-1024, calc(100vh - (AdminHeader height + 3rem)) */}
      <section className="px-8 flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] sm:px-4">
        <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20 lg:h-12">
          <div className="w-full flex justify-between items-center xs:items-start">
            <Link
              href={"/admin"}
              className="bg-accent-1-base rounded-full p-5 xl:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </Link>
            <H1
              text="roles, analystics & cities"
              className="mx-auto xl:text-2xl"
            />
          </div>
        </div>
        {/* This div will be displayed for over 1024px width */}
        {/* for 1024+, calc(100vh - (AdminHeader height + 1rem) - page header) */}
        {/* for 0-1024, calc(100vh - (AdminHeader height + 3rem) - page header) */}
        <div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)] lg:hidden">
          <div className="w-full h-full grid grid-rows-3 gap-2">
            <RolesSection rolesRows={rolesRows} />
            <CurrenciesSection
              currencies={currencies}
              setModalContent={setModalContent}
              toggleModal={toggleModal}
            />
          </div>
          <RolesAnalyticsCitiesContainer className="w-full grid grid-rows-4">
            <CitiesSection
              cities={cities}
              editCityHandler={editCityHandler}
              setModalContent={setModalContent}
              toggleModal={toggleModal}
            />
            <OfficeLocSection
              officeLocations={officeLocations}
              setModalContent={setModalContent}
              toggleModal={toggleModal}
            />
            <PlotsSection
              plots={plots}
              setModalContent={setModalContent}
              toggleModal={toggleModal}
            />
            <StylesSection
              styles={styles}
              setModalContent={setModalContent}
              toggleModal={toggleModal}
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
              setModalContent={setModalContent}
              toggleModal={toggleModal}
            />
          ) : expandedSection === "cities" ? (
            <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
              <CitiesSection
                cities={cities}
                editCityHandler={editCityHandler}
                setModalContent={setModalContent}
                toggleModal={toggleModal}
              />
            </RolesAnalyticsCitiesContainer>
          ) : expandedSection === "officeLocations" ? (
            <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
              <OfficeLocSection
                officeLocations={officeLocations}
                setModalContent={setModalContent}
                toggleModal={toggleModal}
              />
            </RolesAnalyticsCitiesContainer>
          ) : expandedSection === "plots" ? (
            <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
              <PlotsSection
                plots={plots}
                setModalContent={setModalContent}
                toggleModal={toggleModal}
              />
            </RolesAnalyticsCitiesContainer>
          ) : expandedSection === "styles" ? (
            <RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
              <StylesSection
                styles={styles}
                setModalContent={setModalContent}
                toggleModal={toggleModal}
              />
            </RolesAnalyticsCitiesContainer>
          ) : (
            expandedSection === "analytics" && <UserProductAnalyticsSection />
          )}
        </div>
      </section>
      {isModalOpen && (
        <Modal toggleModal={toggleModal} isModalOpen={isModalOpen}>
          {modalContent === "city" ? (
            <CityModal
              addNewCityHandler={addNewCityHandler}
              newCity={newCity}
              setNewCity={setNewCity}
              showModalSpinner={showModalSpinner}
            />
          ) : modalContent === "currency" ? (
            <CurrencyModal
              addNewCurrencyHandler={addNewCurrencyHandler}
              newCurrency={newCurrency}
              newCurrencyInputHandler={newCurrencyInputHandler}
              showModalSpinner={showModalSpinner}
              cities={cities}
            />
          ) : modalContent === "office" ? (
            <OfficeModal
              addNewOfficeLocationHandler={addNewOfficeLocationHandler}
              newOfficeLocation={newOfficeLocation}
              newOfficeLocationInputHandler={newOfficeLocationInputHandler}
              setNewOfficeLocation={setNewOfficeLocation}
              showModalSpinner={showModalSpinner}
            />
          ) : modalContent === "plot" ? (
            <PlotModal
              addNewPlotHandler={addNewPlotHandler}
              newPlot={newPlot}
              newPlotInputHandler={newPlotInputHandler}
              showModalSpinner={showModalSpinner}
            />
          ) : (
            modalContent === "style" && (
              <StyleModal
                addNewStyleHandler={addNewStyleHandler}
                newStyle={newStyle}
                newStyleInputHandler={newStyleInputHandler}
                setNewStyle={setNewStyle}
                showModalSpinner={showModalSpinner}
              />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default RolesAnalyticsCities;
