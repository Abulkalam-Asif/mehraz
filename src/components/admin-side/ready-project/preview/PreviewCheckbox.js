const PreviewCheckbox = ({ idHtmlFor, label, value, inpuHandler, checked }) => {
  return (
    <>
      <div className="flex items-center gap-8">
        <input
          type="checkbox"
          id={idHtmlFor}
          value={value}
          onChange={inpuHandler}
          checked={checked}
          className={`relative w-0 h-0 peer focus:outline-0 after:visible after:w-5 after:h-5 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:rounded-full ${
            checked ? "after:bg-accent-2-base" : "after:bg-transparent"
          } after:border-2 after:border-accent-2-base`}
        />
        <label
          htmlFor={idHtmlFor}
          className="peer-focus:outline-2 peer-focus:outline-accent-2-base peer-focus:outline-dashed">
          {label}
        </label>
      </div>
    </>
  );
};

export default PreviewCheckbox;
