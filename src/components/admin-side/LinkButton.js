import Link from "next/link";
const LinkButton = ({
  href = "/",
  text = "",
  type = "general",
  className = "",
  color = "accent-2",
  size = "base",
}) => {
  const typeStyles = {
    general: "px-4 py-2",
    "admin-dashboard": "px-10 py-2",
  };
  const colorStyles = {
    "accent-2": "text-white bg-accent-2-base border-2 border-accent-2-base",
    "accent-2-outlined":
      "text-accent-2-base bg-transparent border-2 border-accent-2-base",
  };
  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
  };
  return (
    <>
      <Link
        href={href}
        className={`font-proxima-nova uppercase rounded ${typeStyles[type]} ${colorStyles[color]} ${sizeStyles[size]} ${className}`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
