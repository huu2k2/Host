import React, { useState } from "react";
import { formatName, formatNumber } from "../Input/Format";

export default function InputArea({
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
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {lable}
      </p>
      <div className="shadow border border-gray-300 rounded-md w-80 flex">
        <div className="grow">
          <textarea
          rows={5}
            type="text"
            disabled={disabled || false}
            value={value}
            onChange={(e) => updateInputValue(e.target.value)}
            className="w-full focus:outline-none text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}
