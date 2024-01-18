import { bellIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminHeader = () => {
  return (
    <>
      <header className="bg-white pt-5 h-20 lg:h-16">
        <div className="max-w-6.5xl mx-auto px-8 flex items-center justify-between xs:px-5">
          <Link href="/admin" className="uppercase text-5xl lg:text-4xl">
            Mehraz
          </Link>
          <button className="p-2">
            <Image src={bellIcon} alt="bell" className="w-8 lg:w-7" />
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
