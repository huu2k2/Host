import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import { useEffect, useState } from "react";

const InputMutiFile = ({
  lable,
  updateFormValue,
  updateType,
  defaultValue = "",
}) => {
  const [images, setImages] = useState([]);
 

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
  
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 part from data URL
        imagesArray.push(base64String);
        if (imagesArray.length === files.length) {
          setImages([...imagesArray]); // Ensure state update happens after all files are processed
        }
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  useEffect(() => {
    updateFormValue({ value: images });
  }, [images]);

  return (
    <div className="flex justify-between items-center mb-5 mt-5">
      <div className="flex items-center justify-center w-full">
        <label
          style={{
            backgroundSize: "contain",
            backgroundImage: `url(data:image/png;base64,${defaultValue})`,
          }}
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <PhotoIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-rose-600">Tải tệp tin</span>{" "}
              hoặc kéo thả
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, IMG tới 100MB
            </p>
          </div>
          <input
            multiple
            onChange={handleImageChange}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};

export default InputMutiFile;
