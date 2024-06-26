"use client";

import { useSearchParams } from "next/navigation";
import { DesSelIntroSec, DesSelStep1Sec } from "@/components";
import { useEffect, useState } from "react";

const DesSelClientPage = ({ cities, styles }) => {
  const [step, setStep] = useState("");
  const [screen, setScreen] = useState("");

  const searchParams = useSearchParams();
  const paramsStep = searchParams.get("step");
  const paramsScreen = searchParams.get("screen");

  useEffect(() => {
    setStep(paramsStep);
    setScreen(paramsScreen);
  }, [paramsStep, paramsScreen]);

  return (
    <>
      {!paramsStep && !paramsScreen && <DesSelIntroSec />}
      {step === "" || screen === "" ? (
        <div>loading</div>
      ) : (
        step === "1" && (
          <DesSelStep1Sec screen={screen} cities={cities} styles={styles} />
        )
      )}
    </>
  );
};
export default DesSelClientPage;
