import { barsIcon, logo2Img } from "@/assets";
import { CiChat1 } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { UserHeaderMeetBtn } from "@/components";
const UserHeader = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green py-4 h-18">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src={logo2Img}
              priority={true}
              alt="logo"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-8">
            <UserHeaderMeetBtn />
            <button className="inline-flex items-center gap-1 text-white border-2 border-white py-0.5 px-3 rounded hover:text-accent-dark-blue hover:bg-white transition-colors duration-300">
              <CiChat1 size={20} />
              <span className="text-sm">CHAT</span>
            </button>
            <button>
              <Image src={barsIcon} alt="menu" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
