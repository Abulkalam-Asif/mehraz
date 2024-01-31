const Button = ({
  text = "",
  className = "",
  onClick = () => {},
  disabled = false,
  color = "gray",
  size = "base",
}) => {
  const colorStyles = {
    gray: "bg-accent-1-base text-black",
    red: "bg-red-500 text-white",
  };
  const sizeStyles = {
    xs: "text-xs px-3 py-1",
    sm: "text-sm px-4 py-2",
    base: "text-base px-5 py-2.5",
  };
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`font-bold uppercase rounded-full ${sizeStyles[size]} ${colorStyles[color]} ${className}`}>
        {text}
      </button>
    </>
  );
};
export default Button;
