import Link from "next/link";
import React from "react";

const LinkButton = ({ href = "/", text = "", style = "filled" }) => {
  return (
    <>
      <Link
        href={href}
        className={`text-1.5xl font-bold uppercase bg-accent-1-base px-14 py-4 rounded-2xl 2xl:text-lg 2xl:px-11 2xl:py-3`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
