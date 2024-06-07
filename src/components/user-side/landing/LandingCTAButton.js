import Image from "next/image";
import Link from "next/link";

const LandingCTAButton = ({
  text,
  icon,
  tagline1,
  tagline2,
  className = "",
  href,
}) => {
  // before element used to transition the background image.
  const bgTransitionStyles =
    "relative z-[1] before:bg-accent-dark-blue before:opacity-0 before:z-[-1] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:rounded-sm hover:before:opacity-100 before:transition-opacity before:duration-300";
  return (
    <>
      <Link
        href={href}
        className={`block px-10 pb-2 xl:px-8 sm:px-4 pt-1 space-y-1 shadow-btn border-2 border-white text-white uppercase bg-no-repeat bg-center bg-cover overflow-hidden ${bgTransitionStyles} ${className}`}>
        <div className="flex items-end justify-start gap-2">
          <Image
            src={icon}
            alt="text"
            width={64}
            height={64}
            className="w-16 h-auto xl:w-12"
          />
          <span className="text-3xl xl:text-2xl">{text}</span>
        </div>
        <div className="text-xxs xs:text-xxxs flex items-center justify-start gap-4 sm:gap-2">
          <span>{tagline1}</span>
          <span className="font-bold">{tagline2}</span>
        </div>
      </Link>
    </>
  );
};

export default LandingCTAButton;
