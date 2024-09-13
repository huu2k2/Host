import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import { useState } from "react";

const InputFile = ({ lable, updateFormValue, updateType, defaultValue }) => {
  const [value, setValue] = useState("");

  const updateInputValue = (val) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = btoa(reader.result);

      updateFormValue({ updateType, value: base64String });
    };

    reader.readAsBinaryString(val);
    // setValue(val)
  };

  return (
    <div className="flex justify-between items-start mb-5 ">
      <p className="text-sm text-gray-900 dark:text-white">{lable}</p>
      <div className="flex items-center justify-center w-80">
        <label
          style={{
            backgroundSize: 'contain',
            backgroundImage:
              `url(data:image/png;base64,${defaultValue})`,
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
            value={value}
            onChange={(e) => updateInputValue(e.target.files[0])}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default InputFile;
