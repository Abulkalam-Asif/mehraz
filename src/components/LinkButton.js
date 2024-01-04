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
    typeStyles = "px-5 py-4 2xl:px-4 2xl:py-3";
  } else if (type === "admin-dashboard") {
    typeStyles = "px-14 py-4 2xl:px-11 2xl:py-3";
  }
  return (
    <>
      <Link
        href={href}
        className={`text-1.5xl font-bold uppercase bg-accent-1-base rounded-2xl 2xl:text-lg ${className} ${typeStyles}`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
