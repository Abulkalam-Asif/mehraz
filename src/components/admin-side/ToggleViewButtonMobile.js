import { minusIcon, plusIcon } from "@/assets";
import Image from "next/image";

const ToggleViewButtonMobile = ({
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
      } flex items-center justify-center gap-2 border-2 border-accent-2-base px-4 py-1 whitespace-nowrap rounded`}>
      <span
        className={`${
          isExpanded ? "text-black" : "text-white"
        } text uppercase sm:text-sm`}>
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

export default ToggleViewButtonMobile;
