"use client";
import { chevronLeftIcon, linkIcon } from "@/assets";
import {
  Button,
  H1,
  H2,
  InputBox,
  Modal,
  MultiCheckbox,
  RolesAnalyticsCitiesModal,
  Spinner,
  Td,
  Th,
  Dropzone,
} from "@/components";
import { RolesAnalyticsCitiesContainer, Table } from "@/containers";
import addCurrencyToDB from "@/Firebase/addCurrencyToFirebase";
import useCurrenciesFromDB from "@/Firebase/GetCurrenciesFromFirebase";
import addCityToDB from "@/Firebase/addCityToFirebase";
import useCitiesFromDB from "@/Firebase/getCitiesFromFirebase";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import { AlertContext } from "@/app/context/AlertContext";

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

// const givenCities = ["karachi", "lahore", "islamabad", "peshawar"];

const givenOfficeLocations = [
  {
    city: "karachi",
    address: "abc",
    mapsLink: "https://www.google.com/maps",
    image: "https://picsum.photos/200/300",
  },
  {
    city: "lahore",
    address: "abc",
    mapsLink: "https://www.google.com/maps",
    image: "https://picsum.photos/200/300",
  },
  {
    city: "islamabad",
    address: "abc",
    mapsLink: "https://www.google.com/maps",
    image: "https://picsum.photos/200/300",
  },
];

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
    // Converting array of roles into array of rows
    const maxLength = Math.max(
      ...Object.values(roles).map((user) => user.length)
    );
    const rows = [];
    for (let i = 0; i < maxLength; i++) {
      rows.push([]);
    }
    for (const [key, value] of Object.entries(roles)) {
      for (let i = 0; i < maxLength; i++) {
        rows[i].push(value[i] || "");
      }
    }
    setRolesRows(rows);
  }, []);

  // Currency states and functions
  const [currencies, setCurrencies] = useState(null);
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
    // Trim and convert currency name to uppercase
    const formattedCurrencyName = newCurrency.name.trim().toUpperCase();

    if (formattedCurrencyName === "") {
      showAlert({ type: "warning", message: "Please enter a currency name" });
      return;
    } else if (
      currencies.find((currency) => currency.name === formattedCurrencyName)
    ) {
      showAlert({ type: "error", message: "This currency already exists" });
      return;
    } else if (newCurrency.inPkr <= 0 || newCurrency.inPkr === "") {
      showAlert({ type: "warning", message: "Please enter a valid PKR value" });
    } else if (newCurrency.cities.length === 0) {
      showAlert({
        type: "warning",
        message: "Please select at least one city",
      });
    } else {
      setShowModalSpinner(true);
      addCurrencyToDB(
        formattedCurrencyName,
        newCurrency.inPkr,
        newCurrency.cities
      )
        .then(() => {
          showAlert({
            type: "success",
            message: "Currency added successfully",
          });
          setShowModalSpinner(false);
          setNewCurrency(defaultCurrency);
          hideModal();
        })
        .catch(() => {
          showAlert({
            type: "error",
            message: "An error occured! Please try again.",
          });
          setShowModalSpinner(false);
        });
    }
  };

  // Cities states and functions
  const [cities, setCities] = useState(null);
  useCitiesFromDB(setCities);
  const [newCity, setNewCity] = useState("");

  const addNewCityHandler = (e) => {
    e.preventDefault();
    // Trim and convert city name to uppercase
    const formattedCity = newCity.trim().toUpperCase();

    if (formattedCity === "") {
      showAlert({ type: "warning", message: "Please enter a city name" });
      return;
    } else if (cities.includes(formattedCity)) {
      showAlert({ type: "error", message: "This city already exists" });
      return;
    } else {
      setShowModalSpinner(true);
      addCityToDB(formattedCity)
        .then(() => {
          showAlert({ type: "success", message: "City added successfully" });
          setShowModalSpinner(false);
          setNewCity("");
          hideModal();
        })
        .catch(() => {
          showAlert({
            type: "error",
            message: "An error occured! Please try again.",
          });
          setShowModalSpinner(false);
        });
    }
  };

  // Office locations states and functions
  const [officeLocations, setOfficeLocations] = useState(givenOfficeLocations); // Should be set to null
  // TODO: Fetch office locations from DB
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
    // Trim and convert city name to uppercase
    const formattedOfficeLocation = {
      ...newOfficeLocation,
      city: newOfficeLocation.city.trim().toUpperCase(),
      address: newOfficeLocation.address.trim(),
      mapsLink: newOfficeLocation.mapsLink.trim(),
    };

    if (formattedOfficeLocation.city === "") {
      showAlert({ type: "warning", message: "Please enter a city name" });
      return;
    } else if (formattedOfficeLocation.address === "") {
      showAlert({ type: "warning", message: "Please enter an address" });
      return;
    } else if (formattedOfficeLocation.mapsLink === "") {
      showAlert({ type: "warning", message: "Please enter a maps link" });
      return;
    } else if (
      !formattedOfficeLocation.mapsLink.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/)
    ) {
      showAlert({ type: "warning", message: "Please enter a valid maps link" });
      return;
    } else if (!formattedOfficeLocation.image) {
      showAlert({ type: "warning", message: "Please attach an image" });
      return;
    } else {
      setShowModalSpinner(true);
      // TODO: Add office location to DB
    }
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
        <div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)]">
          <div className="w-full h-full grid grid-rows-3 gap-2">
            <RolesAnalyticsCitiesContainer
              title={"Roles"}
              className="row-span-2 flex flex-col">
              <H2 text="roles" className="mb-2" />
              {rolesRows ? (
                <Table border={false} className="h-full overflow-y-auto">
                  <thead className="bg-accent-1-base text-sm">
                    <tr>
                      <Th position="beginning" className="w-1/3">
                        admin
                      </Th>
                      <Th className="w-1/3">architect</Th>
                      <Th position="end" className="w-1/3">
                        receptionist
                      </Th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-semibold">
                    {rolesRows?.map((row, i) => (
                      <tr key={i}>
                        {row.map((user, j) => (
                          <Td
                            key={j}
                            position={
                              j === 0
                                ? "beginning"
                                : j === row.length - 1
                                ? "end"
                                : "middle"
                            }
                            isLastRow={i === rolesRows?.length - 1}>
                            {user}
                          </Td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <Spinner size={"sm"} text="Loading roles..." />
                </div>
              )}
            </RolesAnalyticsCitiesContainer>
            <RolesAnalyticsCitiesContainer className="row-span-1 flex flex-col gap-y-2">
              <H2 text="currencies" />
              {currencies ? (
                <>
                  <Table border={false} className="h-full overflow-y-auto">
                    <thead className="bg-accent-1-base text-sm">
                      <tr>
                        <Th position="beginning" className="w-1/4 xl:w-1/3">
                          name
                        </Th>
                        <Th className="w-1/2 xl:w-1/3">cities</Th>
                        <Th position="end" className="w-1/4 xl:w-1/3">
                          in pkr
                        </Th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-semibold">
                      {currencies.map((currency, i) => (
                        <tr key={i}>
                          <Td
                            position="beginning"
                            isLastRow={i === currencies.length - 1}>
                            {currency.name}
                          </Td>
                          <Td
                            isLastRow={i === currencies.length - 1}
                            className="flex gap-x-2 flex-wrap border-x-0">
                            {currency.cities.map((city, i) => (
                              <span key={i}>{city}</span>
                            ))}
                          </Td>
                          <Td
                            position="end"
                            isLastRow={i === currencies.length - 1}>
                            {currency.valueInPkr}
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <Spinner size={"sm"} text="Loading currencies..." />
                </div>
              )}
              <Button
                text="add currency"
                className="text-xs mr-auto"
                onClick={() => {
                  setModalContent("currency");
                  toggleModal();
                }}
              />
            </RolesAnalyticsCitiesContainer>
          </div>

          <RolesAnalyticsCitiesContainer className="w-full grid grid-rows-4">
            <div className="flex flex-col gap-y-2">
              <H2 text="cities" />
              {cities ? (
                <Table
                  border={false}
                  className="h-full overflow-y-auto px-3 py-2">
                  <tbody className="text-sm">
                    {cities.map((city, i) => (
                      <tr key={i}>
                        <td
                          className={`border-accent-1-dark ${
                            i === cities.length - 1 ? "" : "border-b-2"
                          }`}>
                          {city}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <Spinner size={"sm"} text="Loading cities..." />
                </div>
              )}
              <Button
                text="add city"
                className="text-xs mr-auto"
                onClick={() => {
                  setModalContent("city");
                  toggleModal();
                }}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <H2 text="office locations" />
              <Table
                border={false}
                className="h-full overflow-y-auto px-3 py-2">
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/4">
                      city
                    </Th>
                    <Th className="w-1/4">address</Th>
                    <Th className="w-1/4">link</Th>
                    <Th position="end" className="w-1/4">
                      image
                    </Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {officeLocations.map((location, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === officeLocations.length - 1}>
                        {location.city}
                      </Td>
                      <Td isLastRow={i === officeLocations.length - 1}>
                        {location.address}
                      </Td>
                      <Td isLastRow={i === officeLocations.length - 1}>
                        <a
                          target="_blank"
                          href={location.mapsLink}
                          className="underline flex items-center gap-2">
                          <span>link to maps</span>
                          <Image src={linkIcon} alt="link" />
                        </a>
                      </Td>
                      <Td
                        position="end"
                        isLastRow={i === officeLocations.length - 1}>
                        <a
                          target="_blank"
                          href={location.image}
                          className="underline flex items-center gap-2">
                          <span>image</span>
                          <Image src={linkIcon} alt="link" />
                        </a>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                text="add office"
                onClick={() => {
                  setModalContent("office");
                  toggleModal();
                }}
                className="text-xs mr-auto"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <H2 text="plots" />
              <Table
                border={false}
                className="h-full overflow-y-auto px-3 py-2">
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/2">
                      area
                    </Th>
                    <Th position="end" className="w-1/2">
                      unit
                    </Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {plots.map((plot, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === plots.length - 1}>
                        {plot.area}
                      </Td>
                      <Td position="end" isLastRow={i === plots.length - 1}>
                        {plot.unit}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button text="add plot" className="text-xs mr-auto" />
            </div>
            <div className="flex flex-col gap-y-2">
              <H2 text="styles" />
              <Table
                border={false}
                className="h-full overflow-y-auto px-3 py-2">
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/2">
                      name
                    </Th>
                    <Th position="end" className="w-1/2">
                      image
                    </Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {styles.map((style, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === styles.length - 1}>
                        {style.name}
                      </Td>
                      <Td position="end" isLastRow={i === styles.length - 1}>
                        <a
                          target="_blank"
                          href={style.image}
                          className="underline flex items-center gap-2">
                          <span>image</span>
                          <Image src={linkIcon} alt="link" />
                        </a>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button text="add style" className="text-xs mr-auto" />
            </div>
          </RolesAnalyticsCitiesContainer>
          <RolesAnalyticsCitiesContainer className="w-full">
            user behaivour and product analytics
          </RolesAnalyticsCitiesContainer>
        </div>
      </section>
      {isModalOpen && (
        <Modal toggleModal={toggleModal} isModalOpen={isModalOpen}>
          {modalContent === "city" ? (
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
          ) : modalContent === "currency" ? (
            <RolesAnalyticsCitiesModal
              heading="add currency"
              buttonText="add currency"
              onButtonClick={addNewCurrencyHandler}
              className={"flex items-center gap-8"}
              showModalSpinner={showModalSpinner}>
              <div className="w-1/2 space-y-3">
                <InputBox
                  label="Enter currency name"
                  value={newCurrency.name}
                  inputHandler={newCurrencyInputHandler}
                  idHtmlFor="name"
                  name="name"
                />
                <InputBox
                  type="number"
                  label="Enter value in PKR"
                  value={newCurrency.inPkr}
                  inputHandler={newCurrencyInputHandler}
                  idHtmlFor="inPkr"
                  name="inPkr"
                />
              </div>
              <div className="w-1/2 space-y-1">
                <span className="text-accent-1-dark">Select cities</span>
                <MultiCheckbox
                  className={"max-h-24 pl-2 overflow-y-auto"}
                  options={cities}
                  name="cities"
                  checked={newCurrency.cities}
                  onChange={newCurrencyInputHandler}
                />
              </div>
            </RolesAnalyticsCitiesModal>
          ) : (
            modalContent === "office" && (
              <RolesAnalyticsCitiesModal
                heading="add office"
                buttonText="add office"
                onButtonClick={addNewOfficeLocationHandler}
                className={"flex items-stretch gap-8"}
                showModalSpinner={showModalSpinner}>
                <div className="w-1/2 space-y-2">
                  <InputBox
                    label="Enter city name"
                    value={newOfficeLocation.city}
                    inputHandler={newOfficeLocationInputHandler}
                    idHtmlFor="city"
                    name="city"
                  />
                  <InputBox
                    label="Enter office address"
                    value={newOfficeLocation.address}
                    inputHandler={newOfficeLocationInputHandler}
                    idHtmlFor="address"
                    name="address"
                  />
                  <InputBox
                    label="Enter maps link"
                    value={newOfficeLocation.mapsLink}
                    inputHandler={newOfficeLocationInputHandler}
                    idHtmlFor="mapsLink"
                    name="mapsLink"
                  />
                </div>
                <Dropzone
                  content={"Attach an image"}
                  title={"Attach an image here"}
                  className={"w-1/2"}
                />
              </RolesAnalyticsCitiesModal>
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default RolesAnalyticsCities;
