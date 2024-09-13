import React, { useEffect, useState } from "react";

export default function InputArea({
  lable,
  disabled,
  type,
  defaultValue,
  format,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
 
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  

  return (
    <div className="flex flex-col items-start w-full">
      <p className="text-sm leading-5 font-medium">{lable}</p>
      <textarea
        value={value}
        onChange={(e) => updateInputValue(e.target.value)}
        className="textarea textarea-bordered w-full focus:outline-none h-28"
      ></textarea>
    </div>
  );
}
