import { bellIcon, logo1Img } from "@/assets";
import Image from "next/image";
import Link from "next/link";
const AdminHeader = () => {
  return (
    <>
      <header className="bg-white pt-5 h-20 lg:h-16">
        <div className="max-w-6.5xl mx-auto px-8 flex items-center justify-between xs:px-5">
          <Link href="/admin">
            <Image
              src={logo1Img}
              priority={true}
              alt="logo"
              className="h-10 xl:h-8 w-auto lg:h-6"
            />
          </Link>
          <button className="p-2">
            <Image
              src={bellIcon}
              alt="bell"
              className="w-8 lg:w-7"
              priority={true}
            />
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
