"use client";
import { useEffect, useState } from "react";
import {
  TagsInput,
  FileInput,
  AdminInputBox2,
  AdminSelect2,
  AdminMultiSelect,
} from "@/components";

const ReadyProjectS1 = ({
  readyProjectS1,
  readyProjectS1InputHandler = () => {},
  cities,
  plots,
}) => {
  const [citiesOptions, setCitiesOptions] = useState(cities);
  useEffect(() => {
    if (!citiesOptions.some(city => city.id === "GENERAL")) {
      setCitiesOptions([
        { value: "GENERAL", label: "GENERAL" },
        ...citiesOptions.map(({ id, name }) => ({ value: id, label: name })),
      ]);
    }
  }, []);

  return (
    <>
      <form
        className="w-full max-w-7xl mx-auto py-4 pr-2 space-y-6"
        onSubmit={e => e.preventDefault()}>
        <div className="w-full grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          <AdminInputBox2
            label="title"
            type="text"
            name="title"
            idHtmlFor="title"
            value={readyProjectS1.title}
            inputHandler={readyProjectS1InputHandler}
          />
          <AdminMultiSelect
            title="cities"
            name="cities"
            options={citiesOptions}
            selectedOptions={readyProjectS1.cities}
            inputHandler={readyProjectS1InputHandler}
            message="Select cities"
          />
          <AdminMultiSelect
            title="areas"
            name="areas"
            options={plots?.map(({ id, area, unit }) => ({
              value: id,
              label: `${area} ${unit}`,
            }))}
            selectedOptions={readyProjectS1.areas}
            inputHandler={readyProjectS1InputHandler}
            message="Select areas"
          />
          <AdminSelect2
            label="budget"
            name="budget"
            idHtmlFor="budget"
            value={readyProjectS1.budget}
            options={[
              { value: "LOW", label: "LOW" },
              { value: "MEDIUM", label: "MEDIUM" },
              { value: "HIGH", label: "HIGH" },
            ]}
            inputHandler={readyProjectS1InputHandler}
          />
          <AdminInputBox2
            label="description"
            type="textarea"
            name="description"
            idHtmlFor="description"
            value={readyProjectS1.description}
            inputHandler={readyProjectS1InputHandler}
            className="row-start-1 col-start-3 row-span-2 lg:row-start-auto lg:col-start-auto"
          />
          <AdminInputBox2
            label="construction cost"
            type="text"
            name="construction_cost"
            idHtmlFor="construction_cost"
            value={readyProjectS1.construction_cost}
            inputHandler={readyProjectS1InputHandler}
          />
          <TagsInput
            label="keywords"
            tagsArr={readyProjectS1.keywords}
            name="keywords"
            idHtmlFor="keywords"
            inputHandler={readyProjectS1InputHandler}
          />
          <div className="flex gap-4">
            <FileInput
              accept={"image/*"}
              name="image"
              typeStartsWith={"image/"}
              message={"Attach an image."}
              wrongFileTypeWarning={"Please select an image to upload."}
              inputHandler={readyProjectS1InputHandler}
            />
            <FileInput
              accept={"video/*"}
              typeStartsWith={"video/"}
              name="video"
              message={"Attach a video."}
              wrongFileTypeWarning={"Please select a video to upload."}
              inputHandler={readyProjectS1InputHandler}
            />
          </div>
        </div>
        {/* <Button
          type="button"
          text="Next"
          isTransitioned={true}
          className="block ml-auto"
          onClick={addFreeProjectS1Handler}
        /> */}
      </form>
    </>
  );
};

export default ReadyProjectS1;
