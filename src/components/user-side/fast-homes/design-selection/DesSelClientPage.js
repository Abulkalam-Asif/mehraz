"use client";

import { useSearchParams } from "next/navigation";
import { DesSelIntroSec, DesSelStep1Sec } from "@/components";
import { useEffect, useState } from "react";

const DesSelClientPage = ({ cities, styles }) => {
  const [step, setStep] = useState(null);
  const [screen, setScreen] = useState(null);

  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const screenParam = searchParams.get("screen");

  useEffect(() => {
    setStep(stepParam);
    setScreen(screenParam);
  }, [stepParam, screenParam]);

  return (
    <>
      {step === "0" && screen === "0" ? (
        <DesSelIntroSec />
      ) : (
        step === "1" && (
          <DesSelStep1Sec screen={screen} cities={cities} styles={styles} />
        )
      )}
    </>
  );
};
export default DesSelClientPage;
