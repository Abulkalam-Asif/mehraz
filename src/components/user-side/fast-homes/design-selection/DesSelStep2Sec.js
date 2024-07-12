"use client";
import { lazy, Suspense } from "react";
import { UserScreenSpinner } from "@/components";

const DesSelStep2Screen0 = lazy(() => import("./DesSelStep2Screen0"));
const DesSelStep2Screen1 = lazy(() => import("./DesSelStep2Screen1"));

const DesSelStep1Sec = ({
  screen,
  changeStepScreen,
  areas,
  floors,
  familyUnits,
  step2DataFetchError,
}) => {
  // TODO: Show the error message if there is a step2DataFetchError
  return (
    <>
      {screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep2Screen0 changeStepScreen={changeStepScreen} />
        </Suspense>
      ) : screen === "1" ? (
        <>
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelStep2Screen1
              areas={areas}
              floors={floors}
              familyUnits={familyUnits}
            />
          </Suspense>
        </>
      ) : (
        screen === "2" && <div> step 2 screen 2</div>
      )}
    </>
  );
};

export default DesSelStep1Sec;
