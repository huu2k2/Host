import React, { useEffect, useState } from "react";
import {
  formatPrice,
  formatStringToPrice,
} from "../../../../components/Input/Format";

export default function InputPrice({
  label, // fixed typo: changed 'lable' to 'label'
  disabled,
  type,
  defaultValue,
  format,
  updateFormValue,
  updateType,
  unit,
}) {
  const [value, setValue] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    setValue(defaultValue);
    setDisplayValue(formatPrice(defaultValue));
  }, [defaultValue]);

  const updateInputValue = (val) => {
    const formattedVal = formatStringToPrice(val);
    setValue(formattedVal);
    setDisplayValue(formatPrice(formattedVal));
    updateFormValue({ updateType, value: formattedVal });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <p className="text-sm leading-5 font-medium">{label}</p>
      <div className="w-full h-9 bg-white rounded-md border border-gray-300 inline-flex">
        <div className="grow">
          <input
            type="text"
            disabled={disabled || false}
            value={( value ===0 || value ==="0" || value ==='')? "Trang bị sẵn"  : displayValue}
            onChange={(e) => updateInputValue(e.target.value)}
            className="w-full h-8 focus:outline-none text-gray-900"
          />
          
        </div>
        {unit && (
          <div className="h-9 text-gray-500 text-sm font-normal leading-tight py-2 px-2">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
