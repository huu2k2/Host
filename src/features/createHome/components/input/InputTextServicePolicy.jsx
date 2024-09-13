import React, { useState } from "react";
import { formatName } from "../../../../components/Input/Format";
import { formatNumber } from "../../../../components/Input/Format";

export default function InputTextServicePolicy({
  lable,
  disabled,
  type,
  defaultValue,
  format,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue || "");
  const updateInputValue = (val) => {
    if (format === "fullName") {
      val = formatName(val);
    }
    if (format === "number") {
      val = formatNumber(val);
    }
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <p className="text-sm text-gray-900 dark:text-white">{lable}</p>
      <div className="border rounded-md">
        <div className="border border-solid border-gray-300 rounded-md">
          <input
            type={type || "number"}
            disabled={disabled || false}
            value={value}
            onChange={(e) => updateInputValue(e.target.value)}
            className="w-80 pl-2 h-[38px] p-[9px 13px 9px 13px]  focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
