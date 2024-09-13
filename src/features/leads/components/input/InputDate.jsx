import { useState } from "react";

const InputDate = ({ lable, defaultValue, updateType, updateFormValue }) => {
  const [value, setValue] = useState(defaultValue || "");

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };
  return (
    <div className="flex justify-between items-center mb-1">
      <p className="text-sm text-gray-900 dark:text-white">{lable}</p>
      <div className="relative w-80 border border-gray-300 rounded-lg overflow-hidden">
        <input
          value={value}
          onChange={(e) => updateInputValue(e.target.value)}
          type="date"
          className="bg-white    text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Chọn ngày"
        />
      </div>
    </div>
  );
};

export default InputDate;
