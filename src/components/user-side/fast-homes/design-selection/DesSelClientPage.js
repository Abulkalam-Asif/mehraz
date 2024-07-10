"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, lazy, Suspense } from "react";
import { UserScreenSpinner } from "@/components";

const DesSelIntroSec = lazy(() => import("./DesSelIntroSec"));
const DesSelStep1Sec = lazy(() => import("./DesSelStep1Sec"));
const DesSelStep2Sec = lazy(() => import("./DesSelStep2Sec"));

const DesSelClientPage = () => {
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
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelIntroSec />
        </Suspense>
      ) : step === "1" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep1Sec screen={screen} />
        </Suspense>
      ) : (
        step === "2" && (
          <Suspense fallback={<UserScreenSpinner />}>
            <DesSelStep2Sec screen={screen} />
          </Suspense>
        )
      )}
    </>
  );
};

export default DesSelClientPage;
