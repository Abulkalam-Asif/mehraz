"use client";
import { useContext, useEffect, useState } from "react";
import { FreeProjectS1, Spinner } from "@/components";
import { useRouter } from "next/navigation";
import { AlertContext } from "@/context/AlertContext";
import addFreeProjectS1Service from "@/services/admin-side/free-project/addFreeProject";

const FreeProjectClientPage = ({ cities, plots }) => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const defaultProjectS1 = {
    title: "",
    city: cities[0]?.id,
    area: plots[0]?.id,
    budget: "MEDIUM",
    description: "",
    construction_cost: "",
    keywords: [],
    image: null,
    video: null,
    isComplete: false,
  };
  const [freeProjectS1, setFreeProjectS1] = useState(defaultProjectS1);

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
        type: "error",
        message: "No cities or plots found. Please add one first.",
      });
    }
  }, [cities, plots]);

  const addFreeProjectS1Handler = () => {
    // Calling the service
    const id = addFreeProjectS1Service(
      freeProjectS1,
      showAlert,
      setShowSpinner
    );
    if (id) {
      setFreeProjectS1(defaultProjectS1);
      setProjectId(id);
    }
  };

  return (
    <>
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 max-h-[calc(100vh-6rem-6rem)] xl:max-h-[calc(100vh-6rem-5rem)]">
        {projectId ? (
          <div>screen 2</div>
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
