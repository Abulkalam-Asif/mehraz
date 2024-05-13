"use client";
import { useContext, useEffect, useState } from "react";
import {
  TagsInput,
  FileInput,
  AdminInputBox2,
  AdminSelect2,
  AdminMultiSelect,
  ReadyProjectRatesInput,
  Button,
} from "@/components";
import { AlertContext } from "@/context/AlertContext";

const ReadyProjectS1 = ({
  readyProjectS1,
  readyProjectS1InputHandler = () => {},
  addReadyProjectS1Handler = () => {},
  updateReadyProjectS1HandlerCheck = () => {},
  uploadedScreensCount,
  cities,
  plots,
  floors,
  units,
  styles,
  isErrorOccurredWhileFetching,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [citiesOptions, setCitiesOptions] = useState(cities);

  useEffect(() => {
    const isScreen1DataAvailable = [cities, plots, floors, units, styles].every(
      data => data?.length > 0,
    );
    if (isErrorOccurredWhileFetching) {
      showAlert({
        type: "ERROR",
        message:
          "An error occurred while fetching data. Please check your internet connection and try again.",
      });
    } else if (!isScreen1DataAvailable) {
      showAlert({
        type: "ERROR",
        message: "Please upload the missing data first.",
      });
    } else if (!citiesOptions.some(city => city.id === "GENERAL")) {
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
        <div className="w-full grid grid-cols-3 gap-4 lg:grid-cols-2 sm:grid-cols-1">
          <AdminInputBox2
            label="title"
            type="text"
            name="title"
            idHtmlFor="title"
            value={readyProjectS1.title}
            inputHandler={readyProjectS1InputHandler}
            required={true}
            maxLength={100}
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
            required={true}
          />
          {cities?.length > 0 ? (
            <AdminMultiSelect
              title="cities"
              name="cities"
              options={citiesOptions}
              selectedOptions={readyProjectS1.cities}
              inputHandler={readyProjectS1InputHandler}
              message="Select cities"
              required={true}
              generalOption={"GENERAL"}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-red-500">No cities found </p>
            </div>
          )}
          {plots?.length > 0 ? (
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
              required={true}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-red-500">No areas found </p>
            </div>
          )}
          <AdminInputBox2
            label="description"
            type="textarea"
            name="description"
            idHtmlFor="description"
            value={readyProjectS1.description}
            inputHandler={readyProjectS1InputHandler}
            className="row-start-1 col-start-3 row-span-2 lg:row-start-auto lg:col-start-auto"
            required={true}
            maxLength={250}
          />
          {floors?.length > 0 ? (
            <AdminMultiSelect
              title="floors"
              name="floors"
              options={floors.map(({ id, name }) => ({
                value: id,
                label: (
                  <>
                    {name.split(",").map((floor, index) => (
                      <span key={index} className="block">
                        {floor.trim()}
                      </span>
                    ))}
                  </>
                ),
              }))}
              selectedOptions={readyProjectS1.floors}
              inputHandler={readyProjectS1InputHandler}
              message="Select floors"
              required={true}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-red-500">No floors found </p>
            </div>
          )}
          {units?.length > 0 ? (
            <AdminMultiSelect
              title="other units"
              name="units"
              options={units?.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
              selectedOptions={readyProjectS1.units}
              inputHandler={readyProjectS1InputHandler}
              message="Select other units"
              required={true}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-red-500">No units found </p>
            </div>
          )}
          {styles?.length > 0 ? (
            <AdminSelect2
              label="style"
              idHtmlFor="style"
              name="style"
              value={readyProjectS1.style}
              inputHandler={readyProjectS1InputHandler}
              options={styles.map(({ id, name, budget }) => ({
                value: id,
                label: `${name} (${budget})`,
              }))}
              required={true}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-red-500">No styles found </p>
            </div>
          )}
          <ReadyProjectRatesInput
            label={"construction rate"}
            rates={readyProjectS1.constructionRates}
            inputHandler={readyProjectS1InputHandler}
            required={true}
            maxLength={15}
            name={"constructionRates"}
          />
          <ReadyProjectRatesInput
            label={"product rate"}
            rates={readyProjectS1.productRates}
            inputHandler={readyProjectS1InputHandler}
            name={"productRates"}
            required={true}
            maxLength={15}
          />
          <div className="flex flex-col gap-2">
            <FileInput
              accept={"image/*"}
              name="image"
              typeStartsWith={"image"}
              message={"Attach an image. (required)"}
              wrongFileTypeWarning={"Please select an image to upload."}
              inputHandler={readyProjectS1InputHandler}
              idHtmlFor={"image"}
              file={readyProjectS1.image}
              classNameOuter="w-full"
              showPreview={true}
            />
            <FileInput
              accept={"video/*"}
              typeStartsWith={"video"}
              name="video"
              file={readyProjectS1.video}
              message={"Attach a video. (required)"}
              wrongFileTypeWarning={"Please select a video to upload."}
              inputHandler={readyProjectS1InputHandler}
              idHtmlFor={"video"}
              classNameOuter="w-full"
              showPreview={true}
            />
          </div>
          <TagsInput
            label="keywords"
            tagsArr={readyProjectS1.keywords}
            name="keywords"
            idHtmlFor="keywords"
            inputHandler={readyProjectS1InputHandler}
            required={true}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            text="Next step"
            isTransitioned={true}
            onClick={() => {
              uploadedScreensCount === 0
                ? addReadyProjectS1Handler(false)
                : updateReadyProjectS1HandlerCheck(false);
            }}
          />
          <Button
            type="button"
            text="finish"
            color="accent-2-outlined"
            isTransitioned={true}
            onClick={() => {
              uploadedScreensCount === 0
                ? addReadyProjectS1Handler(true)
                : updateReadyProjectS1HandlerCheck(true);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default ReadyProjectS1;
