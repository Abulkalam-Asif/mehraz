"use client";
import { lazy, Suspense } from "react";
import { UserScreenSpinner } from "@/components";
import useRPS from "@/hooks/useRPS";

const DesSelStep0 = lazy(() => import("./DesSelStep0"));
const DesSelStep1Sec = lazy(() => import("./DesSelStep1Sec"));
const DesSelStep2Sec = lazy(() => import("./DesSelStep2Sec"));

const DesSelClientPage = ({
  cities,
  styles,
  step1DataFetchError,
  areas,
  floors,
  familyUnits,
  step2DataFetchError,
}) => {
  const { router, pathname, searchParams } = useRPS();

  const step = searchParams.get("step");
  const screen = searchParams.get("screen");

  const changeStepScreen = (newStep, newScreen) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newStep && newSearchParams.set("step", newStep);
    newScreen && newSearchParams.set("screen", newScreen);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <>
      {step === "0" && screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep0
            nextStepHandler={() => {
              changeStepScreen("1", "0");
            }}
          />
        </Suspense>
      ) : step === "1" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep1Sec
            screen={screen}
            changeStepScreen={changeStepScreen}
            cities={cities}
            styles={styles}
            step1DataFetchError={step1DataFetchError}
          />
        </Suspense>
      ) : (
        step === "2" && (
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelStep2Sec
              screen={screen}
              changeStepScreen={changeStepScreen}
              areas={areas}
              floors={floors}
              familyUnits={familyUnits}
              step2DataFetchError={step2DataFetchError}
            />
          </Suspense>
        )
      )}
    </>
  );
};

export default DesSelClientPage;
