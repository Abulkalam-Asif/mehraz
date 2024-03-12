import { minusIcon, plusIcon } from "@/assets";
import Image from "next/image";

const RACButtonMobile = ({
  text,
  name,
  expandedSection,
  setExpandedSection,
}) => {
  const isExpanded = expandedSection === name;
  return (
    <button
      type="button"
      onClick={() => setExpandedSection(isExpanded ? null : name)}
      className={`${
        isExpanded ? "bg-white" : "bg-accent-2-base"
      } flex items-center justify-center gap-2 border-2 border-accent-2-base px-4 py-1 whitespace-nowrap rounded-lg w-full max-w-[23%] md:max-w-[31%] sm:md:max-w-[48%]`}>
      <span
        className={`${
          isExpanded ? "text-black" : "text-white"
        } text font-medium uppercase sm:text-sm`}>
        {text}
      </span>
      <Image
        src={isExpanded ? minusIcon : plusIcon}
        width={12}
        height={12}
        alt={isExpanded ? "Close" : "Open"}
      />
    </button>
  );
};

export default RACButtonMobile;
