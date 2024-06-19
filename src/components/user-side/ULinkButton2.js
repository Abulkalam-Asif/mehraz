import Link from "next/link";
const ULinkButton = ({ href = "/", text = "", className = "" }) => {
  return (
    <>
      <Link
        href={href}
        className={`block w-fit font-proxima-nova uppercase rounded-full ${className}`}>
        {text}
      </Link>
    </>
  );
};

export default ULinkButton;
