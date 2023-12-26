import Link from "next/link";
import React from "react";

const Admin = () => {
  return (
    <>
      <div className="text-2xl font-medium">Admin panel</div>
      <Link href="/">Go to Home</Link>
    </>
  );
};

export default Admin;
