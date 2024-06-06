"use client";
import Image from "next/image";
import Link from "next/link";

const UserHeaderMenuItem = ({
  src,
  text,
  href,
  setIsMenuOpen,
  setShowSubMenu = null,
}) => {
  return (
    <>
      <li className="m-0.5">
        {href ? (
          <Link
            href={href}
            className="flex items-center gap-8 border-b-2 border-accent-1-extra-light py-4 px-12">
            <Image
              src={src}
              alt={text}
              height={24}
              className="h-8 w-auto md:h-6"
            />
            <span className="opacity-90 text-xl md:text-base">{text}</span>
          </Link>
        ) : (
          <button
            onClick={() => {
              setShowSubMenu(text);
              setIsMenuOpen(false);
            }}
            className="uppercase w-full flex items-center gap-8 border-b-2 border-accent-1-extra-light py-4 px-12">
            <Image src={src} alt={text} className="h-8 w-auto md:h-6" />
            <span className="opacity-90 text-xl md:text-base">{text}</span>
          </button>
        )}
      </li>
    </>
  );
};

export default UserHeaderMenuItem;
