import Link from "next/link";
const ULinkButton = ({
  href = "/",
  text = "",
  className = "",
  color = "gold-gold",
}) => {
  const colorStyles = {
    // before element used to transition the gradient. not possible without it
    "gold-gold":
      "relative z-[1] bg-gradient-to-b from-accent-gold-lighter to-accent-gold-light shadow-btn before:bg-white before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 before:rounded-sm hover:text-accent-gold hover:from-accent-gold hover:to-accent-gold hover:before:opacity-100 hover:shadow-none before:transition-opacity before:duration-300 duration-300",
    "gold-gray":
      "relative z-[1] bg-gradient-to-b from-accent-gold-lighter to-accent-gold-light shadow-btn before:bg-white before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 before:rounded-sm hover:text-black/70 hover:from-black/70 hover:to-black/70 hover:before:opacity-100 hover:shadow-none before:transition-opacity before:duration-300 duration-300",
    gray: "bg-accent-gray text-white",
  };

  return (
    <>
      <Link
        href={href}
        className={`block w-fit font-proxima-nova uppercase rounded ${colorStyles[color]} ${className}`}>
        {text}
      </Link>
    </>
  );
};

export default ULinkButton;
