import Link from "next/link";
const LinkButton = ({
  href = "/",
  text = "",
  type = "general",
  className = "",
}) => {
  const typeStyles = {
    general: "px-4 py-2",
    "admin-dashboard": "px-10 py-2",
  };
  return (
    <>
      <Link
        href={href}
        className={`font-medium uppercase rounded text-white bg-accent-2-base border-2 border-accent-2-base shadow-lg hover:shadow-none hover:text-accent-2-base hover:bg-transparent hover:border-accent-1-dark transition-colors duration-500 ${className} ${typeStyles[type]}`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
