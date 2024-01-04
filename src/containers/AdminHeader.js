import { bellIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminHeader = () => {
  return (
    <>
      <header className="pt-7 sticky top-0 left-0 right-0 bg-white z-10 2xl:pt-5">
        <div className="max-w-8xl mx-auto px-10 flex items-center justify-between xs:px-5">
          <Link href="/admin" className="text-6xl uppercase 2xl:text-5xl lg:text-4xl">
            Mehraz
          </Link>
          <button>
            <Image src={bellIcon} alt="bell" className="w-10 2xl:w-8 lg:w-7" />
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
