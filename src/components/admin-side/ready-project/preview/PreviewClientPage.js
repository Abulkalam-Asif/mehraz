"use client";

import getProjectPreviewData from "@/Firebase/admin-side/ready_project/preview/getProjectPreviewData";
import { AlertContext } from "@/context/AlertContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Spinner, H2, PreviewCarouselSmall } from "@/components";
import Image from "next/image";
const previewData = {
  title: "THIS IS SOME PROJECT",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  materials: [
    {
      name: "HELLO",
      rate: 2,
      image:
        "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/MATERIALS%2F01HTJ1KMH4RXKKB73RTNHY6ZQ0%2Fimage1?alt=media&token=d69e0e85-9b95-4c77-8674-417fd6a708a2",
    },
    {
      name: "world",
      rate: 10,
      image:
        "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/MATERIALS%2F01HTJ1KMH4RXKKB73RTNHY6ZQ0%2Fimage1?alt=media&token=d69e0e85-9b95-4c77-8674-417fd6a708a2",
    },
  ],
  image:
    "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fimage?alt=media&token=ff2d898a-c9ce-4ac4-a46b-307f93a9889c",
  video:
    "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fvideo?alt=media&token=f3cc9c27-3d06-4e23-8209-20a5d032a253",
  option1Images: [
    "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fimages%2Foption1%2F01HX2HX5BEV28P1CVCY9DZ0RR4?alt=media&token=a310c51c-9b40-4cc1-9415-8a1381c2e122",
  ],
  option2Images: [
    "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fimages%2Foption2%2F01HX2HX5BEV28P1CVCY9DZ0RR5?alt=media&token=cc68293e-7917-4923-8111-273a309c8340",
  ],
};

const PreviewClientPage = () => {
  const { showAlert } = useContext(AlertContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [previewData, setPreviewData] = useState(null);

  // const getPreviewData = async projectId => {
  //   try {
  //     const data = await getProjectPreviewData(projectId);
  //     setPreviewData(data);
  //   } catch (error) {
  //     showAlert({
  //       type: "ERROR",
  //       message: error.message,
  //     });
  //     router.push("/admin/projects");
  //   }
  // };

  // useEffect(() => {
  //   const projectId = searchParams.get("id");
  //   getPreviewData(projectId);
  // }, []);

  return (
    <>
      <div className="max-w-8xl w-full mx-auto h-page-container-admin xl:h-page-container-admin-xl overflow-y-auto px-8">
        {previewData ? (
          <div className="grid grid-cols-2">
            <div>
              <H2 text={previewData.title} />
              <p>{previewData.description}</p>
              <PreviewCarouselSmall slidesCount={previewData.materials?.length}>
                {previewData.materials?.map((material, index) => {
                  return (
                    <div key={index} className="p-2">
                      <div className="w-full h-28 rounded-md overflow-hidden">
                        <Image
                          src={material.image}
                          width={100}
                          height={100}
                          alt={material.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4>{material.name}</h4>
                        <h5>{material.rate} PKR/sq. ft.</h5>
                      </div>
                    </div>
                  );
                })}
              </PreviewCarouselSmall>
            </div>
            <div>carousel</div>
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
