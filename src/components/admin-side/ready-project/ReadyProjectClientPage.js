"use client";
import { useState } from "react";
import ReadyProjectScreen1 from "./ReadyProjectScreen1";
import { addReadyProjectS1Service } from "@/services/admin-side/ready-project/addReadyProject";
import Spinner from "../Spinner";
import { useShowAlert } from "@/hooks/useShowAlert";

const ReadyProjectClientPage = ({ cities, plots, floors, units, styles }) => {
  const showAlert = useShowAlert();
  const [showSpinner, setShowSpinner] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  // Screen 1 states and handlers
  const defaultReadyProjectS1 = {
    title: "",
    budget: "MEDIUM",
    description: "",
    cities: [],
    areas: [],
    floors: [],
    units: [],
    style: styles[0]?.id || "",
    constructionRates: ["", "", ""],
    productRates: ["", "", ""],
    keywords: [],
    image: null,
    video: null,
  };
  const [readyProjectS1, setReadyProjectS1] = useState(defaultReadyProjectS1);
  const readyProjectS1InputHandler = (name, value) => {
    setReadyProjectS1(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addReadyProjectS1Handler = async e => {
    e.preventDefault();
    const data = await addReadyProjectS1Service(
      readyProjectS1,
      showAlert,
      setShowSpinner,
    );
    console.log(data);
  };

  return (
    <>
      <div>
        {currentScreen === 1 ? (
          <ReadyProjectScreen1
            readyProjectS1={readyProjectS1}
            readyProjectS1InputHandler={readyProjectS1InputHandler}
            addReadyProjectS1Handler={addReadyProjectS1Handler}
            plots={plots}
            floors={floors}
            units={units}
            cities={cities}
            styles={styles}
          />
        ) : currentScreen === 2 ? (
          <div>step 2</div>
        ) : currentScreen === 3 ? (
          <div>step 3</div>
        ) : currentScreen === 4 ? (
          <div>step 4</div>
        ) : (
          currentScreen === 5 && <div>step 5</div>
        )}
      </div>
      {showSpinner && (
        <div className="z-[4] bg-black bg-opacity-20 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default ReadyProjectClientPage;
