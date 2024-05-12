import Link from "next/link";
const LinkButton = ({
  href = "/",
  text = "",
  className = "",
  color = "accent-2",
  size = "base",
  isTransitioned = false,
}) => {
  const colorStyles = {
    "accent-2": "text-white bg-accent-2-base border-2 border-accent-2-base",
    "accent-2-outlined":
      "text-accent-2-base bg-transparent border-2 border-accent-2-base",
  };
  const sizeStyles = {
    xxs: "text-xs px-2 py-1 shadow",
    xs: "text-xs px-3 py-1 shadow",
    sm: "text-sm px-4 py-2 shadow-lg",
    base: "text-base px-7 py-2.5 shadow-lg sm:px-5 sm:py-2",
    "admin-dashboard": "text-base px-10 py-2",
  };
  const transitionStyles = {
    "accent-2":
      "border-2 border-accent-2-base hover:shadow-none hover:text-accent-2-base hover:bg-white transition-colors duration-500",
  };

  return (
    <>
      <Link
        href={href}
        className={`font-proxima-nova uppercase rounded ${
          isTransitioned && transitionStyles[color]
        } ${colorStyles[color]} ${sizeStyles[size]} ${className}`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
