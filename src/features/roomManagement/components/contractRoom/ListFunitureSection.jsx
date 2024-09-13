import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  formatPrice,
  formatStringToPrice,
} from "../../../../components/Input/Format";

export default function ListFunitureSection({
  defaultValue,
  updateFormValue,
  index,
  disable=false
}) {
  const [value, setValue] = useState(
    defaultValue || {
      furnitureId: 0,
      price: 0,
      note: "",
      name: "",
      status: "",
      isActived: true,
    }
  );
  const [valuePric] = useState(defaultValue.price);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const updatePrice = (val) => {
    val = formatStringToPrice(val);
    const newobj = { ...value, price: val };
    setValue(newobj);
    if (val) {
      updateFormValue({ value: newobj, index: index });
    }
  };

  const updateStatus = (val) => {
    const newobj = { ...value, status: val.value };
    setValue(newobj);
    updateFormValue({ value: newobj, index: index });
  };

  const updateNote = (val) => {
    const newobj = { ...value, note: val };
    setValue(newobj);
    updateFormValue({ value: newobj, index: index });
  };

  const handleChecked = () => {
    const newobj = { ...value, isActived: !value.isActived };
    setValue(newobj);
    updateFormValue({ value: newobj, index: index });
  };

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
    <div className="flex justify-between items-start mb-5">
      <div className="text-sm font-medium text-gray-900 dark:text-white">
        <div className="flex items-center me-4">
          <input
            id="red-checkbox"
            type="checkbox"
            checked={value.isActived}
            onChange={handleChecked}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label
            // for="red-checkbox"
            className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {value.furnitureName}
          </label>
        </div>
      </div>

      {/* {value.isActived && ( */}
      <div>
        <div className="shadow border border-gray-300 rounded-md w-80 flex">
          <div className="grow">
 
             <input
              type="text"
              value={value.price === 0 ? "Trang bị sẵn" : formatPrice(value.price)}
              onChange={(e) => updatePrice(e.target.value)}
              className="w-full h-8 focus:outline-none text-gray-900"
              readOnly={disable || valuePric <= 0}
            />
          </div>
          <div className=" h-9 text-gray-500 text-sm font-normal leading-tight py-2 px-2">
            đ
          </div>
        </div>

        <div className="w-80 mt-3 shadow border border-gray-300 rounded-md">
          <Select
            placeholder="Tình trạng"
            onChange={updateStatus}
            defaultValue={
              value.status ? { value: value.status, label: value.status } : null
            }
            options={[
              { value: "Mới", label: "Mới" },
              { value: "Cũ", label: "Cũ" },
            ]}
            styles={colourStyles}
          />
        </div>

        <div className="shadow border border-gray-300 rounded-md w-80 mt-3">
          <div className="grow">
            <textarea
              rows={2}
              type="text"
              value={value.note}
              onChange={(e) => updateNote(e.target.value)}
              className="w-full focus:outline-none text-gray-900"
            />
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
