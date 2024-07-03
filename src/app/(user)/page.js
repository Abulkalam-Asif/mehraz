import getBannerImage from "@/Firebase/user-side/getBannerImage";
import { LandingBuyButton, LandingCTAButton, ULinkButton } from "@/components";
import localFont from "next/font/local";
import {
  buyMaterialDarkIcon,
  buyMaterialLightIcon,
  buyPropertyDarkIcon,
  buyPropertyLightIcon,
  defaultLandingImage,
  fastHomesIcon,
  highCustomLightIcon,
} from "@/assets";
import Image from "next/image";
import Link from "next/link";

const isocpeur = localFont({
  src: [
    {
      path: "../fonts/isocpeur/isocpeurRegular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  display: "swap",
});

export const metadata = {
  title: "Mehraz | Home",
  description: "Mehraz - Building the new Pakistan",
  openGraph: {
    title: "Mehraz | Home",
    description: "Mehraz - Building the new Pakistan",
    url: "localhost:3000/",
  },
};

export default async function Home() {
  const landingImage = await getBannerImage("landing-image.png");

  return (
    <div className="relative min-h-full w-full max-w-7xl mx-auto p-8 sm:px-4 lg:pt-14 lg:pb-16 grid grid-cols-2 lg:grid-cols-1 lg:max-w-xl">
      <Link
        href="/"
        className="hidden lg:block absolute top-4 right-4 text-[#2F2F2F] uppercase">
        already a client?
      </Link>
      <div className="uppercase pr-[10%] xl:pr-[5%] lg:pr-0">
        <h3 className="text-2xl xl:text-xl lg:text-lg sm:text-sm text-[#6C6C6C]">
          EXPLORE . MEET YOUR NEEDS . LIVE BETTER
        </h3>
        <div className="relative mt-4">
          <div className="animate-landing-slide-1">
            <h1 className="text-accent-dark-blue text-7xl xl:text-6xl lg:text-5xl sm:text-3xl mb-2 leading-tighter">
              Building the
              <br />
              <b>new pakistan</b>
            </h1>
            <h2 className="w-fit bg-accent-gold text-white text-3.5xl xl:text-3xl lg:text-2xl sm:text-xl px-8 xl:px-6 lg:px-4 sm:px-2 py-0.5">
              <b>save</b> time . effort . money
            </h2>
          </div>
          <div className="absolute top-0 left-0 animate-landing-slide-2 opacity-0">
            <h1 className="text-accent-dark-blue text-7xl xl:text-6xl lg:text-5xl sm:text-3xl mb-2 leading-tighter">
              <b>emerging rise</b>
              <br /> for people
            </h1>
            <h2 className="w-fit bg-accent-green text-white text-3.5xl xl:text-3xl lg:text-2xl sm:text-xl px-8 xl:px-6 lg:px-4 sm:px-2 py-0.5">
              <b>live healthy</b> live longer
            </h2>
          </div>
          <div className="absolute top-0 left-0 animate-landing-slide-3 opacity-0">
            <h1 className="text-accent-dark-blue text-7xl xl:text-6xl lg:text-5xl sm:text-3xl mb-2 leading-tighter">
              <b>united</b> we&apos;ll
              <br /> <b>grow</b>
            </h1>
            <h2 className="w-fit bg-accent-gold text-white text-3.5xl xl:text-3xl lg:text-2xl sm:text-xl px-8 xl:px-6 lg:px-4 sm:px-2 py-0.5">
              <b>economic</b> now & forever
            </h2>
          </div>
        </div>
        <h4
          className={`text-[#686868] text-lg xl:text-base lg:text-sm sm:text-xs tracking-ultra-wide sm:tracking-widest mt-2 ${isocpeur.className}`}>
          LAND . DESIGN . MATERIALS . CONSTRUCTION
        </h4>
        <h5 className="max-w-md text-xs xl:text-xxs text-[#2F2F2F] border-t border-b border-[#2F2F2F] py-1 mt-3">
          for all land authorities DHA, LDA, FDA, CDA, KDA & more
        </h5>
        <ULinkButton
          href="/"
          text="why mehraz?"
          color="gold-gold"
          className="py-1 px-8 mt-6 text-1.5xl xl:text-xl sm:text-base sm:px-5 text-accent-gray"
        />
        <div className="mt-12 lg:hidden">
          <Image
            src={landingImage || defaultLandingImage}
            priority={true}
            alt="Landing Image"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Link
          href="/"
          className="text-2xl xl:text-xl text-[#2F2F2F] uppercase transition-transform duration-300 hover:translate-x-1 lg:hidden">
          already a client?
        </Link>
        <div className="flex flex-col gap-6 xl:gap-4 items-start px-1 pt-4 xl:pt-3 pb-14 xl:pb-10 border-2 border-accent-1-base shadow-btn mt-8 rounded-2xl relative lg:w-full">
          <Link
            href="/"
            className="text-2xl xl:text-xl lg:text-lg sm:text-sm text-[#2F2F2F] uppercase self-center transition-transform duration-300 hover:translate-x-1">
            design & build <b>dreams</b>
          </Link>
          <LandingCTAButton
            text={
              <>
                <b>fast</b> homes
              </>
            }
            href={"/fast-homes"}
            icon={fastHomesIcon}
            className="w-[103%] bg-landing-cta-1 rounded-l-lg rounded-r-[4rem] sm:w-[101%]"
            tagline1={"explore all types of homes"}
            tagline2={"10x+ cheaper than custom"}
          />
          <LandingCTAButton
            text={
              <>
                high <b>custom</b>
              </>
            }
            href={"/"}
            icon={highCustomLightIcon}
            className="w-full bg-landing-cta-2 rounded-lg"
            tagline1={"all types of projects"}
            tagline2={"most customized servicr"}
          />
          <p className="bg-accent-dark-blue absolute bottom-0 left-0 right-0 text-center text-white font-bold uppercase rounded-b-2xl text-xs py-0.5">
            <span className="text-accent-gold-light">90 % OFF</span> launch
            month
          </p>
        </div>
        <div className="bg-accent-gold-light h-2 w-4/5 mt-8 lg:mr-auto"></div>
        <div className="w-full flex gap-4 items-center justify-end mt-8 xs:gap-0.5">
          <LandingBuyButton
            text={
              <>
                buy <b>property</b>
              </>
            }
            href={"/"}
            darkIcon={buyPropertyDarkIcon}
            lightIcon={buyPropertyLightIcon}
            tagline={"BUY only land, BUILDING OR APARTMENT?"}
            taglineMobile={"land . building . apartment"}
          />
          <LandingBuyButton
            text={
              <>
                buy <b>materials</b>
              </>
            }
            href={"/"}
            darkIcon={buyMaterialDarkIcon}
            lightIcon={buyMaterialLightIcon}
            tagline={"GREY STRUCTURE . FINISHING . LANDSCAPING"}
            taglineMobile={"GREY . FINISH . LANDSCAPE"}
          />
        </div>
      </div>
    </div>
  );
}
