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
        className={`font-bold uppercase rounded bg-accent-2-light border-2 border-accent-2-light shadow-lg hover:shadow-none hover:text-accent-1-dark hover:bg-transparent hover:border-accent-1-dark transition-colors transition-shadow duration-500 ${className} ${typeStyles[type]}`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
