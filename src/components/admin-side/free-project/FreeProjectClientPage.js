"use client";
import { useState } from "react";
import { Button, FreeProjectInputBox, Select, TagsInput } from "../../";

const FreeProjectClientPage = ({ cities, plots }) => {
  const [freeProject, setFreeProject] = useState({
    title: "",
    city: cities[0]?.id,
    area: plots[0]?.id,
    budget: "medium",
    description: "",
    construction_cost: "",
    keywords: [],
    image: null,
    video: null,
    isComplete: false,
  });

  const freeProjectInputHandler = (e, name = null, value = null) => {
    setFreeProject({
      ...freeProject,
      [name || e.target.name]: value || e.target.value,
    });
  };

  return (
    <>
      {/* for >1024 width, calc(100vh - (AdminHeader height + 1rem) - page header height) */}
      <div className="max-w-8xl w-full mx-auto flex flex-row gap-x-4 max-h-[calc(100vh-6rem-6rem)] xl:max-h-[calc(100vh-6rem-5rem)]">
        <form className="w-full max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-3 gap-6">
            <FreeProjectInputBox
              label="title"
              type="text"
              name="title"
              idHtmlFor="title"
              value={freeProject.title}
              inputHandler={freeProjectInputHandler}
            />
            <Select
              label="city"
              name="city"
              idHtmlFor="city"
              value={freeProject.city}
              options={cities?.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
              inputHandler={freeProjectInputHandler}
            />
            <Select
              label="budget"
              name="budget"
              idHtmlFor="budget"
              value={freeProject.budget}
              options={[
                { value: "LOW", label: "LOW" },
                { value: "MEDIUM", label: "MEDIUM" },
                { value: "HIGH", label: "HIGH" },
              ]}
              inputHandler={freeProjectInputHandler}
            />
            <Select
              label="area"
              name="area"
              idHtmlFor="area"
              value={freeProject.area}
              options={plots?.map(({ id, area, unit }) => ({
                value: id,
                label: `${area} ${unit}`,
              }))}
              inputHandler={freeProjectInputHandler}
            />
            <FreeProjectInputBox
              label="description"
              type="textarea"
              name="description"
              idHtmlFor="description"
              value={freeProject.description}
              inputHandler={freeProjectInputHandler}
              className="row-start-1 col-start-3 row-span-2"
            />
            <FreeProjectInputBox
              label="construction cost"
              type="text"
              name="construction_cost"
              idHtmlFor="construction_cost"
              value={freeProject.construction_cost}
              inputHandler={freeProjectInputHandler}
            />
            <TagsInput
              label="keywords"
              tagsArr={freeProject.keywords}
              name="keywords"
              idHtmlFor="keywords"
              inputHandler={freeProjectInputHandler}
            />
          </div>
          <Button text="Next" isTransitioned={true} className="block ml-auto" />
        </form>
      </div>
    </>
  );
};

export default FreeProjectClientPage;
