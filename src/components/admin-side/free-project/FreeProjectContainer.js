const FreeProjectContainer = ({ children, className = "" }) => {
  return (
    <>
      <div
        className={`overflow-hidden border-dashed border-2 border-accent-1-dark rounded-3xl px-4 py-2 sm:px-1 ${className}`}>
        {children}
      </div>
    </>
  );
};

export default FreeProjectContainer;
