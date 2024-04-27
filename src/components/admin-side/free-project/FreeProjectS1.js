"use client";
import { useEffect, useState } from "react";
import {
  Button,
  TagsInput,
  FileInput,
  AdminInputBox2,
  AdminSelect2,
} from "@/components";

const FreeProjectS1 = ({
  freeProjectS1,
  freeProjectS1InputHandler = () => {},
  cities,
  plots,
  addFreeProjectS1Handler,
}) => {
  const [citiesOptions, setCitiesOptions] = useState(cities);
  useEffect(() => {
    if (!citiesOptions.some(city => city.id === "GENERAL")) {
      setCitiesOptions([{ id: "GENERAL", name: "GENERAL" }, ...citiesOptions]);
    }
  }, []);

  return (
    <>
      <form
        className="w-full max-w-7xl mx-auto py-4 pr-2 space-y-6 overflow-y-auto"
        onSubmit={e => e.preventDefault()}>
        <div className="w-full grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          <AdminInputBox2
            label="title"
            type="text"
            name="title"
            idHtmlFor="title"
            value={freeProjectS1.title}
            inputHandler={freeProjectS1InputHandler}
          />
          <AdminSelect2
            label="city"
            name="city"
            idHtmlFor="city"
            value={freeProjectS1.city}
            options={citiesOptions?.map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
            inputHandler={freeProjectS1InputHandler}
          />
          <AdminSelect2
            label="budget"
            name="budget"
            idHtmlFor="budget"
            value={freeProjectS1.budget}
            options={[
              { value: "LOW", label: "LOW" },
              { value: "MEDIUM", label: "MEDIUM" },
              { value: "HIGH", label: "HIGH" },
            ]}
            inputHandler={freeProjectS1InputHandler}
          />
          <AdminSelect2
            label="area"
            name="area"
            idHtmlFor="area"
            value={freeProjectS1.area}
            options={plots?.map(({ id, area, unit }) => ({
              value: id,
              label: `${area} ${unit}`,
            }))}
            inputHandler={freeProjectS1InputHandler}
          />
          <AdminInputBox2
            label="description"
            type="textarea"
            name="description"
            idHtmlFor="description"
            value={freeProjectS1.description}
            inputHandler={freeProjectS1InputHandler}
            className="row-start-1 col-start-3 row-span-2 lg:row-start-auto lg:col-start-auto"
          />
          <AdminInputBox2
            label="construction cost"
            type="text"
            name="construction_cost"
            idHtmlFor="construction_cost"
            value={freeProjectS1.construction_cost}
            inputHandler={freeProjectS1InputHandler}
          />
          <TagsInput
            label="keywords"
            tagsArr={freeProjectS1.keywords}
            name="keywords"
            idHtmlFor="keywords"
            inputHandler={freeProjectS1InputHandler}
          />
          <div className="flex gap-4">
            <FileInput
              accept={"image/*"}
              name="image"
              typeStartsWith={"image"}
              message={"Attach an image."}
              wrongFileTypeWarning={"Please select an image to upload."}
              inputHandler={freeProjectS1InputHandler}
            />
            <FileInput
              accept={"video/*"}
              typeStartsWith={"video"}
              name="video"
              message={"Attach a video."}
              wrongFileTypeWarning={"Please select a video to upload."}
              inputHandler={freeProjectS1InputHandler}
            />
          </div>
        </div>
        <Button
          type="button"
          text="Next"
          isTransitioned={true}
          className="block ml-auto"
          onClick={addFreeProjectS1Handler}
        />
      </form>
    </>
  );
};

export default FreeProjectS1;
