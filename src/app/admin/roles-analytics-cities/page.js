"use client";
import { chevronLeftIcon } from "@/assets";
import { H1, Modal, RolesAnalyticsCitiesButtonMobile } from "@/components";
import {
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
	UserProductAnalyticsSection,
} from "@/containers";
import useCurrenciesFromDB from "@/Firebase/Currency Functions/getCurrenciesFromFirebase";
import useCitiesFromDB from "@/Firebase/City Functions/getCitiesFromFirebase";
import useOfficesFromDB from "@/Firebase/Office Functions/getOfficesFromDB";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "@/app/context/AlertContext";
import {
	addNewCityService,
	editCityService,
} from "@/services/admin-side/roles-analytics-cities/cities";
import { addNewCurrencyService } from "@/services/admin-side/roles-analytics-cities/currencies";
import { convertRolesToRows } from "@/utilities/admin-panel/roles-analytics-cities/roles";
import { addNewOfficeLocationService } from "@/services/admin-side/roles-analytics-cities/officeLocations";
import { addNewPlotService } from "@/services/admin-side/roles-analytics-cities/plots";
import usePlotsFromDB from "@/Firebase/Plots/getPlotsFromFirestore";
import { addNewStyleService } from "@/services/admin-side/roles-analytics-cities/styles";
import useStylesFromDB from "@/Firebase/Styles Functions/getStylesFromFirebase";

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

	const defaultCurrency = {
		name: "",
		cities: [],
		inPkr: 0,
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
			setCurrentCurrency,
			hideModal,
			defaultCurrency
		);
	};

	// Cities states and functions
	const [cities, setCities] = useState(null);
	// Fetching cities from DB
	useCitiesFromDB(setCities);

	useCurrenciesFromDB(setCurrencies, cities);

  
	const [currentCity, setCurrentCity] = useState("");
	const addNewCityHandler = (e) => {
		e.preventDefault();
		// Calling the service
		addNewCityService(
			cities,
			currentCity,
			setCurrentCity,
			setShowModalSpinner,
			showAlert,
			hideModal
		);
	};
	const editCityHandler = (e) => {
		e.preventDefault();
		// Calling the service
		editCityService(setModalMetadata, toggleModal);
	};

	// Office locations states and functions
	const [officeLocations, setOfficeLocations] = useState(null);
	// Fetching office locations from DB
	useOfficesFromDB(officeLocations, setOfficeLocations);

	const [currentOfficeLocation, setCurrentOfficeLocation] = useState({
		city: "",
		address: "",
		mapsLink: "",
		image: null,
	});

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
			setCurrentOfficeLocation,
			hideModal
		);
	};

	// Plots states and functions
	const [plots, setPlots] = useState(null);
	// Fetching plots from DB
	usePlotsFromDB(setPlots);

	const [currentPlot, setCurrentPlot] = useState({
		area: 0,
		unit: "",
	});
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
			setCurrentPlot,
			showAlert,
			plots,
			setShowModalSpinner,
			toggleModal
		);
	};

	// Styles states and functions
	const [styles, setStyles] = useState(null);
	useStylesFromDB(setStyles);

	const [currentStyle, setCurrentStyle] = useState({
		name: "",
		image: null,
	});

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
			setCurrentStyle,
			setShowModalSpinner,
			hideModal
		);
	};

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
							className="bg-accent-1-base rounded-full p-5 xl:p-4 md:hidden"
						>
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
				{/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
				{/* for 0-1024 width, calc(100vh - (AdminHeader height + 3rem) - page header height) */}
				<div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)] lg:hidden">
					<div className="w-full h-full grid grid-rows-3 gap-2">
						<RolesSection rolesRows={rolesRows} />
						<CurrenciesSection
							currencies={currencies}
							setModalMetadata={setModalMetadata}
							toggleModal={toggleModal}
						/>
					</div>
					<RolesAnalyticsCitiesContainer className="w-full grid grid-rows-4">
						<CitiesSection
							cities={cities}
							setCurrentCity={setCurrentCity}
							setModalMetadata={setModalMetadata}
							toggleModal={toggleModal}
						/>
						<OfficeLocSection
							officeLocations={officeLocations}
							setModalMetadata={setModalMetadata}
							toggleModal={toggleModal}
						/>
						<PlotsSection
							plots={plots}
							setModalMetadata={setModalMetadata}
							toggleModal={toggleModal}
						/>
						<StylesSection
							styles={styles}
							setModalMetadata={setModalMetadata}
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
							setModalMetadata={setModalMetadata}
							toggleModal={toggleModal}
						/>
					) : expandedSection === "cities" ? (
						<RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
							<CitiesSection
								cities={cities}
								editCityHandler={editCityHandler}
								setModalMetadata={setModalMetadata}
								toggleModal={toggleModal}
							/>
						</RolesAnalyticsCitiesContainer>
					) : expandedSection === "officeLocations" ? (
						<RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
							<OfficeLocSection
								officeLocations={officeLocations}
								setModalMetadata={setModalMetadata}
								toggleModal={toggleModal}
							/>
						</RolesAnalyticsCitiesContainer>
					) : expandedSection === "plots" ? (
						<RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
							<PlotsSection
								plots={plots}
								setModalMetadata={setModalMetadata}
								toggleModal={toggleModal}
							/>
						</RolesAnalyticsCitiesContainer>
					) : expandedSection === "styles" ? (
						<RolesAnalyticsCitiesContainer className="w-full overflow-hidden">
							<StylesSection
								styles={styles}
								setModalMetadata={setModalMetadata}
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
					{modalMetadata.type === "city" ? (
						<CityModal
							addNewCityHandler={addNewCityHandler}
							currentCity={currentCity}
							setCurrentCity={setCurrentCity}
							showModalSpinner={showModalSpinner}
							modalMetadata={modalMetadata}
						/>
					) : modalMetadata.type === "currency" ? (
						<CurrencyModal
							addNewCurrencyHandler={addNewCurrencyHandler}
							currentCurrency={currentCurrency}
							currentCurrencyInputHandler={currentCurrencyInputHandler}
							showModalSpinner={showModalSpinner}
							modalMetadata={modalMetadata}
							cities={cities}
						/>
					) : modalMetadata.type === "office" ? (
						<OfficeModal
							addNewOfficeLocationHandler={addNewOfficeLocationHandler}
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
							currentPlot={currentPlot}
							currentPlotInputHandler={currentPlotInputHandler}
							showModalSpinner={showModalSpinner}
							modalMetadata={modalMetadata}
						/>
					) : (
						modalMetadata.type === "style" && (
							<StyleModal
								addNewStyleHandler={addNewStyleHandler}
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

export default RolesAnalyticsCities;
