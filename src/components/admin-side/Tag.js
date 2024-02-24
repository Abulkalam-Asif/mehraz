import { FaXmark } from "react-icons/fa6";

const Tag = ({ value = "", removeTagHandler = () => {} }) => {
  return (
    <>
      <div className="flex items-center gap-2 bg-accent-1-dark text-white rounded text-sm px-2 cursor-context-menu">
        <span className="py-1 whitespace-nowrap">{value}</span>
        <button
          type="button"
          onClick={() => removeTagHandler(value)}
          className="hover:bg-accent-1-extra-dark rounded-sm p-0.5">
          <FaXmark className="text-white" />
        </button>
      </div>
    </>
  );
};

export default Tag;
