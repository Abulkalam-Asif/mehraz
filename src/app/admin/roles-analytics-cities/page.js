"use client";
import { chevronLeftIcon, linkIcon } from "@/assets";
import { Button, H1, H2, Td, Th } from "@/components";
import { RolesAnalyticsCitiesContainer, Table } from "@/containers";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const users = {
  admins: [
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
    "ali",
    "bilal",
    "bilal",
    "ahmad",
  ],
  architects: ["abulkalam", "jafar"],
  receptionists: ["hamza"],
};

const currencies = [
  {
    name: "usd",
    cities: ["karachi", "lahore", "islamabad", "peshawar"],
    inPkr: 300,
  },
  {
    name: "gbp",
    cities: ["lahore"],
    inPkr: 305,
  },
  {
    name: "gbp",
    cities: ["lahore"],
    inPkr: 305,
  },
  {
    name: "gbp",
    cities: ["lahore"],
    inPkr: 305,
  },
];

const officeLocations = [
  {
    city: "karachi",
    address: "abc",
    mapsLink: "https://www.google.com/maps",
    image: "https://picsum.photos/200/300",
  },
  {
    city: "lahore",
    address: "abc",
    mapsLink: "https://www.google.com/maps",
    image: "https://picsum.photos/200/300",
  },
  {
    city: "islamabad",
    address: "abc",
    mapsLink: "https://www.google.com/maps",
    image: "https://picsum.photos/200/300",
  },
];

const plots = [
  {
    area: 10,
    unit: "sq. feet",
  },
  {
    area: 5,
    unit: "marla",
  },
  {
    area: 1,
    unit: "kanal",
  },
];

const styles = [
  {
    name: "modern",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "classic",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "spanish",
    image: "https://picsum.photos/200/300",
  },
];

