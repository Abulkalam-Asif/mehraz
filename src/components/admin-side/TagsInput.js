import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import Tag from "./Tag";

const TagsInput = ({
  label = "",
  idHtmlFor = "",
  tagsArr = [],
  name = "",
  inputHandler = () => {},
}) => {
  const { showAlert } = useContext(AlertContext);

  const removeTagHandler = (value) => {
    const updatedTagsArr = tagsArr.filter((tag) => tag !== value);
    inputHandler(null, name, updatedTagsArr);
  };

  const addTagHandler = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        showAlert({ type: "error", message: "Please enter a keyword!" });
        return;
      } else if (tagsArr.includes(e.target.value.trim().toUpperCase())) {
        showAlert({ type: "error", message: "This keyword already exists!" });
        return;
      }
      const updatedTagsArr = [...tagsArr, e.target.value.trim().toUpperCase()];
      inputHandler(null, name, updatedTagsArr);
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
        </label>
        <input
          type="text"
          className="border-2 text-base border-accent-1-base rounded-md px-4 py-1"
          onKeyUp={addTagHandler}
          id={idHtmlFor}
          name={name}
          autoComplete="off"
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
