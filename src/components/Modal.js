import { closeIcon } from "@/assets";
import Image from "next/image";
const Modal = ({
  isModalOpen = false,
  toggleModal = () => {},
  children,
  className = "",
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
        className={`fixed z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl
         ${className}`}>
        <button
          onClick={toggleModal}
          className="z-[4] absolute top-2 right-3 bg-accent-1-base p-2 rounded-full ">
          <Image src={closeIcon} alt="close" />
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
