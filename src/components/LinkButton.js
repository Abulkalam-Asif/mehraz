import Link from "next/link";
import React from "react";

const LinkButton = ({
  href = "/",
  text = "",
  type = "general",
  className = "",
}) => {
  let typeStyles = "";
  if (type === "general") {
    typeStyles = "px-4 py-3";
  } else if (type === "admin-dashboard") {
    typeStyles = "px-10 py-3";
  }
  return (
    <>
      <Link
        href={href}
        className={`font-bold uppercase bg-accent-1-base rounded-2xl ${className} ${typeStyles}`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
