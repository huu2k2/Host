import React, { useState } from "react";
import { formatName, formatNameHome, formatNumber } from "../Input/Format";
import { useEffect } from "react";

export default function InputText({
  lable,
  disabled,
  type = "text",
  defaultValue = "",
  format,
  updateFormValue,
  updateType,
  unit,
  index,
  index2,
  placeholder,
  number=null
}) {
  const [value, setValue] = useState(defaultValue);
  const updateInputValue = (val) => {
    if (format === "fullName") {
      val = formatName(val);
    }
    if (type === "number") {
      val = formatNumber(val);
    }
    if (format === "upCase") {
      val = formatNameHome(val);
    }
    // if (updateType === "roomCode" && type === "text") {
    //   val = formatNumber(val);
    // }
    if(number==='number'){
      setValue((val === 0 || val === NaN || val === '') ? 0 :parseInt(val.replace(/\./g, '')).toLocaleString("vi-VN"));
    }else{

      setValue(val);
    }
    if (typeof updateFormValue === "function") {
      updateFormValue({ updateType, value: val, index, index2 });
    }
    
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex justify-between items-center mb-5">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {lable}
      </p>
      <div className="shadow border border-gray-300 rounded-md w-80 flex">
        <div className="grow">
          <input
            type={type}
            disabled={disabled || false}
            value={value}
            placeholder={placeholder || ""}
            onChange={(e) => updateInputValue(e.target.value)}
            className="disabled:bg-gray-100 w-full h-8 focus:outline-none text-gray-900"
          />
        </div>
        {unit && (
          <div className=" h-9 text-gray-500 text-sm font-normal leading-tight py-2 px-2">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
