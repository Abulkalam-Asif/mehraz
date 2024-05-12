import { Tag } from "@/components";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const TagsInput = ({
  label = "",
  idHtmlFor = "",
  tagsArr = [],
  name = "",
  inputHandler = () => {},
  required = false,
}) => {
  const { showAlert } = useContext(AlertContext);

  const removeTagHandler = value => {
    const updatedTagsArr = tagsArr.filter(tag => tag !== value);
    inputHandler(name, updatedTagsArr);
  };

  const addTagHandler = e => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        showAlert({ type: "ERROR", message: "Please enter a keyword!" });
        return;
      } else if (tagsArr.includes(e.target.value.trim().toUpperCase())) {
        showAlert({ type: "ERROR", message: "This keyword already exists!" });
        return;
      }
      const updatedTagsArr = [...tagsArr, e.target.value.trim().toUpperCase()];
      inputHandler(name, updatedTagsArr);
      e.target.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor={idHtmlFor}
          className="text-lg font-medium uppercase text-accent-1-extra-dark lg:text-base">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          className="border-2 text-base border-accent-1-base rounded-md px-4 py-1"
          onKeyUp={addTagHandler}
          id={idHtmlFor}
          name={name}
          autoComplete="off"
          placeholder="Press Enter to add a keyword..."
        />
        <div className="flex overflow-auto py-2 gap-2">
          {tagsArr?.map((value, index) => (
            <Tag
              key={index}
              value={value}
              removeTagHandler={removeTagHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TagsInput;
