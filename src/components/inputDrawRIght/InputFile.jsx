import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import { useEffect, useState } from "react";

const InputFile = ({
  lable,
  updateFormValue,
  updateType,
  defaultValue = "",
  index,
  index2,
}) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (file) => {
    if (!file) return; // Kiểm tra nếu không có file thì không làm gì cả

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // Chỉ lấy phần base64
      updateFormValue({
        updateType,
        value: base64String,
        index,
        index2,
      });
      setValue(reader.result); // Cập nhật state với URL Data
    };
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex justify-between items-center mb-5 mt-5">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {lable}
      </p>
      <div className="flex items-center justify-center w-80">
        {value ? (
          <div className="relative w-full">
             <svg
            className="absolute top-0 right-0 w-5 h-5 z-10 text-white bg-black rounded-full size-6"
              onClick={()=>setValue("")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
               
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <img
              src={"data:image/jpeg;base64," + value}
              alt="Preview"
              className="w-full  object-cover border-2 border-gray-300 rounded-lg"
            />
           
          </div>
        ) : (
          <label
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
              onChange={(e) => updateInputValue(e.target.files[0])}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default InputFile;
