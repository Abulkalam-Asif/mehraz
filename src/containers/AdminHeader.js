import { bellIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminHeader = () => {
  return (
    <>
      <header className="p-8">
        <div className="max-w-8xl mx-auto px-10 flex items-center justify-between">
          <Link href="/admin" className="text-6xl">
            Mehraz
          </Link>
          <button>
            <Image src={bellIcon} alt="bell" />
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
