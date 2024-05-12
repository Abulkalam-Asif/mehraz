"use client";
import {
  Table,
  Th,
  Td,
  ReadyProjectMultiSelect,
  Button,
  RPBudgetRangeInput,
} from "@/components";
import { useEffect } from "react";

const ReadyProjectScreen2 = ({
  readyProjectS2,
  areas,
  floors,
  readyProjectS2InputHandler,
  uploadedScreensCount,
  setReadyProjectS2,
  screen2PrevData,
  addReadyProjectS2Handler,
  updateReadyProjectS2HandlerCheck,
  familyUnits,
}) => {
  useEffect(() => {
    const combinations = [];
    areas.forEach(newArea => {
      floors.forEach(newFloor => {
        combinations.push({
          area: newArea,
          floor: newFloor,
          familyUnits:
            screen2PrevData.combinations.find(
              ({ areaId, floorId }) =>
                areaId === newArea.id && floorId === newFloor.id,
            )?.familyUnitIds || [],
        });
      });
    });
    const budgetRanges = areas.map(newArea => ({
      areaId: newArea.id,
      min:
        screen2PrevData.budgetRanges.find(({ areaId }) => areaId === newArea.id)
          ?.min || 0,
      max:
        screen2PrevData.budgetRanges.find(({ areaId }) => areaId === newArea.id)
          ?.max || 0,
    }));

    setReadyProjectS2(prevState => ({
      ...prevState,
      combinations,
      budgetRanges,
    }));
  }, [screen2PrevData]);

  const familyUnitsInputHandler = (
    areaId,
    floorId,
    familyUnitId,
    isChecked,
  ) => {
    if (isChecked) {
      readyProjectS2InputHandler(
        "combinations",
        readyProjectS2.combinations.map(combination => {
          if (
            combination.area.id === areaId &&
            combination.floor.id === floorId
          ) {
            return {
              ...combination,
              familyUnits: [...combination.familyUnits, familyUnitId],
            };
          }
          return combination;
        }),
      );
    } else {
      readyProjectS2InputHandler(
        "combinations",
        readyProjectS2.combinations.map(combination => {
          if (
            combination.area.id === areaId &&
            combination.floor.id === floorId
          ) {
            return {
              ...combination,
              familyUnits: combination.familyUnits.filter(
                unit => unit !== familyUnitId,
              ),
            };
          }
          return combination;
        }),
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
            [budgetType]: value,
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
            {readyProjectS2.combinations?.map(({ area, floor }, index) => (
              <tr key={`${area.id}_${floor.id}`}>
                <Td
                  align="center"
                  position="beginning"
                  isLastRow={index === readyProjectS2.combinations.length - 1}>
                  {`${area.area} ${area.unit}`}
                </Td>
                <Td
                  align="center"
                  isLastRow={index === readyProjectS2.combinations.length - 1}>
                  {floor.name}
                </Td>
                <Td
                  position="end"
                  isLastRow={index === readyProjectS2.combinations.length - 1}>
                  <ReadyProjectMultiSelect
                    inputHandler={familyUnitsInputHandler}
                    message="Select family units"
                    areaId={area.id}
                    floorId={floor.id}
                    selectedOptions={readyProjectS2.combinations}
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
                    <RPBudgetRangeInput
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
                    <RPBudgetRangeInput
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
              onClick={() => {
                uploadedScreensCount === 1
                  ? addReadyProjectS2Handler(false)
                  : updateReadyProjectS2HandlerCheck(false);
              }}
            />
            <Button
              type="button"
              text="finish"
              color="accent-2-outlined"
              isTransitioned={true}
              onClick={() => {
                uploadedScreensCount === 1
                  ? addReadyProjectS2Handler(true)
                  : updateReadyProjectS2HandlerCheck(true);
              }}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default ReadyProjectScreen2;
