import React, { useEffect, useState } from "react";

const Checkbox = ({ content, quantity, updateFormValue, updateType }) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(()=>{
    let dataSession = JSON.parse(sessionStorage.getItem("dataSession")) || [];
    const existingIndex = dataSession.findIndex((item) => item.updateType === updateType);
    if(existingIndex!==-1){
      setIsChecked(dataSession[existingIndex].value)
    }
  },[updateType])
  const handleCheckboxChange = () => {
    let dataSession = JSON.parse(sessionStorage.getItem("dataSession")) || [];
    const existingIndex = dataSession.findIndex((item) => item.updateType === updateType);

    if (existingIndex !== -1) {
      // Update the existing entry's value
      dataSession[existingIndex].value = !isChecked;
    } else {
      // Add a new entry if it doesn't exist
      dataSession = [...dataSession, { updateType, value: !isChecked }];
    }
    sessionStorage.setItem("dataSession", JSON.stringify(dataSession));
    updateFormValue({ updateType, value: !isChecked });
    setIsChecked(!isChecked);

  };

  return (
    <div className="flex items-center mb-4">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="w-4 h-4 text-rose-600 bg-white border-gray-300 rounded focus:ring-rose-500 focus:ring-2 cursor-pointer"
      />
      <label
        htmlFor="default-checkbox"
        className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {content} <span>({quantity})</span>
      </label>
    </div>
  );
};

export default Checkbox;
