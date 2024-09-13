import React, { useEffect, useState } from "react";
import {
  formatName,
  formatNameHome,
  formatNumber,
  formatPrice,
} from "../../../../components/Input/Format";
import { useLocation } from "react-router-dom";

export default function InputText({
  lable,
  disabled,
  type,
  defaultValue,
  format,
  updateFormValue,
  updateType,
  unit,
  index,
}) {
  const [value, setValue] = useState(defaultValue || "");
  function extractNumbers(inputString) {
    let result = "";
    for (let i = 0; i < inputString.length; i++) {
      if (!isNaN(inputString[i])) {
        result += inputString[i];
      }
    }
    return result === "" ? null : parseInt(result, 10);
  }
  const updateInputValue = (val) => {
    if (format === "fullName") {
      val = formatName(val);
    }

    if (format === "price") {
      val = extractNumbers(val);
      val = formatPrice(val);
    }

    if (format === "nameHome") {
      val = formatNameHome(val);
    }

    if (format === "number") {
      val = formatNumber(val);
    }

    setValue(val);
    updateFormValue({ updateType, value: val, index: index });
  };

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);
  let location = useLocation();
  return (
    <div className="flex flex-col items-start w-full">
      <p className="text-sm leading-5 font-medium">{lable}</p>
      <div className="w-full h-9 bg-white rounded-md border border-gray-300 inline-flex">
        <div className="grow">
          <input
            type={type || "text"}
            value={value}
            onChange={(e) => updateInputValue(e.target.value)}
            className="disabled:bg-gray-200 w-full h-8 focus:outline-none text-gray-900"
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
