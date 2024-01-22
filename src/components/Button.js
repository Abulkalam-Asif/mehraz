const Button = ({ text = "", className = "", onClick = () => {} }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`font-bold uppercase px-3 py-1 bg-accent-1-base rounded-2xl ${className}`}>
        {text}
      </button>
    </>
  );
};

export default Button;
