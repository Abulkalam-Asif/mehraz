const Loading = () => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 border-8 border-accent-2-base border-b-transparent rounded-full animate-spin"></div>
      </div>
    </>
  );
};

export default Loading;
