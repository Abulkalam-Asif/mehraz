"use client";
import Button from "../Button";
import FileInput from "./FileInput";
import MultiFileInput from "../MultiFileInput";
import MultiFileDisplay from "../MultiFileDisplay";
import ExteriorSection from "./ExteriorSection";
import InteriorSection from "./InteriorSection";

const exteriorViews = [
  {
    name: "front",
    video: "something",
    description: "something",
  },
  {
    name: "front",
    video: "something",
    description: "something",
  },
  {
    name: "front",
    video: "something",
    description: "something",
  },
  {
    name: "back",
    video: "something",
    description: "something",
  },
  {
    name: "left",
    video: "something",
    description: "something",
  },
  {
    name: "right",
    video: "something",
    description: "something",
  }
]
const interiorViews = [
  {
    name: "front",
    video: "something",
    description: "something",
  },
  {
    name: "back",
    video: "something",
    description: "something",
  },
  {
    name: "left",
    video: "something",
    description: "something",
  },
  {
    name: "right",
    video: "something",
    description: "something",
  }
]

const FreeProjectS2 = ({
  freeProjectS2InputHandler,
  addFreeProjectS2Handler,
  freeProjectS2,
}) => {
  return (
    <>
      <form className="h-full flex gap-4 w-full max-w-7xl mx-auto pr-2">
        <div className="h-full w-full grid grid-cols-3 gap-4">
          <div>
            <FileInput message={"Attach design file"} />
            <div>
              <MultiFileInput
                message={"Attach images"}
                filesArray={freeProjectS2.images}
                accept={"image/*"}
                typeStartsWith={"image"}
                name="images"
                htmlFor={"images"}
                inputHandler={freeProjectS2InputHandler}
                wrongFileTypeWarning="Some of the files were not images and were not attached."
              />
              <MultiFileDisplay filesArray={freeProjectS2.images} removeFileHandler={freeProjectS2InputHandler} />
            </div>
          </div>
          <div className="h-full overflow-hidden col-span-2 grid grid-rows-3 gap-4">
            <ExteriorSection exteriorViews={exteriorViews} />
            <ExteriorSection exteriorViews={exteriorViews} />
            <ExteriorSection exteriorViews={exteriorViews} />
            {/* <InteriorSection interiorViews={interiorViews} /> */}
            {/* <InteriorSection interiorViews={interiorViews} /> */}
          </div>
        </div>
        <Button
          type="button"
          text="Upload"
          isTransitioned={true}
          className="block ml-auto self-end"
          onClick={addFreeProjectS2Handler}
        />
      </form>
    </>
  );
};

export default FreeProjectS2;
