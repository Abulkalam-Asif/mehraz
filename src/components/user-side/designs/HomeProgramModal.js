const HomeProgramModal = ({ programs }) => {
  return (
    <>
      <div className="px-5 pt-12 pb-2 max-h-[calc(100vh-4rem)] overflow-y-auto text-[#2F2F2F]">
        {programs.map(({ category, quantity, subCategories }, index) => (
          <div key={index}>
            <h3 className="text-2xl uppercase font-bold flex items-center justify-between px-4 py-1 rounded-full shadow-btn">
              <span>{category}</span>
              <span>{quantity}</span>
            </h3>
            <div className="py-2">
              {subCategories.map(({ space, size }, index) => (
                <div
                  key={index}
                  className={`text-lg uppercase flex w-3/4 min-w-64 mx-auto items-center justify-between px-4 py-1 ${
                    index !== subCategories.length - 1
                      ? "border-b border-b-black/20"
                      : ""
                  }`}>
                  <span>{space}</span>
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeProgramModal;
