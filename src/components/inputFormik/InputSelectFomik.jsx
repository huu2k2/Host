import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function InputSelectFomik({
  labelTitle,
  defaultValue,
  updateType,
  options,
  placeholder = "",
  containerStyle,
  labelStyle,
  formik,
  isMulti = false,
  disabled = false,
}) {
  console.log(defaultValue)
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    formik.setFieldValue(updateType, val);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const colourStyles = {
    container: (styles) => ({ ...styles, width: "100%", height: "2rem" }),
    control: (styles) => ({
      ...styles,
      width: "100%",
      backgroundColor: "white",
      minHeight: "3rem",
    }),
  };
 
  return (
    <div className={`form-control w-full flex justify-end ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <Select
        isDisabled={disabled}
        isMulti={isMulti}
        placeholder={placeholder}
        options={options}
        value={formik.values[updateType]}
        onChange={updateInputValue}
        styles={colourStyles}
      />
      <div className="text-rose-600 mt-4">{formik.errors[updateType]}</div>
    </div>
  );
}
