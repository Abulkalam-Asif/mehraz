"use client";

import getProjectPreviewData from "@/Firebase/admin-side/ready_project/preview/getProjectPreviewData";
import { AlertContext } from "@/context/AlertContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Spinner,
  PreviewCarouselSmall,
  PreviewCarouselMain,
  LinkButton,
  PreviewCheckbox,
} from "@/components";
import Image from "next/image";

const PreviewClientPage = () => {
  const { showAlert } = useContext(AlertContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentImagesOption, setCurrentImagesOption] = useState(1);
  const [currentImagesArray, setCurrentImagesArray] = useState([]);
  const [previewData, setPreviewData] = useState(null);

  const getPreviewData = async projectId => {
    try {
      const data = await getProjectPreviewData(projectId);
      setPreviewData(data);
      setCurrentImagesArray(data.option1Images);
    } catch (error) {
      showAlert({
        type: "ERROR",
        message: error.message,
      });
      router.push("/admin/projects");
    }
  };

  useEffect(() => {
    const projectId = searchParams.get("id");
    getPreviewData(projectId);
  }, []);

  return (
    <>
      <div className="max-w-8xl w-full mx-auto h-page-container-admin xl:h-page-container-admin-xl overflow-y-auto pr-2">
        {previewData ? (
          <div className="flex gap-12 xl:gap-8 lg:flex-col-reverse sm:gap-4">
            <div className="space-y-6 w-5/12 xl:w-1/2 lg:w-full">
              <h2 className="font-bold text-2xl">{previewData.title} </h2>
              <p>{previewData.description}</p>
              <div>
                <h2 className="font-medium text-xl">Materials</h2>
                <PreviewCarouselSmall
                  slidesCount={previewData.materials?.length || 0}>
                  {previewData.materials?.map((material, index) => {
                    return (
                      <div key={index} className="p-2">
                        <div className="w-full h-28 rounded-md overflow-hidden sm:h-20">
                          <Image
                            src={material.image}
                            width={500}
                            height={500}
                            alt={material.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1 mt-2">
                          <h4>
                            {material.name} {index}
                          </h4>
                          <h5 className="border border-accent-2-base rounded-md p-1 text-center text-accent-1-dark text-sm">
                            {material.rate} PKR/SQ. FT.
                          </h5>
                        </div>
                      </div>
                    );
                  })}
                </PreviewCarouselSmall>
              </div>
              <div>
                <LinkButton
                  text="return to projects"
                  href="/admin/projects"
                  className="mx-auto w-fit block"
                  isTransitioned={true}
                  size="sm"
                />
              </div>
            </div>
            <div className="w-7/12 xl:w-1/2 lg:w-full">
              <PreviewCarouselMain slidesCount={2}>
                <div className="px-3">
                  <div className="h-[50vh] lg:h-[40vh] sm:h-[30vh] xs:h-[25vh]">
                    <video controls className="w-full h-full object-contain">
                      <source src={previewData.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="px-3">
                  <div className="h-[50vh] lg:h-[40vh] sm:h-[30vh] xs:h-[25vh]">
                    <Image
                      src={previewData.image}
                      width={500}
                      height={500}
                      alt={previewData.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </PreviewCarouselMain>
              <div className="flex flex-col lg:flex-col-reverse">
                <div className="flex flex-row justify-center gap-8 mt-4 mb-2">
                  <PreviewCheckbox
                    idHtmlFor="option1"
                    label="Option1"
                    value={1}
                    inpuHandler={() => {
                      setCurrentImagesOption(1);
                      setCurrentImagesArray(previewData.option1Images);
                    }}
                    checked={currentImagesOption === 1}
                  />
                  <PreviewCheckbox
                    idHtmlFor="option2"
                    label="Option2"
                    value={2}
                    inpuHandler={() => {
                      setCurrentImagesOption(2);
                      setCurrentImagesArray(previewData.option2Images);
                    }}
                    checked={currentImagesOption === 2}
                  />
                </div>
                <PreviewCarouselSmall
                  className="lg:mt-4"
                  slidesCount={currentImagesArray?.length || 0}>
                  {currentImagesArray?.map((image, index) => {
                    return (
                      <div key={index} className="p-2">
                        <div className="w-full h-28 rounded-md overflow-hidden sm:h-20">
                          <Image
                            src={image}
                            width={500}
                            height={500}
                            alt={previewData.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    );
                  })}
                </PreviewCarouselSmall>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <Spinner size={"lg"} text={"Fetching data..."} />
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewClientPage;