const cities = ["karachi", "lahore", "islamabad", "peshawar", "quetta"];
const RolesAnalyticsCities = () => {
  const [usersRows, setUsersRows] = useState(null);

  useEffect(() => {
    const maxLength = Math.max(
      ...Object.values(users).map((user) => user.length)
    );
    const rows = [];
    for (let i = 0; i < maxLength; i++) {
      rows.push([]);
    }
    for (const [key, value] of Object.entries(users)) {
      for (let i = 0; i < maxLength; i++) {
        rows[i].push(value[i] || "");
      }
    }
    setUsersRows(rows);
  }, []);

  return (
    <>
      <section className="px-8 flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)]">
        <div className="max-w-8xl mx-auto w-full flex items-center h-24 xl:h-20">
          <div className="w-full flex justify-between items-center xs:items-start">
            <Link
              href={"/admin"}
              className="bg-accent-1-base rounded-full p-5 xl:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 xl:w-4"
              />
            </Link>
            <H1
              text="roles, analystics & cities"
              className="mx-auto xl:text-2xl"
            />
          </div>
        </div>
        <div className="flex flex-row gap-x-4 h-[calc(100vh-6rem-6rem)] xl:h-[calc(100vh-6rem-5rem)]">
          <div className="w-full h-full grid grid-rows-3 gap-2">
            <RolesAnalyticsCitiesContainer
              title={"Roles"}
              className="row-span-2 flex flex-col">
              <H2 text="roles" className="mb-2" />
              <Table border={false} className="h-full overflow-y-auto">
                <thead className="bg-accent-1-base xl:text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/3">
                      admin
                    </Th>
                    <Th className="w-1/3">architect</Th>
                    <Th position="end" className="w-1/3">
                      receptionist
                    </Th>
                  </tr>
                </thead>
                <tbody className="xl:text-xs xl:font-semibold">
                  {usersRows?.map((row, i) => (
                    <tr key={i}>
                      {row.map((user, j) => (
                        <Td
                          key={j}
                          position={
                            j === 0
                              ? "beginning"
                              : j === row.length - 1
                              ? "end"
                              : "middle"
                          }
                          isLastRow={i === usersRows?.length - 1}>
                          {user}
                        </Td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </RolesAnalyticsCitiesContainer>
            <RolesAnalyticsCitiesContainer className="row-span-1 flex flex-col gap-y-2">
              <H2 text="currencies" />
              <Table border={false} className="h-full overflow-y-auto">
                <thead className="bg-accent-1-base xl:text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/4 xl:w-1/3">
                      name
                    </Th>
                    <Th className="w-1/2 xl:w-1/3">cities</Th>
                    <Th position="end" className="w-1/4 xl:w-1/3">
                      in pkr
                    </Th>
                  </tr>
                </thead>
                <tbody className="xl:text-xs xl:font-semibold">
                  {currencies.map((currency, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === currencies.length - 1}>
                        {currency.name}
                      </Td>
                      <Td
                        isLastRow={i === currencies.length - 1}
                        className="flex gap-x-2 flex-wrap">
                        {currency.cities.map((city, i) => (
                          <span key={i}>{city}</span>
                        ))}
                      </Td>
                      <Td
                        position="end"
                        isLastRow={i === currencies.length - 1}>
                        {currency.inPkr}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button text="add currency" className="text-xs mr-auto" />
            </RolesAnalyticsCitiesContainer>
          </div>
          <RolesAnalyticsCitiesContainer className="w-full grid grid-rows-4">
            <div className="flex flex-col gap-y-2">
              <H2 text="cities" />
              <Table
                border={false}
                className="h-full overflow-y-auto px-3 py-2">
                <tbody className="text-sm">
                  {cities.map((city, i) => (
                    <tr key={i}>
                      <td
                        className={`border-accent-1-dark ${
                          i === cities.length - 1 ? "" : "border-b-2"
                        }`}>
                        {city}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button text="add currency" className="text-xs mr-auto" />
            </div>
            <div className="flex flex-col gap-y-2">
              <H2 text="office locations" />
              <Table
                border={false}
                className="h-full overflow-y-auto px-3 py-2">
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/4">
                      city
                    </Th>
                    <Th className="w-1/4">address</Th>
                    <Th className="w-1/4">link</Th>
                    <Th position="end" className="w-1/4">
                      image
                    </Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {officeLocations.map((location, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === officeLocations.length - 1}>
                        {location.city}
                      </Td>
                      <Td isLastRow={i === officeLocations.length - 1}>
                        {location.address}
                      </Td>
                      <Td isLastRow={i === officeLocations.length - 1}>
                        <a
                          target="_blank"
                          href={location.mapsLink}
                          className="underline flex items-center gap-2">
                          <span>link to maps</span>
                          <Image src={linkIcon} alt="link" />
                        </a>
                      </Td>
                      <Td
                        position="end"
                        isLastRow={i === officeLocations.length - 1}>
                        <a
                          target="_blank"
                          href={location.image}
                          className="underline flex items-center gap-2">
                          <span>image</span>
                          <Image src={linkIcon} alt="link" />
                        </a>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button text="add office" className="text-xs mr-auto" />
            </div>
            <div className="flex flex-col gap-y-2">
              <H2 text="plots" />
              <Table
                border={false}
                className="h-full overflow-y-auto px-3 py-2">
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/2">
                      area
                    </Th>
                    <Th position="end" className="w-1/2">
                      unit
                    </Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {plots.map((plot, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === plots.length - 1}>
                        {plot.area}
                      </Td>
                      <Td position="end" isLastRow={i === plots.length - 1}>
                        {plot.unit}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button text="add plot" className="text-xs mr-auto" />
            </div>
            <div className="flex flex-col gap-y-2">
              <H2 text="styles" />
              <Table
                border={false}
                className="h-full overflow-y-auto px-3 py-2">
                <thead className="text-sm">
                  <tr>
                    <Th position="beginning" className="w-1/2">
                      name
                    </Th>
                    <Th position="end" className="w-1/2">
                      image
                    </Th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {styles.map((style, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === styles.length - 1}>
                        {style.name}
                      </Td>
                      <Td position="end" isLastRow={i === styles.length - 1}>
                        <a
                          target="_blank"
                          href={style.image}
                          className="underline flex items-center gap-2">
                          <span>image</span>
                          <Image src={linkIcon} alt="link" />
                        </a>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button text="add style" className="text-xs mr-auto" />
            </div>
          </RolesAnalyticsCitiesContainer>
          <RolesAnalyticsCitiesContainer className="w-full">
            user behaivour and product analytics
          </RolesAnalyticsCitiesContainer>
        </div>
      </section>
    </>
  );
};

export default RolesAnalyticsCities;
