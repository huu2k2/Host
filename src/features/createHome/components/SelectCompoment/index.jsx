import React, { useState } from "react";
import Select from "react-select";
const SelectCompoment = ({
 
  lable,
  updateType,
  updateFormValue,
}) => {
  const options = [
    { value: "Phí wifi", label: "Phí wifi" },
    { value: "Phí sử dụng máy giặt chung", label: "Phí sử dụng máy giặt chung" },
    { value: "Phí vệ sinh", label: "Phí vệ sinh" },
  ];
  const options1 = [
    { value: "Giường", label: "Giường" },
    { value: "Tivi", label: "Tivi" },
    { value: "Bếp từ", label: "Bếp từ" },
    { value: "Ấm siêu tốc", label: "Ấm siêu tốc" },
    { value: "Tủ giày dép", label: "Tủ giày dép" },
    { value: "Sofa", label: "Sofa" },
    { value: "Bàn ăn", label: "Bàn ăn" },
    { value: "Bàn làm việc", label: "Bàn làm việc" },
    { value: "Bàn trang điểm", label: "Bàn trang điểm" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    updateFormValue({ updateType, value: option.value });
  };
  return (
    <div className="flex justify-between items-center mb-5 h-fit">
      <p className="text-sm text-gray-900 dark:text-white">{lable}</p>
      <div className="border rounded-md">
        <div className="border border-solid border-gray-300 rounded-md">
          <Select
            className="w-80  h-[38px]    focus:outline-none"
            value={selectedOption}
            placeholder={updateType==="furnitureName"?"Chọn nội thất":"Chọn dịch vụ"}
            onChange={handleChange}
            options={updateType==="furnitureName"?options1:options}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCompoment;
