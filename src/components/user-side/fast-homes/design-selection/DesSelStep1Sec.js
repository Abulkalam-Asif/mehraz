"use client";
import { lazy, Suspense, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { UserScreenSpinner } from "@/components";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";
import getCitiesFromDB from "@/Firebase/admin-side/roles-analytics-cities/cities/getCitiesFromFirebase";

const DesSelStep1Screen0 = lazy(() => import("./DesSelStep1Screen0"));
const DesSelStep1Screen1 = lazy(() => import("./DesSelStep1Screen1"));
const DesSelStep1Screen2 = lazy(() => import("./DesSelStep1Screen2"));

let citiesData = null,
  citiesPromise = null,
  stylesData = null,
  stylesPromise = null;

const fetchCities = () => {
  if (!citiesPromise) {
    citiesPromise = getCitiesFromDB().then(data => (citiesData = data));
    throw citiesPromise;
  }
  if (!citiesData) {
    throw citiesPromise;
  }
  return citiesData;
};

const fetchStyles = () => {
  if (!stylesPromise) {
    stylesPromise = getStylesFromDB(["id", "name", "budget", "image"]).then(
      data => (stylesData = data),
    );
    throw stylesPromise;
  }
  if (!stylesData) {
    throw stylesPromise;
  }
  return stylesData;
};

const DesSelStep1Sec = ({ screen }) => {
  const cities = fetchCities();
  const styles = fetchStyles();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const paramsScreen = searchParams.get("screen");

  useEffect(() => {
    if (paramsScreen === "0") {
      // Redirect to screen 1 after 3 seconds
      const screen0Timeout = setTimeout(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("screen", "1");
        router.push(`${pathname}?${newParams.toString()}`);
      }, 3000);

      return () => clearTimeout(screen0Timeout);
    }
  }, [paramsScreen, router, searchParams, pathname]);

  return (
    <>
      {screen === "0" ? (
        <Suspense fallback={<UserScreenSpinner />}>
          <DesSelStep1Screen0 />
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
