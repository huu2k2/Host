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
  index,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    if (type === "address") {
      setValue(val);

      updateFormValue({ updateType, value: val });
    } else {
      setValue(val);
      updateFormValue({ updateType, value: val.value, index: index });
    }
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
    <div className="flex flex-col items-start w-full">
      <p className="text-sm leading-5 font-medium">{lable}</p>
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={updateInputValue}
        styles={colourStyles}
      />
    </div>
  );
}
