"use client";
import {
  aboutUsIcon,
  blogIcon,
  contactUsIcon,
  goHomeIcon,
  highCustomIcon,
  materialsIcon,
  propertiesIcon,
  servicesIcon,
  teamAndApplyIcon,
} from "@/assets";
import { useEffect, useRef, useState } from "react";
import { UserHeaderMenuItem, UserHeaderSubmenuItem } from "@/components";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaChevronLeft,
} from "react-icons/fa6";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin-ext"],
});

const menuDataItems = [
  { text: "go home", href: "/", src: goHomeIcon },
  { text: "services", href: null, src: servicesIcon },
  { text: "blog", href: "/", src: blogIcon },
  { text: "contact us", href: "/", src: contactUsIcon },
  { text: "about us", href: "/", src: aboutUsIcon },
  { text: "team & apply", href: "/", src: teamAndApplyIcon },
];

const subMenuItems = {
  services: {
    title: "design & build",
    items: [
      {
        text: "fast homes",
        href: "/fast-homes",
        src: servicesIcon,
      },
      {
        text: "high custom",
        href: "/",
        src: highCustomIcon,
      },
      {
        text: "properties",
        href: "/",
        src: propertiesIcon,
      },
      {
        text: "materials",
        href: "/",
        src: materialsIcon,
      },
    ],
  },
};

const UserHeaderMenu = () => {
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowSubMenu(null);
  };

  const handleClickOutside = event => {
    if (showSubMenu != null) {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setShowSubMenu(null);
      }
    } else if (isMenuOpen) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={`relative flex items-center justify-end ${poppins.className}`}
        ref={menuRef}>
        <button onClick={toggleMenu} className="space-y-2 md:space-y-1.5">
          <div
            className={`w-10 md:w-7 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen && !showSubMenu
                ? "rotate-45 translate-x-0.5 translate-y-2.5 md:translate-y-2"
                : ""
            }`}></div>
          <div
            className={`w-10 md:w-7 h-0.5 bg-white transition-opacity duration-300 ${
              isMenuOpen && !showSubMenu ? "opacity-0" : ""
            }`}></div>
          <div
            className={`w-10 md:w-7 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen && !showSubMenu
                ? "-rotate-45 translate-x-0.5 -translate-y-2.5 md:-translate-y-2"
                : ""
            }`}></div>
        </button>
        <div
          className={`max-h-user-header-menu sm:max-h-user-header-menu-sm bg-white rounded-2xl shadow-dropdown-2 absolute z-[2] top-12 sm:top-10 grid transition-grid-rows-opacity-padding duration-300 ${
            isMenuOpen && !showSubMenu
              ? "grid-rows-[1fr] py-4 opacity-100"
              : "grid-rows-[0fr] py-0 opacity-0"
          }`}>
          <div className="overflow-hidden w-max">
            <div className="max-h-user-header-menu-inner sm:max-h-user-header-menu-inner-sm overflow-y-auto mr-1">
              <ul className={`uppercase flex flex-col`}>
                {menuDataItems.map(({ src, text, href }, index) => (
                  <UserHeaderMenuItem
                    key={index}
                    src={src}
                    text={text}
                    href={href}
                    setIsMenuOpen={setIsMenuOpen}
                    setShowSubMenu={href === null ? setShowSubMenu : null}
                  />
                ))}
              </ul>
              <div className={`flex items-center gap-4 justify-center mt-8`}>
                <Link href="/">
                  <FaXTwitter size={20} className="w-5 h-auto md:w-4" />
                </Link>
                <Link href="/">
                  <FaFacebookF size={20} className="w-5 h-auto md:w-4" />
                </Link>
                <Link href="/">
                  <FaInstagram size={20} className="w-5 h-auto md:w-4" />
                </Link>
              </div>
              <div className={`uppercase text-xs font-light text-center my-4`}>
                <p>copyrights &copy; mehraz 2023</p>
                <p>
                  <span>all rights reserved</span>
                  <Link href="/" className="ml-2 underline">
                    policy
                  </Link>
                  <Link href="/" className="ml-2 underline">
                    terms
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={subMenuRef}
          className={`max-h-user-header-menu sm:max-h-user-header-menu-sm bg-white rounded-2xl shadow-dropdown-2 absolute z-[2] top-12 sm:top-10 grid transition-grid-rows-opacity-padding duration-300 ${
            showSubMenu
              ? "grid-rows-[1fr] py-4 opacity-100"
              : "grid-rows-[0fr] py-0 opacity-0"
          }`}>
          <div className="overflow-hidden w-max">
            <div className="max-h-user-header-menu-inner sm:max-h-user-header-menu-inner-sm overflow-y-auto mr-1">
              {showSubMenu && (
                <>
                  <div className="my-2 flex items-end">
                    <button
                      className="opacity-60 p-2 m-1"
                      onClick={() => {
                        setShowSubMenu(null);
                        setIsMenuOpen(true);
                      }}>
                      <FaChevronLeft size={28} />
                    </button>
                    <h3 className="uppercase opacity-60 text-lg md:text-base text-center w-full pr-9">
                      {subMenuItems[showSubMenu]?.title}
                    </h3>
                  </div>
                  <ul className={`uppercase flex flex-col`}>
                    {subMenuItems[showSubMenu]?.items.map(
                      ({ src, text, href }, index) => (
                        <UserHeaderSubmenuItem
                          key={index}
                          src={src}
                          text={text}
                          href={href}
                        />
                      ),
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeaderMenu;
