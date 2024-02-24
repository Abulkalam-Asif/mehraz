const H1 = ({ text = "", className = "", type = "general" }) => {
  const typeStyles = {
    general: "text-3.5xl lg:text-2xl sm:text-xl",
    "admin-dashboard": "text-1.5xl mb-6 lg:text-xl lg:mb-12",
  };

  return (
    <>
      <h1
        className={`${className} ${typeStyles[type]} text-accent-2-base font-bold uppercase text-center`}>
        {text}
      </h1>
    </>
  );
};

export default H1;
