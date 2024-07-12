const DesSelStep1Screen2InputBox = ({ label, children }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-full items-center lg:justify-between gap-2">
        <span className="uppercase text-[#2F2F2F] text-xl lg:text-lg font-bold">
          {label}
        </span>
        {children}
      </div>
    </>
  );
};

export default DesSelStep1Screen2InputBox;
