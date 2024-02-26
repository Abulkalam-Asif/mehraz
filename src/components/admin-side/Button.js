const Button = ({
  text = "",
  className = "",
  onClick = () => {},
  disabled = false,
  color = "accent-2",
  size = "base",
  isTransitioned = false,
  type = "submit",
}) => {
  const colorStyles = {
    "accent-2": "bg-accent-2-base text-white",
    red: "bg-red-500 text-white",
  };
  const sizeStyles = {
    xs: "text-xs px-3 py-1 shadow",
    sm: "text-sm px-4 py-2 shadow-lg",
    base: "text-base px-7 py-2.5 shadow-lg",
  };
  const transitionStyles = {
    "accent-2":
      "text-white border-2 border-accent-2-base hover:shadow-none hover:text-accent-2-base hover:bg-transparent hover:border-accent-1-dark transition-colors duration-500",
  };
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`uppercase rounded ${
          isTransitioned && transitionStyles[color]
        } ${sizeStyles[size]} ${colorStyles[color]} ${className}`}>
        {text}
      </button>
    </>
  );
};
export default Button;
