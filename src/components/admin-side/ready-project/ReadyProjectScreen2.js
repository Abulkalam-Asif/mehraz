"use client";
import {
  Table,
  Th,
  Td,
  ReadyProjectMultiSelect,
  Button,
  ReadyProjectInputBox,
} from "@/components";
import { useEffect, useState } from "react";

const ReadyProjectScreen2 = ({
  readyProjectS2,
  areas,
  floors,
  readyProjectS2InputHandler,
  uploadedScreensCount,
  addReadyProjectS2Handler,
  updateReadyProjectS2Handler,
  familyUnits,
}) => {
  const [initialCombinations, setInitialCombinations] = useState([]);
  useEffect(() => {
    const combinations = [];
    areas.forEach(area => {
      floors.forEach(floor => {
        combinations.push({ area, floor });
      });
    });
    setInitialCombinations(combinations);
  }, [areas, floors]);

  const familyUnitsInputHandler = (
    areaId,
    floorId,
    familyUnitId,
    isChecked,
  ) => {
    if (isChecked) {
      readyProjectS2InputHandler("designs", [
        {
          areaId,
          floorId,
          familyUnitId,
        },
        ...readyProjectS2.designs,
      ]);
    } else {
      readyProjectS2InputHandler(
        "designs",
        readyProjectS2.designs.filter(
          design =>
            design.areaId !== areaId ||
            design.floorId !== floorId ||
            design.familyUnitId !== familyUnitId,
        ),
      );
    }
  };

  const budgetRangesInputHandler = (areaId, budgetType, value) => {
    readyProjectS2InputHandler(
      "budgetRanges",
      readyProjectS2.budgetRanges.map(range => {
        if (range.areaId === areaId) {
          return {
            ...range,
            [budgetType]: Number(value),
          };
        }
        return range;
      }),
    );
  };

  return (
    <>
      <form
        className="w-full max-w-7xl mx-auto py-4 pr-2 flex gap-4 lg:flex-col"
        onSubmit={e => e.preventDefault()}>
        <Table className="self-start w-2/3 lg:w-full">
          <thead>
            <tr>
              <Th position="beginning">areas</Th>
              <Th>floors</Th>
              <Th position="end">family units</Th>
            </tr>
          </thead>
          <tbody>
            {initialCombinations.map(({ area, floor }, index) => (
              <tr key={`${area.id}_${floor.id}`}>
                <Td
                  align="center"
                  position="beginning"
                  isLastRow={index === initialCombinations.length - 1}>
                  {`${area.area} ${area.unit}`}
                </Td>
                <Td
                  align="center"
                  isLastRow={index === initialCombinations.length - 1}>
                  {floor.name}
                </Td>
                <Td
                  position="end"
                  isLastRow={index === initialCombinations.length - 1}>
                  <ReadyProjectMultiSelect
                    inputHandler={familyUnitsInputHandler}
                    message="Select family units"
                    areaId={area.id}
                    floorId={floor.id}
                    selectedOptions={readyProjectS2.designs}
                    options={familyUnits.map(familyUnit => ({
                      value: familyUnit.id,
                      label: familyUnit.name,
                    }))}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="space-y-8 w-1/3 lg:w-full">
          <Table>
            <thead>
              <tr>
                <Th position="beginning">Areas</Th>
                <Th>Min budget</Th>
                <Th position="end">Max budget</Th>
              </tr>
            </thead>
            <tbody>
              {areas.map(({ id, area, unit }, index) => (
                <tr key={id}>
                  <Td
                    align="center"
                    position="beginning"
                    isLastRow={
                      index === areas.length - 1
                    }>{`${area} ${unit}`}</Td>
                  <Td isLastRow={index === areas.length - 1}>
                    <ReadyProjectInputBox
                      areaId={id}
                      budgetType="min"
                      min={0}
                      max={9999999}
                      inputHandler={budgetRangesInputHandler}
                      value={
                        readyProjectS2.budgetRanges.find(
                          range => range.areaId === id,
                        )?.min
                      }
                    />
                  </Td>
                  <Td position="end" isLastRow={index === areas.length - 1}>
                    <ReadyProjectInputBox
                      areaId={id}
                      budgetType="max"
                      min={0}
                      max={9999999}
                      value={
                        readyProjectS2.budgetRanges.find(
                          range => range.areaId === id,
                        )?.max
                      }
                      inputHandler={budgetRangesInputHandler}
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              text="Next step"
              isTransitioned={true}
              onClick={
                uploadedScreensCount === 1
                  ? addReadyProjectS2Handler
                  : updateReadyProjectS2Handler
              }
            />
            <Button
              type="button"
              text="skip and finish"
              color="accent-2-outlined"
              isTransitioned={true}
              onClick={addReadyProjectS2Handler}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default ReadyProjectScreen2;
