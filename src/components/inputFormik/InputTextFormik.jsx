import { useEffect, useState } from "react";
import { formatName } from "../Input/Format";
import { useGetName } from "../../context/NameHolderProvider";

function InputTextFormik({
  defaultValue,
  updateType,
  formik,
  containerStyle,
  labelStyle,
  labelTitle,
  type,
  disabled,
  format,
}) {
  const {getName,setName} = useGetName()
  useEffect(()=>{
    setName(formik.values["fullName"])
  },[formik.values["fullName"]])
  const updateInputValue = (val) => {
    if (format === "name") {
      val = formatName(val);
    }
    if(updateType==="fullName"){
      setName(formatName(val))
    }
    formik.setFieldValue(updateType, val);
  };

  return (
    <div className={`form-control relative  w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <div className="border border-solid border-gray-300 rounded-lg">
        <input
          type={type || "text"}
          value={formik.values[updateType] || ""}
          onChange={(e) => {
            updateInputValue(e.target.value);
          }}
          disabled={disabled}
          className="input  input-bordered w-full "
        />
      </div>

      <div className="absolute -bottom-7 text-rose-600">
        {formik.errors[updateType]}
      </div>
    </div>
  );
}

export default InputTextFormik;
