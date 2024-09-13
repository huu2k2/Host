import React, { useEffect, useState } from "react";

const CheckBox = ({ label, updateType, updateFormValue, defaultValue }) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    updateFormValue({ updateType, value: newCheckedState });
  };

  useEffect(() => {
    setIsChecked(defaultValue);
  }, [defaultValue]);

 

  return (
    <div className="flex items-center">
      <input
        id={label}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="w-4 h-4 text-rose-600 bg-white border-gray-300 rounded focus:ring-rose-500 focus:ring-2 cursor-pointer"
      />
      <label
        htmlFor={label}
        className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
