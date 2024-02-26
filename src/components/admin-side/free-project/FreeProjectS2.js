"use client";
import Button from "../Button";
import FileInput from "./FileInput";
import MultiFileInput from "./MultiFileInput";

const FreeProjectS2 = ({
  freeProjectS2InputHandler,
  addFreeProjectS2Handler,
  freeProjectS2,
}) => {
  return (
    <>
      <form className="w-full max-w-7xl mx-auto py-4 pr-2 space-y-6 overflow-y-auto">
        <div className="w-full flex">
          <div>
            <FileInput message={"Attach design file"} />
            <div>
              <MultiFileInput
                message={"Attach images"}
                filesArray={freeProjectS2.images}
                accept={"image/*"}
                typeStartsWith={"image"}
                name="image"
                htmlFor={"image"}
                inputHandler={freeProjectS2InputHandler}
                wrongFileTypeWarning="Some of the files were not images and were ignored"
              />
            </div>
          </div>
        </div>
        <Button
          type="button"
          text="Submit"
          isTransitioned={true}
          className="block ml-auto"
          onClick={addFreeProjectS2Handler}
        />
      </form>
    </>
  );
};

export default FreeProjectS2;
