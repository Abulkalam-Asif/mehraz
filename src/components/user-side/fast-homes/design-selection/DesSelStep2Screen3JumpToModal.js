"use client";
import { jumpToIcon } from "@/assets";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import {
  DesSelStep1Screen2Select,
  DesSelStep1Screen2InputBox,
  Button,
} from "@/components";
import { useState } from "react";
import useRPS from "@/hooks/useRPS";

const DesSelStep2Screen3JumpToModal = ({
  isModalOpen = false,
  toggleModal = () => {},
  areas,
  floors,
  familyUnits,
}) => {
  const { router, pathname, searchParams } = useRPS();

  const defaultStep1Screen3FormData = {
    area: searchParams.get("area") || "",
    floor: searchParams.get("floor") || "",
    familyUnit: searchParams.get("familyUnit") || "",
  };

  const [step1Screen3FormData, setStep1Screen3FormData] = useState(
    defaultStep1Screen3FormData,
  );
  const step1Screen3FormDataInputHandler = (key, value) => {
    setStep1Screen3FormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const applyChangesHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("area", step1Screen3FormData.area);
    newSearchParams.set("floor", step1Screen3FormData.floor);
    newSearchParams.set("familyUnit", step1Screen3FormData.familyUnit);
    router.push(`${pathname}?${newSearchParams.toString()}`);
    router.refresh();
    toggleModal();
  };

  return (
    <>
      <div
        onClick={toggleModal}
        className={`${
          isModalOpen
            ? "fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-[2]"
            : "hidden"
        }`}></div>
      {
        <div
          className={`fixed z-[3] w-full max-w-3xl lg:max-w-xl min-h-[50vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl overflow-hidden px-10 sm:px-4 pb-8 sm:pb-4`}>
          <div className="w-full flex items-center justify-center border-b border-b-black/30">
            <div className="mx-auto flex items-center gap-4 lg:py-2">
              <Image
                src={jumpToIcon}
                width={96}
                height={96}
                alt="Jump to icon"
                className="w-24 lg:w-14 xs:w-12 h-auto opacity-50"
              />
              <span className="text-2xl lg:text-base xs:text-sm text-black/90 uppercase">
                jump to a different...
              </span>
            </div>
            <button onClick={toggleModal} className="p-2 rounded-full ">
              <AiOutlineClose size={28} className="text-[#2F2F2F] w-7 h-auto" />
            </button>
          </div>
          <div className="flex lg:flex-col items-center justify-center gap-8 lg:gap-6 pt-4 pb-20">
            <DesSelStep1Screen2InputBox label={"area"}>
              <DesSelStep1Screen2Select
                options={
                  areas
                    ? [
                        {
                          label: "CHOOSE",
                          value: "",
                        },
                        ...areas?.map(({ area, unit, id }) => ({
                          label: `${area} ${unit.name}`,
                          value: id,
                        })),
                      ]
                    : []
                }
                selectedOption={step1Screen3FormData.area}
                selectHandler={value =>
                  step1Screen3FormDataInputHandler("area", value)
                }
              />
            </DesSelStep1Screen2InputBox>
            <DesSelStep1Screen2InputBox label={"floor"}>
              <DesSelStep1Screen2Select
                options={
                  floors
                    ? [
                        {
                          label: "CHOOSE",
                          value: "",
                        },
                        ...floors?.map(floor => ({
                          label: floor.name,
                          value: floor.id,
                        })),
                      ]
                    : []
                }
                selectedOption={step1Screen3FormData.floor}
                selectHandler={value =>
                  step1Screen3FormDataInputHandler("floor", value)
                }
              />
            </DesSelStep1Screen2InputBox>
            <DesSelStep1Screen2InputBox label={"family unit"}>
              <DesSelStep1Screen2Select
                options={
                  familyUnits
                    ? [
                        {
                          label: "CHOOSE",
                          value: "",
                        },
                        ...familyUnits.map(familyUnit => ({
                          label: familyUnit.name,
                          value: familyUnit.id,
                        })),
                      ]
                    : []
                }
                selectedOption={step1Screen3FormData.familyUnit}
                selectHandler={value =>
                  step1Screen3FormDataInputHandler("familyUnit", value)
                }
              />
            </DesSelStep1Screen2InputBox>
          </div>
          <div>
            <Button
              color="accent-2"
              text="apply changes"
              isTransitioned={true}
              className="block mx-auto"
              size="base"
              onClick={applyChangesHandler}
            />
          </div>
        </div>
      }
    </>
  );
};

export default DesSelStep2Screen3JumpToModal;
