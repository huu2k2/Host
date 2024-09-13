import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";

async function fetchData() {
  try {
    const response = await fetch("https://api.vietqr.io/v2/banks");
    if (!response.ok) {
      throw new Error("Lỗi mạng");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
    return [];
  }
}

function getIndexBankByValue(data, targetValue) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].value == targetValue) {
      return data[i];
    }
  }
  // Trả về -1 nếu không tìm thấy giá trị
  return -1;
}

export default function SelectBankAPI({
  updateFormValue,
  updateType,
  defaultValue,
}) {
  const [options, setOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetchData().then((data) => {
      //xử lý dữ liệu khi gọi api
      data = data.map((item) => ({
        value: item.id,
        label: `${item.short_name} - ${item.name}`,
      }));
      setOption(data);
  
      const dataSelectDefault = getIndexBankByValue(data, defaultValue);
      setSelectedOption(dataSelectDefault);
    });
  }, []);
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    updateFormValue({ updateType, value: selectedOption.value.toString() });
  };

  return (
    <div className={`form-control w-80 mt-1`}>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder="Chọn ngân hàng"
        className="h-16"
      />
    </div>
  );
}
