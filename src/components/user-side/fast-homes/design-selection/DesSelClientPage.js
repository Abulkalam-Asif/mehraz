"use client";

import { useSearchParams } from "next/navigation";
import { DesSelIntroSec } from "@/components";

const DesSelClientPage = () => {
  const searchParams = useSearchParams();
  return (
    <>
      <DesSelIntroSec />
    </>
  );
};
export default DesSelClientPage;
