import Link from "next/link";
const LinkButton = ({
  href = "/",
  text = "",
  type = "general",
  className = "",
}) => {
  const typeStyles = {
    general: "px-4 py-3",
    "admin-dashboard": "px-10 py-3",
  };
  return (
    <>
      <Link
        href={href}
        className={`font-bold uppercase bg-accent-1-base rounded-2xl ${className} ${typeStyles[type]}`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
