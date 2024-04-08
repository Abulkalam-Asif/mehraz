"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addReadyProjectS1Service,
  addReadyProjectS2Service,
  addReadyProjectS3Service,
} from "@/services/admin-side/ready-project/addReadyProject";
import { useShowAlert } from "@/hooks/useShowAlert";
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
  Spinner,
} from "@/components";
import getRPDesignsScreen4DataFromDb from "@/Firebase/admin-side/ready_project/getRPDesignsScreen4DataFromDb";
import {
  updateReadyProjectS1Service,
  updateReadyProjectS2Service,
} from "@/services/admin-side/ready-project/updateReadyProject";

const ReadyProjectClientPage = ({
  cities,
  plots,
  floors,
  units,
  styles,
  familyUnits,
  materials,
}) => {
  const showAlert = useShowAlert();
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [uploadedScreensCount, setUploadedScreensCount] = useState(0);
  const [projectId, setProjectId] = useState();
  const [rpDesigns, setRpDesigns] = useState([]);

  // Confirmation modal states and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);
  const [confirmationModalMetadata, setConfirmationModalMetadata] = useState({
    confirmationMessage: "",
    confirmationHandler: () => {},
  });

  useEffect(() => {
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
    // areas: ["FoelXqMpuaUUeNz1rNzt", "cTNSiUIDjdUksVNbgs6D"],
    // floors: ["B2q7f6fbEHSP78XQY9w3", "T8uSw1LVhxHyMts2UdFa"],
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
          "You have changed the areas or floors selection. Are you sure you want to update?",
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
      setRpDesigns(data);
      setScreen2PrevData({
        combinations: readyProjectS2.combinations,
        budgetRanges: readyProjectS2.budgetRanges,
      });
    }
  };

  const updateReadyProjectS2HandlerCheck = e => {
    e.preventDefault();
    if (
      screen2PrevData.combinations.every(prevCombination => {
        const newCombination = readyProjectS2.combinations.find(
          ({ area, floor }) =>
            area.id === prevCombination.area.id &&
            floor.id === prevCombination.floor.id,
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
          "You have changed the family units selection. Are you sure you want to update?",
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
      setRpDesigns(data);
      setScreen2PrevData({
        combinations: readyProjectS2.combinations,
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
    const isSuccessful = await addReadyProjectS3Service(
      projectId,
      readyProjectS3,
      showAlert,
      setShowSpinner,
    );
    if (isSuccessful) {
      const designs = [];
      try {
        await Promise.all(
          rpDesigns.map(async designId => {
            const designFromDb = await getRPDesignsScreen4DataFromDb(designId);
            if (designFromDb) {
              designs.push(designFromDb);
            }
          }),
        );
        console.log(designs);
        setRpDesigns(designs);
      } catch (error) {
        showAlert({
          type: "ERROR",
          message: "An error occurred. Please try again later.",
        });
      }
      setShowSpinner(false);
      setCurrentScreen(4);
      setUploadedScreensCount(3);
    }
  };
  const updateReadyProjectS3Handler = async e => {
    e.preventDefault();
  };

  return (
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
              onClick={() => setCurrentScreen(prevState => prevState - 1)}>
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
      <div className="max-w-8xl w-full mx-auto h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)] overflow-y-auto">
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
            areas={plots.filter(plot => readyProjectS1.areas.includes(plot.id))}
            floors={floors.filter(floor =>
              readyProjectS1.floors.includes(floor.id),
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
