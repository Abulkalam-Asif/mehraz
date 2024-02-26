const H2 = ({ text = "", className = "" }) => {
  return (
    <>
      <h2
        className={`${className} text-accent-2-base text-base font-bold uppercase text-center`}>
        {text}
      </h2>
    </>
  );
};

export default H2;
