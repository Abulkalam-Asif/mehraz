import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const FastHomesLink = ({ text = "", href = "", className = "" }) => {
  return (
    <>
      <Link
        href={href}
        className={`relative block w-fit text-3xl xl:text-2xl sm:text-xl xs:text-lg text-[#2f2f2f] py-4 xl:py-3 px-16 xl:px-12 uppercase rounded-md border-2 border-accent-gold-light bg-transparent before:absolute before:z[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:rounded before:bg-gradient-to-b before:from-accent-gold-lighter before:to-accent-gold-light hover:text-accent-gold-light hover:before:opacity-0 transition-colors before:transition-opacity duration-300 before:duration-300 ${className} ${poppins.className}`}>
        <span className="z-0 invisible whitespace-nowrap">{text}</span>
        <span className="whitespace-nowrap absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {text}
        </span>
      </Link>
    </>
  );
};

export default FastHomesLink;
