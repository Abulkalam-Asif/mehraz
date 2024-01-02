import { bellIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminHeader = () => {
  return (
    <>
      <header className="pt-7 2xl:pt-5 lg:pb-12">
        <div className="max-w-8xl mx-auto px-8 flex items-center justify-between">
          <Link href="/admin" className="text-6xl 2xl:text-5xl lg:text-4xl">
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
