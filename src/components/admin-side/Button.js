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
    "accent-2-outlined":
      "bg-transparent text-accent-2-base border-2 border-accent-2-base",
    red: "bg-red-500 text-white",
  };
  const sizeStyles = {
    xs: "text-xs px-3 py-1 shadow",
    sm: "text-sm px-4 py-2 shadow-lg",
    base: "text-base px-7 py-2.5 shadow-lg sm:px-5 sm:py-2",
  };
  const transitionStyles = {
    "accent-2":
      "border-2 border-accent-2-base hover:shadow-none hover:text-accent-2-base hover:bg-transparent hover:border-accent-1-dark transition-colors duration-500",
  };
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`font-proxima-nova uppercase rounded ${
          isTransitioned && transitionStyles[color]
        } ${sizeStyles[size]} ${colorStyles[color]} ${className}`}>
        {text}
      </button>
    </>
  );
};
export default Button;
