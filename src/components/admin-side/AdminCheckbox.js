const AdminInputBox = ({
  label = "",
  idHtmlFor = "",
  name = "",
  checked = false,
  inputHandler = () => {},
}) => {
  const onChangeHandler = e => {
    inputHandler(name, e.target.checked);
  };

  return (
    <>
      <div className="flex gap-2 items-center jusbe">
        <input
          type={"checkbox"}
          id={idHtmlFor}
          name={name}
          checked={checked}
          onChange={onChangeHandler}
        />
        <label htmlFor={idHtmlFor} className="text-accent-1-dark">
          {label}
        </label>
      </div>
    </>
  );
};

export default AdminInputBox;
