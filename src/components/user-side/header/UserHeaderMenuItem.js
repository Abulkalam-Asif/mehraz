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
      <li className="m-1 relative">
        {href ? (
          <Link
            href={href}
            className="flex items-center gap-8 border-b-2 border-accent-1-extra-light py-4 px-12">
            <Image src={src} alt={text} height={24} className="h-8 w-auto" />
            <span className="opacity-90 text-xl">{text}</span>
          </Link>
        ) : (
          <button
            onClick={() => {
              setShowSubMenu(text);
              setIsMenuOpen(false);
            }}
            className="uppercase w-full flex items-center gap-8 border-b-2 border-accent-1-extra-light py-4 px-12">
            <Image src={src} alt={text} className="h-8 w-auto" />
            <span className="opacity-90 text-xl">{text}</span>
          </button>
        )}
      </li>
    </>
  );
};

export default UserHeaderMenuItem;
