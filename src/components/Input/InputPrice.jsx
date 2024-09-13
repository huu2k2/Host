import React, { useEffect, useState } from "react";
import { formatPrice, formatStringToPrice } from "../Input/Format";

export default function InputPrice({
  lable,
  disabled,
  type,
  defaultValue,
  format,
  updateFormValue,
  updateType,
  unit,
}) {
  const [value, setValue] = useState(defaultValue || "");

  const updateInputValue = (val) => {
    val = formatStringToPrice(val);
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  return (
  

    <div className="flex items-center mb-5">
      <p className="text-sm font-medium text-gray-900 dark:text-white">{lable}</p>
      <div className="shadow border border-gray-300 rounded-md w-80 flex">
        <div className="grow">
          <input
            type="text"
            disabled={disabled || false}
            value={formatPrice(value)}
            onChange={(e) => updateInputValue(e.target.value)}
            className="w-full h-8 focus:outline-none text-gray-900"
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
