import Image from "next/image";
import Link from "next/link";

const UserHeaderSubmenuItem = ({ text, href, src }) => {
  return (
    <>
      <li className="m-0.5">
        <Link
          href={href}
          className="flex items-center gap-6 border-b-2 border-accent-1-extra-light py-5 px-12">
          <Image src={src} alt={text} className="h-8 w-auto md:h-6" />
          <span className="opacity-90 text-xl md:text-base">{text}</span>
        </Link>
      </li>
    </>
  );
};

export default UserHeaderSubmenuItem;
