const DesSelStep1Screen1InputBox = ({ label, children }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-full items-center lg:justify-between gap-2">
        <span className="uppercase text-[#2F2F2F] text-2xl xl:text-xl sm:text-lg font-bold">
          {label}
        </span>
        {children}
      </div>
    </>
  );
};

export default DesSelStep1Screen1InputBox;
