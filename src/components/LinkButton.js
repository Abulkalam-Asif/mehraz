import Link from "next/link";
import React from "react";

const LinkButton = ({ href = "/", text = "", style = "filled" }) => {
  return (
    <>
      <Link
        href={href}
        className={`text-1.5xl font-bold uppercase bg-accent-1-base px-12 py-4 rounded-2xl`}>
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
