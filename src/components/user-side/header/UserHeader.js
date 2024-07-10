import { bookmarkFilledIcon, bookmarkIcon, logo2Img } from "@/assets";
import { CiChat1 } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { UserHeaderMeetBtn, UserHeaderMenu } from "@/components";
const UserHeader = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green py-4 h-18 sm:h-14 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 sm:px-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src={logo2Img}
              priority={true}
              alt="logo"
              className="h-9 w-auto md:h-8 sm:h-6 xs:h-5"
            />
          </Link>
          <div className="flex items-center gap-8 sm:gap-4">
            <Link href="/" className="group relative w-8 h-8 md:hidden">
              <Image
                src={bookmarkIcon}
                alt="bookmark"
                priority={true}
                width={28}
                height={28}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-800 opacity-100 group-hover:opacity-0"
              />
              <Image
                src={bookmarkFilledIcon}
                alt="bookmark"
                priority={true}
                width={24}
                height={24}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-800 opacity-0 group-hover:opacity-100"
              />
            </Link>
            <UserHeaderMeetBtn />
            <button className="inline-flex sm:hidden items-center gap-1 text-white border-2 border-white py-0.5 px-3 rounded hover:text-accent-dark-blue hover:bg-white transition-colors duration-300">
              <CiChat1 size={20} />
              <span className="text-sm">CHAT</span>
            </button>
            <button className="hidden sm:inline text-white">
              <CiChat1 size={20} className="h-6 w-auto" />
            </button>
            <UserHeaderMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
