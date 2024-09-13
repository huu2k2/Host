import React, { useEffect, useState } from "react";
import Select from "react-select";

const MutiSelect = ({
  options,
  placeholder = "",
  lable,
  updateFormValue,
  updateType,
  defaultValue,
}) => {
  const [value, setValue] = useState([]);

  const updateInputValue = (val) => {

    setValue(val);
    updateFormValue({ updateType, value: val.length > 0 ? val : [] });
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
    <div className=" flex-col items-start w-full">
      <p className="text-sm leading-5 font-medium">{lable}</p>
      <Select
        onChange={updateInputValue}
        value={value}
        placeholder={placeholder}
        defaultValue={[options[0], options[1]]}
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select focus:border-none"
        classNamePrefix="select"
        styles={colourStyles}
      />
    </div>
  );
};

export default MutiSelect;
