import { useState } from "react";
import { formatName } from "../Input/Format";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";

function InputFileFormik({
  defaultValue,
  updateType,
  formik,
  containerStyle,
  labelStyle,
  labelTitle,
  type,
  disabled,
  format,
  value,
}) {
  const updateInputValue = (val) => {
    const reader = new FileReader();

    reader.readAsBinaryString(val);
    reader.onload = () => {
      const base64String = btoa(reader.result);

      formik.setFieldValue(updateType, base64String);
    };
  };

  return (
    <div className={`form-control relative  w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <div className="border border-solid border-gray-300 rounded-lg">
        <label
          style={{
            backgroundSize: "contain",
            backgroundImage: `url(data:image/png;base64,${formik.values[updateType]})`,
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
            onChange={(e) => updateInputValue(e.target.files[0])}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>

      <div className="absolute -bottom-7 text-rose-600">
        {formik.errors[updateType]}
      </div>
    </div>
  );
}

export default InputFileFormik;
