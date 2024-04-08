"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

const MultiImageDisplay = ({
  imagesArray,
  removeImageHandler,
  className = "",
  name,
}) => {
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    setImagesUrls(prevState => {
      const newUrls = imagesArray.map(image => {
        if (image instanceof File) {
          return URL.createObjectURL(image);
        } else {
          return image;
        }
      });
      return newUrls;
    });
  }, [imagesArray]);

  const removeHandler = index => {
    const newFilesArray = imagesArray.filter((_, i) => i !== index);
    removeImageHandler(name, newFilesArray);
  };

  return (
    <>
      <div className={`grid grid-cols-2 gap-2 ${className}`}>
        {imagesUrls?.map((imageUrl, index) => (
          <div key={index} className="relative">
            <Image
              src={imageUrl}
              alt="image preview"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
            <button
              title="Remove image"
              type="button"
              onClick={() => removeHandler(index)}
              className="absolute top-2 right-2 bg-white border-2 border-black p-0.5 rounded hover:bg-accent-1-base">
              <FaXmark className="text-black" size={20} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiImageDisplay;
