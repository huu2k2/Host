import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function InputSelect({
  type,
  lable,
  defaultValue,
  updateFormValue,
  updateType,
  options,
  placeholder = "",
  disabled=false
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val.value });
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const colourStyles = {
    container: (styles) => ({ ...styles, width: "100%", height: "2rem" }), // Set the width to 100%
    control: (styles) => ({
      ...styles,
      width: "100%",
      backgroundColor: "white",
      height: "2rem",
    }), // Set the width to 100%
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <p className=" font-medium text-sm text-gray-900 dark:text-white">{lable}</p>
      <div className="shadow border border-gray-300 rounded-md w-80">
        <Select
          placeholder={value}
          options={options}
          value={value}
          onChange={updateInputValue}
          styles={colourStyles}
          isDisabled={disabled}
          className="text-sm"
        />
      </div>
    </div>
  );
}
