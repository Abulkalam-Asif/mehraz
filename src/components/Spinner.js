const Spinner = ({ text, size }) => {
  const spinnerSizeStyles = {
    sm: "w-10 h-10 border-4",
    md: "w-20 h-20",
    lg: "w-20 h-20 border-8",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };
  return (
    <>
      <div className={`flex flex-col items-center justify-center gap-4`}>
        <div
          className={`${spinnerSizeStyles[size]} border-accent-1-dark border-b-transparent rounded-full animate-spin`}></div>
        <p
          className={`"text-accent-1-dark ${textSizeStyles[size]} font-medium`}>
          {text}
        </p>
      </div>
    </>
  );
};

export default Spinner;
