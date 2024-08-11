const DesignOptionsRadio = ({
  options,
  selectedOption,
  selectOptionHandler,
}) => {
  return (
    <>
      <form className="flex items-center gap-3 rounded-full shadow-btn border border-black/20 px-8 py-1">
        {options.map((option, index) => (
          <label
            className={`flex items-center gap-2 p-1 pr-3 border border-black/20 rounded-full text-base xl:text-sm sm:text-xs cursor-pointer hover:bg-black hover:bg-opacity-5`}
            htmlFor={`option${index}`}
            key={index}>
            <input
              id={`option${index}`}
              type="radio"
              name="designOptions"
              value={option}
              checked={selectedOption === index}
              onChange={e => {
                if (e.target.checked) {
                  selectOptionHandler(index)
                }
              }}
              className="absolute top-0 left-0 text-accent-1-extra-dark rounded-md peer w-0 h-0 focus:outline-none"
            />
            <span
              className={`block w-6 h-6 xl:w-4 xl:h-4 bg-white border-2 border-[#000000cc] rounded-full peer-checked:bg-accent-dark-blue`}></span>
            <span className="flex-1 px-1 text-sm uppercase peer-checked:font-bold peer-focus:outline-2 peer-focus:outline-dashed peer-focus:outline-accent-2-base ">
              {option}
            </span>
          </label>
        ))}
      </form>
    </>
  );
};

export default DesignOptionsRadio;
