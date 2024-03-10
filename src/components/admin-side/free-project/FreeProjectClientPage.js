"use client";
import { useContext, useEffect, useState } from "react";
import { FreeProjectS1, FreeProjectS2, Spinner } from "@/components";
import { useRouter } from "next/navigation";
import { AlertContext } from "@/context/AlertContext";
import addFreeProjectS1Service from "@/services/admin-side/free-project/addFreeProject";

const FreeProjectClientPage = ({ cities, plots }) => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [projectId, setProjectId] = useState("Some project id"); // UNDO: to be removed
  // Screen 1 states and handlers
  const defaultFreeProjectS1 = {
    title: "",
    city: "GENERAL",
    area: plots[0]?.id,
    budget: "MEDIUM",
    description: "",
    construction_cost: "",
    keywords: [],
    image: null,
    video: null,
  };
  const [freeProjectS1, setFreeProjectS1] = useState(defaultFreeProjectS1);

  const freeProjectS1InputHandler = (e, name = null, value = null) => {
    setFreeProjectS1({
      ...freeProjectS1,
      [name || e?.target.name]: value || e?.target.value,
    });
  };

  useEffect(() => {
    if (cities?.length == 0 || plots?.length == 0) {
      router.push("/admin/projects");
      showAlert({
        type: "ERROR",
        message: "No cities or plots found. Please add one first.",
      });
    }
  }, [cities, plots]);

  const addFreeProjectS1Handler = async () => {
    // Calling the service to add the free project screen 1 to the database
    const id = await addFreeProjectS1Service(
      freeProjectS1,
      showAlert,
      setShowSpinner,
    );
    // If the operation is successful, setting the returned projectId
    if (id) {
      setFreeProjectS1(defaultFreeProjectS1);
      setProjectId(id);
    }
  };

  // Screen 2 states and handlers
  const defaultFreeProjectS2 = {
    id: projectId,
    designFile: null,
    images: [],
    exteriorViews: [],
    interiorViews: [],
    materials: [],
    programs: [],
  };
  const [freeProjectS2, setFreeProjectS2] = useState(defaultFreeProjectS2);
  const freeProjectS2InputHandler = (e, name = null, value = null) => {
    setFreeProjectS2({
      ...freeProjectS2,
      [name || e?.target.name]: value || e?.target.value,
    });
  };
  const addFreeProjectS2Handler = () => {};

  return (
    <>
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)]">
        {projectId ? (
          <FreeProjectS2
            freeProjectS2={freeProjectS2}
            freeProjectS2InputHandler={freeProjectS2InputHandler}
            addFreeProjectS2Handler={addFreeProjectS2Handler}
          />
        ) : (
          <FreeProjectS1
            freeProjectS1={freeProjectS1}
            freeProjectS1InputHandler={freeProjectS1InputHandler}
            cities={cities}
            plots={plots}
            addFreeProjectS1Handler={addFreeProjectS1Handler}
          />
        )}
      </div>
      {showSpinner && (
        <div className="z-[4] bg-black bg-opacity-20 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default FreeProjectClientPage;
