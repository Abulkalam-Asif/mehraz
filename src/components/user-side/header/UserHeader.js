import { bookmarkFilledIcon, bookmarkIcon, logo2Img } from "@/assets";
import { CiChat1 } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { UserHeaderMeetBtn, UserHeaderMenu } from "@/components";
const UserHeader = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green py-4 h-18 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src={logo2Img}
              priority={true}
              alt="logo"
              className="h-9 w-auto"
            />
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="group relative w-8 h-8">
              <Image
                src={bookmarkIcon}
                alt="bookmark"
                width={28}
                height={28}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-800 opacity-100 group-hover:opacity-0"
              />
              <Image
                src={bookmarkFilledIcon}
                alt="bookmark"
                width={24}
                height={24}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-800 opacity-0 group-hover:opacity-100"
              />
            </Link>
            <UserHeaderMeetBtn />
            <button className="inline-flex items-center gap-1 text-white border-2 border-white py-0.5 px-3 rounded hover:text-accent-dark-blue hover:bg-white transition-colors duration-300">
              <CiChat1 size={20} />
              <span className="text-sm">CHAT</span>
            </button>
            <UserHeaderMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
