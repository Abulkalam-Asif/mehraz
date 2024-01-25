"use client";
import { chevronLeftIcon } from "@/assets";
import { H1, Modal } from "@/components";
import {
	CitiesSectionDesktop,
	CityModal,
	CurrenciesSectionDesktop,
	CurrencyModal,
	OfficeLocSectionDesktop,
	OfficeModal,
	PlotsSectionDesktop,
	RolesAnalyticsCitiesContainer,
	RolesSectionDesktop,
	StylesSectionDesktop,
} from "@/containers";
import useCurrenciesFromDB from "@/Firebase/Currency Functions/GetCurrenciesFromFirebase";
import useCitiesFromDB from "@/Firebase/City Functions/getCitiesFromFirebase";
import useOfficesFromDB from "@/Firebase/Office Functions/getOfficesFromDB";
import addPlotToDB from "@/Firebase/Plots/addPlotToFirebase";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "@/app/context/AlertContext";
import { addNewCityService } from "@/services/admin-side/roles-analytics-cities/cities";
import { addNewCurrencyService } from "@/services/admin-side/roles-analytics-cities/currencies";
import { convertRolesToRows } from "@/utilities/admin-panel/roles-analytics-cities/roles";
import { addNewOfficeLocationService } from "@/services/admin-side/roles-analytics-cities/officeLocations";
import usePlotsFromDB from "@/Firebase/Plots/getPlotsFromFirestore";

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

const plots = [
	{
		area: 10,
		unit: "sq. feet",
	},
	{
		area: 5,
		unit: "marla",
	},
	{
		area: 1,
		unit: "kanal",
	},
];

const styles = [
	{
		name: "modern",
		image: "https://picsum.photos/200/300",
	},
	{
		name: "classic",
		image: "https://picsum.photos/200/300",
	},
	{
		name: "spanish",
		image: "https://picsum.photos/200/300",
	},
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
	const [officeLocations, setOfficeLocations] = useState([]);
	// Fetching office locations from DB
	useOfficesFromDB(officeLocations, setOfficeLocations);
	useEffect(() => {
		console.log(officeLocations);
	}, [officeLocations]);
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
			officeLocations,
			showAlert,
			setShowModalSpinner,
			setNewOfficeLocation,
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

	return (
		<>
			<section className="px-8 flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)]">
				<div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20">
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
				<div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)]">
					<div className="w-full h-full grid grid-rows-3 gap-2">
						<RolesSectionDesktop rolesRows={rolesRows} />
						<CurrenciesSectionDesktop
							currencies={currencies}
							setModalContent={setModalContent}
							toggleModal={toggleModal}
						/>
					</div>

					<RolesAnalyticsCitiesContainer className="w-full grid grid-rows-4">
						<CitiesSectionDesktop
							cities={cities}
							editCityHandler={editCityHandler}
							setModalContent={setModalContent}
							toggleModal={toggleModal}
						/>
						<OfficeLocSectionDesktop
							officeLocations={officeLocations}
							setModalContent={setModalContent}
							toggleModal={toggleModal}
						/>
						<PlotsSectionDesktop plots={plots} />
						<StylesSectionDesktop styles={styles} />
					</RolesAnalyticsCitiesContainer>
					<RolesAnalyticsCitiesContainer className="w-full">
						user behaivour and product analytics
					</RolesAnalyticsCitiesContainer>
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
					) : (
						modalContent === "office" && (
							<OfficeModal
								addNewOfficeLocationHandler={addNewOfficeLocationHandler}
								newOfficeLocation={newOfficeLocation}
								newOfficeLocationInputHandler={newOfficeLocationInputHandler}
								setNewOfficeLocation={setNewOfficeLocation}
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
