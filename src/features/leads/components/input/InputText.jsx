import React, { useState } from "react";
import { formatName } from "../../../../components/Input/Format";
import { formatNumber } from "../../../../components/Input/Format";

export default function InputText({
  lable,
  disabled,
  type,
  defaultValue,
  format,
  updateFormValue,
  updateType,
  errorMessage
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

  const handleInputChange = (e) => {
    let val = e.target.value;
    if (type === "number") {
      // Remove non-digit characters
      val = val.replace(/\D/g, "");
      // Limit the length to 10 characters
      if (val.length > 10) {
        val = val.slice(0, 10);
      }
    }
    updateInputValue(val);
  };

  return (
    <div >
      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-gray-900 dark:text-white">{lable}</p>
        <div className="border border-solid border-gray-300 rounded-md overflow-hidden">
          <input
            type={type || "text"}
            disabled={disabled || false}
            value={value}
            required
            onChange={handleInputChange}
            className="w-80 pl-2 h-[38px] p-[9px 13px 9px 13px] focus:outline-none"
            maxLength={lable === 'CCCD/CMND' ? 12 : undefined}
            minlength={lable === 'CCCD/CMND' ? 12 : undefined}
          />


        </div>
      </div>
      <p className="text-red-500 mt-[-15px]" >{errorMessage}</p>
    </div>
  );
}
