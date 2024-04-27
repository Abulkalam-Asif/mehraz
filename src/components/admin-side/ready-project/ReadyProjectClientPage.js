"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  addReadyProjectS1Service,
  addReadyProjectS2Service,
  addReadyProjectS3Service,
} from "@/services/admin-side/ready-project/addReadyProject";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { chevronLeftIcon } from "@/assets";
import {
  ConfirmationModal,
  H1,
  Modal,
  ReadyProjectScreen1,
  ReadyProjectScreen2,
  ReadyProjectScreen3,
  ReadyProjectScreen4,
  Spinner,
} from "@/components";
import getRPDesignData from "@/Firebase/admin-side/ready_project/getRPDesignData";
import {
  updateReadyProjectS1Service,
  updateReadyProjectS2Service,
  updateReadyProjectS3Service,
} from "@/services/admin-side/ready-project/updateReadyProject";
import { getRPUploadedScreensCount } from "@/Firebase/admin-side/ready_project/getRPUploadedScreensCount";
import { getScreen1Data } from "@/Firebase/admin-side/ready_project/getRPScreen1Data";
import { getRPScreen2Data } from "@/Firebase/admin-side/ready_project/getRPScreen2Data";

const ReadyProjectClientPage = ({
  cities,
  plots,
  floors,
  units,
  styles,
  familyUnits,
  materials,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const serachParams = useSearchParams();

  const { showAlert } = useContext(AlertContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showReloadSpinner, setShowReloadSpinner] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [uploadedScreensCount, setUploadedScreensCount] = useState(0);
  const [projectId, setProjectId] = useState("");
  const [rpDesignIds, setRpDesignIds] = useState([]);
  const [rpDesignsData, setRpDesignsData] = useState([]);
  const [productRates, setProductRates] = useState([]);

  // Confirmation modal states and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);
  const [confirmationModalMetadata, setConfirmationModalMetadata] = useState({
    confirmationMessage: "",
    confirmationHandler: () => {},
  });

  useEffect(() => {
    // Check if all the required data is available
    if (cities?.length === 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No cities found. Please add one first",
      });
    } else if (plots?.length === 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No plots found. Please add one first",
      });
    } else if (floors?.length === 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No floors found. Please add one first",
      });
    } else if (units?.length === 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No units found. Please add one first",
      });
    } else if (styles?.length === 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No styles found. Please add one first",
      });
    } else if (familyUnits?.length === 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No family units found. Please add one first",
      });
    } else if (materials?.length === 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No materials found. Please add one first",
      });
    }
  }, [cities, plots, floors, units, styles, familyUnits, materials]);

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
  // Keeping track of the previous areas and floors selection to check if the user has changed the selection
  const [screen1PrevData, setScreen1PrevData] = useState({
    areas: [],
    floors: [],
  });

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
    if (data) {
      const { id, imageUrl, videoUrl } = data;
      setProjectId(id);
      setReadyProjectS1(prevState => ({
        ...prevState,
        image: imageUrl,
        video: videoUrl,
      }));
      setScreen1PrevData({
        areas: readyProjectS1.areas,
        floors: readyProjectS1.floors,
      });
      setCurrentScreen(2);
      setUploadedScreensCount(1);
      // Updating the url with projectId and currentScreen
      const params = new URLSearchParams(serachParams);
      params.set("id", id);
      params.set("screen", 2);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const updateReadyProjectS1HandlerCheck = e => {
    e.preventDefault();
    if (
      screen1PrevData.areas.every(area =>
        readyProjectS1.areas.includes(area),
      ) &&
      screen1PrevData.floors.every(floor =>
        readyProjectS1.floors.includes(floor),
      )
    ) {
      updateReadyProjectS1Handler();
    } else {
      setConfirmationModalMetadata({
        confirmationMessage:
          "You have changed the areas or floors selection. Some designs may get deleted. Are you sure you want to continue?",
        confirmationHandler: updateReadyProjectS1Handler,
      });
      toggleModal();
    }
  };

  const updateReadyProjectS1Handler = async () => {
    const data = await updateReadyProjectS1Service(
      projectId,
      readyProjectS1,
      showAlert,
      setShowSpinner,
    );
    if (data) {
      setReadyProjectS1(prevState => ({
        ...prevState,
        image: data.imageUrl,
        video: data.videoUrl,
      }));
      setScreen1PrevData({
        areas: readyProjectS1.areas,
        floors: readyProjectS1.floors,
      });
      setCurrentScreen(2);
      // Updating the url with projectId and currentScreen
      const params = new URLSearchParams(serachParams);
      params.set("screen", 2);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // Screen 2 states and handlers
  const defaultReadyProjectS2 = {
    combinations: [],
    budgetRanges: [],
  };

  const [readyProjectS2, setReadyProjectS2] = useState(defaultReadyProjectS2);

  // Keeping the track of previous combinations
  const [screen2PrevData, setScreen2PrevData] = useState({
    combinations: [],
    budgetRanges: [],
  });

  useEffect(() => {
    setReadyProjectS2(prevState => ({
      ...prevState,
      budgetRanges: readyProjectS1.areas.map(area => ({
        areaId: area,
        min: 0,
        max: 0,
      })),
    }));
  }, [readyProjectS1.areas]);

  const readyProjectS2InputHandler = (name, value) => {
    setReadyProjectS2(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addReadyProjectS2Handler = async e => {
    console.log("Add");
    e.preventDefault();
    const data = await addReadyProjectS2Service(
      projectId,
      readyProjectS2,
      showAlert,
      setShowSpinner,
    );
    if (data) {
      setCurrentScreen(3);
      setUploadedScreensCount(2);
      setRpDesignIds(data);
      setScreen2PrevData({
        combinations: readyProjectS2.combinations.map(
          ({ area, floor, familyUnits }) => ({
            areaId: area.id,
            floorId: floor.id,
            familyUnits: familyUnits,
          }),
        ),
        budgetRanges: readyProjectS2.budgetRanges,
      });
      // Updating the url with currentScreen
      const params = new URLSearchParams(serachParams);
      params.set("screen", 3);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const updateReadyProjectS2HandlerCheck = e => {
    e.preventDefault();
    if (
      // Checking if the user has changed the family units selection
      screen2PrevData.combinations.every(prevCombination => {
        const newCombination = readyProjectS2.combinations.find(
          ({ area, floor }) =>
            area.id === prevCombination.areaId &&
            floor.id === prevCombination.floorId,
        );
        if (newCombination) {
          return prevCombination.familyUnits.every(familyUnit =>
            newCombination.familyUnits.includes(familyUnit),
          );
        } else {
          return true;
        }
      })
    ) {
      updateReadyProjectS2Handler();
    } else {
      setConfirmationModalMetadata({
        confirmationMessage:
          "You have changed the family units selection. Some designs may get deleted. Are you sure you want to continue?",
        confirmationHandler: updateReadyProjectS2Handler,
      });
      toggleModal();
    }
  };

  const updateReadyProjectS2Handler = async () => {
    const data = await updateReadyProjectS2Service(
      projectId,
      readyProjectS2,
      showAlert,
      setShowSpinner,
    );
    if (data) {
      setCurrentScreen(3);
      setRpDesignIds(data);
      setScreen2PrevData({
        combinations: readyProjectS2.combinations.map(
          ({ area, floor, familyUnits }) => ({
            areaId: area.id,
            floorId: floor.id,
            familyUnits: familyUnits,
          }),
        ),
        budgetRanges: readyProjectS2.budgetRanges,
      });
    }
  };

  // Screen 3 states and handlers
  const defaultReadyProjectS3 = {
    interiorViews: [],
    exteriorViews: [],
    materials: [],
    imagesOp1: [],
    imagesOp2: [],
  };

  const [readyProjectS3, setReadyProjectS3] = useState(defaultReadyProjectS3);
  const readyProjectS3InputHandler = (name, value) => {
    setReadyProjectS3(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addReadyProjectS3Handler = async e => {
    e.preventDefault();
    const data = await addReadyProjectS3Service(
      projectId,
      readyProjectS3,
      showAlert,
      setShowSpinner,
    );
    if (data) {
      // Replacing image files with urls
      setReadyProjectS3(prevState => ({
        ...prevState,
        imagesOp1: data.op1ImageUrls,
        imagesOp2: data.op2ImageUrls,
      }));
      const designs = [];
      try {
        // Fetching designs data from db to show on screen 4
        await Promise.all(
          rpDesignIds.map(async designId => {
            const designFromDb = await getRPDesignData(designId);
            if (designFromDb) {
              designs.push(designFromDb);
            }
          }),
        );
        setRpDesignsData(designs);
        // Fetching product rates data
        const productRates = await getRPDesignsProductRates();
        setProductRates(productRates);
      } catch (error) {
        showAlert({
          type: "ERROR",
          message: "An error occurred. Please try again.",
        });
      }
      setShowSpinner(false);
      setCurrentScreen(4);
      setUploadedScreensCount(3);
      // Updating the url with currentScreen
      const params = new URLSearchParams(serachParams);
      params.set("screen", 4);
      router.push(`${pathname}?${params.toString()}`);
    }
  };
  const updateReadyProjectS3Handler = async e => {
    e.preventDefault();
    const data = await updateReadyProjectS3Service(
      projectId,
      readyProjectS3,
      showAlert,
      setShowSpinner,
    );
    if (data) {
      // Replacing image files with urls
      setReadyProjectS3(prevState => ({
        ...prevState,
        imagesOp1: data.op1ImageUrls,
        imagesOp2: data.op2ImageUrls,
      }));
      const designs = [];
      try {
        await Promise.all(
          rpDesignIds.map(async designId => {
            const designFromDb = await getRPDesignData(designId);
            if (designFromDb) {
              designs.push(designFromDb);
            }
          }),
        );
        setRpDesignsData(designs);
      } catch (error) {
        showAlert({
          type: "ERROR",
          message: "An error occurred. Please try again.",
        });
      }
      setShowSpinner(false);
      setCurrentScreen(4);
    }
  };

  // Screen 4 states and handlers
  const defaultReadyProjectS4Design = {
    video: null,
    designCost: 0,
    constructionCost: 0,
    op1Name: "",
    op2Name: "",
    imagesOp1: [],
    imagesOp2: [],
    keywords: [],
    description: "",
    descriptionOp1: "",
    descriptionOp2: "",
    exteriorViews: [],
    interiorViews: [],
    materials: [],
    programs: [],
    designRates: null,
    constructionRates: null,
    discount: 0,
    totalAmount: 0,
  };

  const [readyProjectS4Design, setReadyProjectS4Design] = useState(
    defaultReadyProjectS4Design,
  );
  const [uploadedDesigns, setUploadedDesigns] = useState([]);
  const readyProjectS4InputHandler = (name, value) => {
    setReadyProjectS4Design(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const prevScreenButtonHandler = () => {
    if (currentScreen === 1) return;
    setCurrentScreen(prevState => prevState - 1);
    const params = new URLSearchParams(serachParams);
    params.set("screen", currentScreen - 1);
    router.push(`${pathname}?${params.toString()}`);
  };

  // When the user reloads the page, this function will fetch the data for the current screen
  const getScreenDataOnReload = async (currentScreen, projectId) => {
    switch (currentScreen) {
      case 1: {
        try {
          const projectData = await getScreen1Data(projectId);
          setReadyProjectS1(projectData);
          setScreen1PrevData({
            areas: projectData.areas,
            floors: projectData.floors,
          });
          return true;
        } catch (error) {
          showAlert({
            type: "ERROR",
            message: error.message,
          });
          return false;
        }
      }
      case 2: {
        try {
          const projectData = await getRPScreen2Data(projectId);
          setReadyProjectS2("Project data", projectData);
          setScreen1PrevData({
            areas: projectData.areas,
            floors: projectData.floors,
          });
          setScreen2PrevData({
            combinations: projectData.combinations,
            budgetRanges: projectData.budgetRanges,
          });
          return true;
        } catch (error) {
          showAlert({
            type: "ERROR",
            message: error.message,
          });
          return false;
        }
      }
      default: {
        return false;
      }
    }
  };

  useEffect(() => {
    // If the user reloads the page, the app should check if the projectId and currentScreen are available in the url
    const handleSearchParams = async () => {
      const currentScreenParam = serachParams.get("screen");
      const projectIdParam = serachParams.get("id");
      const params = new URLSearchParams(serachParams);
      if (projectIdParam && currentScreenParam) {
        let uploadedScreensCountDB;
        // Fetching the uploadedScreensCount from db
        uploadedScreensCountDB = await getRPUploadedScreensCount(
          projectIdParam,
        );
        if (uploadedScreensCountDB) {
          // If the uploadedScreensCount is available in the db, it means at least one screen is uploaded
          if (currentScreenParam - uploadedScreensCountDB <= 1) {
            // If the currentScreen is less than or equal or 1 more than the currentScreen, set the states
            const isSuccessful = await getScreenDataOnReload(
              Number(currentScreenParam),
              projectIdParam,
            );
            if (isSuccessful) {
              // If the data for the particular screen is fetched successfully, set the states
              setUploadedScreensCount(uploadedScreensCountDB);
              setProjectId(projectIdParam);
              setCurrentScreen(Number(currentScreenParam));
            } else {
              // If the data is not fetched successfully, redirect to the first screen
              params.delete("id");
              params.set("screen", 1);
              router.push(`${pathname}?${params.toString()}`);
            }
          } else {
            const isSuccessful = await getScreenDataOnReload(
              Number(currentScreenParam),
              projectIdParam,
            );
            if (isSuccessful) {
              // If the currentScreen is more than 1 more than the uploadedScreensCount, then the user has manually changed the url. Redirect to highest screen possible
              params.set("screen", uploadedScreensCountDB + 1);
              router.push(`${pathname}?${params.toString()}`);
              setCurrentScreen(uploadedScreensCountDB + 1);
              setUploadedScreensCount(uploadedScreensCountDB);
            } else {
              // If the data is not fetched successfully, redirect to the first screen
              params.delete("id");
              params.set("screen", 1);
              router.push(`${pathname}?${params.toString()}`);
            }
          }
        } else {
          // If the project with the given projectId is not found in the db, or the uploadedScreensCount is not available, it means user has manually changed the url to a wrong projectId or currentScreen. Redirect to the first screen
          params.delete("id");
          params.set("screen", 1);
          router.push(`${pathname}?${params.toString()}`);
          showAlert({
            type: "ERROR",
            message: "An error occurred. Please try again.",
          });
        }
      } else {
        // If the projectId and currentScreen are not available in the url, redirect to the first screen
        params.set("screen", 1);
        params.set("screen", 1);
        router.push(`${pathname}?${params.toString()}`);
      }
      setShowReloadSpinner(false);
    };

    handleSearchParams();
  }, []);

  return showReloadSpinner ? (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <Spinner size={"lg"} text={"Fetching data..."} />
    </div>
  ) : (
    <>
      <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20">
        <div className="w-full flex justify-between items-center">
          {currentScreen === 1 ? (
            <Link
              href={"/admin/projects"}
              className="bg-accent-1-base rounded-full p-5 xl:p-4">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </Link>
          ) : (
            <button
              className="bg-accent-1-base rounded-full p-5 xl:p-4"
              onClick={prevScreenButtonHandler}>
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </button>
          )}
          <H1 text="Project upload" className="mx-auto xl:text-2xl" />
        </div>
      </div>
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto h-page-container-admin xl:h-page-container-admin-xl overflow-y-auto">
        {currentScreen === 1 ? (
          <ReadyProjectScreen1
            readyProjectS1={readyProjectS1}
            readyProjectS1InputHandler={readyProjectS1InputHandler}
            addReadyProjectS1Handler={addReadyProjectS1Handler}
            updateReadyProjectS1HandlerCheck={updateReadyProjectS1HandlerCheck}
            uploadedScreensCount={uploadedScreensCount}
            plots={plots}
            floors={floors}
            units={units}
            cities={cities}
            styles={styles}
          />
        ) : currentScreen === 2 ? (
          <ReadyProjectScreen2
            readyProjectS2={readyProjectS2}
            areas={plots.filter(plot =>
              screen1PrevData.areas.includes(plot.id),
            )}
            floors={floors.filter(floor =>
              screen1PrevData.floors.includes(floor.id),
            )}
            setReadyProjectS2={setReadyProjectS2}
            uploadedScreensCount={uploadedScreensCount}
            readyProjectS2InputHandler={readyProjectS2InputHandler}
            familyUnits={familyUnits}
            addReadyProjectS2Handler={addReadyProjectS2Handler}
            screen2PrevData={screen2PrevData}
            updateReadyProjectS2HandlerCheck={updateReadyProjectS2HandlerCheck}
          />
        ) : currentScreen === 3 ? (
          <ReadyProjectScreen3
            readyProjectS3={readyProjectS3}
            readyProjectS3InputHandler={readyProjectS3InputHandler}
            addReadyProjectS3Handler={addReadyProjectS3Handler}
            updateReadyProjectS3Handler={updateReadyProjectS3Handler}
            materials={materials}
            uploadedScreensCount={uploadedScreensCount}
          />
        ) : currentScreen === 4 ? (
          <ReadyProjectScreen4
            materials={materials}
            rpDesignsData={rpDesignsData}
            readyProjectS4Design={readyProjectS4Design}
            readyProjectS4InputHandler={readyProjectS4InputHandler}
            setReadyProjectS4Design={setReadyProjectS4Design}
            productRates={productRates}
            uploadedDesigns={uploadedDesigns}
          />
        ) : (
          currentScreen === 5 && <div>step 5</div>
        )}
      </div>
      {showSpinner && (
        <div className="z-[4] bg-black bg-opacity-10 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
          <Spinner size={"lg"} text={"Uploading..."} />
        </div>
      )}
      {isModalOpen && (
        <Modal toggleModal={toggleModal} isModalOpen={isModalOpen}>
          <ConfirmationModal
            toggleModal={toggleModal}
            confirmationMessage={confirmationModalMetadata.confirmationMessage}
            confirmationHandler={confirmationModalMetadata.confirmationHandler}
          />
        </Modal>
      )}
    </>
  );
};

export default ReadyProjectClientPage;
