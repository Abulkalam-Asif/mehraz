import { closeIcon } from "@/assets";
import Image from "next/image";
import { Spinner } from "@/components";

const Modal = ({
  isModalOpen = false,
  toggleModal = () => {},
  children,
  className = "",
  showModalSpinner = false,
  maxWidth = "max-w-lg",
}) => {
  return (
    <>
      <div
        onClick={toggleModal}
        className={`${
          isModalOpen
            ? "fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-[2]"
            : "hidden"
        }`}></div>
      <div
        className={`fixed z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${maxWidth} bg-white/90 rounded-xl overflow-hidden
         ${className}`}>
        <button
          onClick={toggleModal}
          className="z-[4] absolute top-2 right-3 bg-accent-1-base p-2 rounded-full ">
          <Image src={closeIcon} alt="close" />
        </button>
        {children}
      </div>
      {showModalSpinner && (
        <div className="z-[4] bg-black bg-opacity-20 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default Modal;
