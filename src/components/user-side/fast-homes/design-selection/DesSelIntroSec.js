const DesSelIntroSec = () => {
  return (
    <>
      <div className="relative z-[1] min-h-full w-full bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3]">
        <div className="w-full max-w-7xl flex flex-col items-center mx-auto p-8 pt-28 text-white lg:pt-8 lg:pb-16 sm:px-4 lg:max-w-xl">
          <h2 className="flex items-center gap-10 text-3.5xl border border-white rounded-full border-opacity-50 px-16 py-1">
            <span>home construction costs</span>
            <span>
              depend on <b>two decisions</b>
            </span>
          </h2>
          <div className="w-full flex flex-col items-center gap-4 mt-8 text-4xl">
            <hr className="w-full opacity-40" />
            <h1 className="flex items-center gap-10">
              <span>
                how you want to <b className="text-4.5xl">build</b>
              </span>
              <span className="opacity-60">(grey structure)</span>
            </h1>
            <hr className="w-full opacity-40" />
            <h1 className="flex items-center gap-10">
              <span>
                how you want it to <b className="text-4 5xl">look</b>
              </span>
              <span className="opacity-60">(finishing)</span>
            </h1>
            <hr className="w-full opacity-40" />
          </div>
          <h3 className="text-3.5xl text-accent-gold-light mt-16">
            lets set <b>look</b> first, then its <b>build</b>
          </h3>
        </div>
      </div>
    </>
  );
};

export default DesSelIntroSec;
