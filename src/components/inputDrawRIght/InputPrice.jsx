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
  lable1 = "",
}) {
  const [value, setValue] = useState(defaultValue || "");

  const updateInputValue = (val) => {
    val = formatStringToPrice(val);
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  useEffect(() => {
    setValue(defaultValue || "");
    console.log(updateType, defaultValue);
    if (updateType === "additionalDepositAmount") {
      updateFormValue({
        updateType: "additionalDepositAmount",
        value: defaultValue,
      });
    }
  }, [defaultValue]);

  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {lable}
        </p>
        <p className="text-sm    text-gray-900 dark:text-white italic">
          {lable1}
        </p>
      </div>
      <div className={`shadow border border-gray-300 rounded-md w-80 flex ${disabled && 'bg-gray-100'}`}>
        <div className="grow">
          <input
            type="text"
            disabled={disabled || false}
            value={formatPrice(value)}
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
