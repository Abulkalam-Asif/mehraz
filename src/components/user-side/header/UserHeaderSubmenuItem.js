import Image from "next/image";
import Link from "next/link";

const UserHeaderSubmenuItem = ({ text, href, src }) => {
  return (
    <>
      <li className="m-1 relative">
        <Link
          href={href}
          className="flex items-center gap-6 border-b-2 border-accent-1-extra-light py-5 px-12">
          <Image src={src} alt={text} className="h-8 w-auto" />
          <span className="opacity-90 text-xl">{text}</span>
        </Link>
      </li>
    </>
  );
};

export default UserHeaderSubmenuItem;
