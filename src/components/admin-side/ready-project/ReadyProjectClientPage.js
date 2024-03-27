"use client";
import { useState } from "react";
import ReadyProjectScreen1 from "./ReadyProjectScreen1";

const ReadyProjectClientPage = ({ cities, plots }) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  // Screen 1 states and handlers
  const defaultReadyProjectS1 = {
    title: "",
    budget: "MEDIUM",
    description: "",
    cities: [],
    areas: [],
    floors: [],
    style: "",
    constructionRates: [],
    productRates: [],
    keywords: [],
  };
  const [readyProjectS1, setReadyProjectS1] = useState(defaultReadyProjectS1);
  const readyProjectS1InputHandler = (name, value) => {
    setReadyProjectS1(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        {currentScreen === 1 ? (
          <ReadyProjectScreen1
            readyProjectS1={readyProjectS1}
            readyProjectS1InputHandler={readyProjectS1InputHandler}
            plots={plots}
            cities={cities}
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
    </>
  );
};

export default ReadyProjectClientPage;
