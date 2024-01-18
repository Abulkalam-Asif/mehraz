"use client";
import { chevronLeftIcon } from "@/assets";
import { H1, H2, Td, Th } from "@/components";
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
    inPkr: 300,
  },
  {
    name: "gbp",
    inPkr: 305,
  },
  {
    name: "gbp",
    inPkr: 305,
  },
  {
    name: "gbp",
    inPkr: 305,
  },
];
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
        <div className="max-w-8xl mx-auto w-full h-28">
          <div className="flex justify-between items-center py-6 xs:items-start">
            <Link
              href={"/admin"}
              className="bg-accent-1-base rounded-full p-5 lg:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 lg:w-4"
              />
            </Link>
            <H1 text="roles, analystics & cities" className="mx-auto" />
          </div>
        </div>
        <div className="flex flex-row h-[calc(100vh-6rem-7rem)]">
          <div className="w-full h-full grid grid-rows-3 gap-2">
            <RolesAnalyticsCitiesContainer
              title={"Roles"}
              className="row-span-2">
              <H2 text="roles" className="mb-2" />
              <Table border={false}>
                <thead className="bg-accent-1-base">
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
                <tbody>
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
            <RolesAnalyticsCitiesContainer className="row-span-1">
              <H2 text="currencies" className="mb-2" />
              <Table border={false}>
                <thead className="bg-accent-1-base">
                  <tr>
                    <Th position="beginning" className="w-1/3">
                      name
                    </Th>
                    <Th position="end" className="w-1/3">
                      in pkr
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {currencies.map((currency, i) => (
                    <tr key={i}>
                      <Td
                        position="beginning"
                        isLastRow={i === currencies.length - 1}>
                        {currency.name}
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
            </RolesAnalyticsCitiesContainer>
          </div>
          <div className="w-full">

          </div>
          <div className="w-full"></div>
        </div>
      </section>
    </>
  );
};

export default RolesAnalyticsCities;
