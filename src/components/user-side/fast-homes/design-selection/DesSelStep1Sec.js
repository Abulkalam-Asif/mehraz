"use client";
import { lazy, Suspense } from "react";
import { UserScreenSpinner } from "@/components";

const DesSelStep1Screen0 = lazy(() => import("./DesSelStep1Screen0"));
const DesSelStep1Screen1 = lazy(() => import("./DesSelStep1Screen1"));
const DesSelStep1Screen2 = lazy(() => import("./DesSelStep1Screen2"));

const DesSelStep1Sec = ({
  cities,
  styles,
  step1DataFetchError,
  screen,
  changeStepScreen,
}) => {
  // TODO: Show the error message if there is a step1DataFetchError
  return (
    <>
      {screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep1Screen0 changeStepScreen={changeStepScreen} />
        </Suspense>
      ) : screen === "1" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep1Screen1 cities={cities} styles={styles} />
        </Suspense>
      ) : (
        screen === "2" && (
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelStep1Screen2 cities={cities} styles={styles} />
          </Suspense>
        )
      )}
    </>
  );
};

export default DesSelStep1Sec;
