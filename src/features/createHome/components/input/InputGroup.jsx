import React, { useEffect, useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { useDispatch } from "react-redux";
import { deleteServicePolicy, updateServicePolicy } from "../NewHomeSlice";
import { showNotification } from "../../../common/headerSlice";
import { formatPrice } from "../../../../components/Input/Format";

export default function InputGroup({ lable, disabled, options, index, item ,setDatamerge}) {
   
  const CovertOptions = () => {
    let Options;
    const optionServices = ["Người", "Phòng"];
    const optionWater = ["Người", "Phòng","M3"];
    switch (lable) {
      case 'Giá điện':
        Options = [...options];
        break;
      case 'Giá nước':
        Options = [...options,...optionWater.filter((i) => i !== options[0])];
        break;
      case 'Phí xe':
        Options = [...options];
        break;
      case 'Phí dịch vụ':
        Options = [...options, ...optionServices.filter((i) => i !== options[0])];
        break;
      default:
        Options = optionServices;
    }
    return Options;
  };

  const updatedOptions = CovertOptions();
 
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({ price: item.price, option: item.option });

  useEffect(() => {
    setValue({ price: formatPrice(item.price), option: item.option });
    
  }, [item]);

  const handleOptionClick = (option) => {
    setValue((prevState) => ({ ...prevState, option: option }));
    const newServicePolicy = { ...item, option: option };
    dispatch(updateServicePolicy({ newServicePolicy, index }));
    setIsOpen(false);
  };

  function extractNumbers(inputString) {
    let result = "";
    for (let i = 0; i < inputString.length; i++) {
      if (!isNaN(inputString[i])) {
        result += inputString[i];
      }
    }
    return result === "" ? null : parseInt(result, 10);
  }

  const handleUpdatePrice = (price) => {
    const extractedPrice = extractNumbers(price);
    setValue((prevState) => ({ ...prevState, price: extractedPrice }));
    const newServicePolicy = { ...item, price: extractedPrice };
    dispatch(updateServicePolicy({ newServicePolicy, index }));
  };

  const handleDetele = () => {
    setDatamerge((prev) => {
      const newData = [...prev];
      newData.splice(index, 1); // Loại bỏ phần tử tại chỉ số index
      return newData;
    });
    dispatch(deleteServicePolicy({ index }));
    dispatch(
      showNotification({
        message: "Xóa dịch vụ thành công",
        status: 1,
      })
    );
  };

  return (
    <div className="w-full h-16 flex-col justify-start items-start gap-1 inline-flex">
      <p className="text-sm leading-5 font-medium">{lable}</p>
      <div className="flex w-full">
        <div className="self-stretch w-full bg-white rounded-md shadow border border-gray-300 justify-start items-center inline-flex">
          <div className="w-full inline-flex">
            <div className="grow">
              <input
                value={value.price}
                onChange={(e) => handleUpdatePrice(e.target.value)}
                type="text"
                min={100}
                disabled={disabled || false}
                className="w-full pl-2 h-[38px] p-[9px 13px 9px 13px] border-none border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="h-9 text-gray-500 text-sm font-normal leading-tight py-2 px-2">
              đ
            </div>
          </div>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="pl-3.5 pr-4 py-2 bg-gray-50 rounded-tr-md rounded-br-md border-l border-gray-300 justify-center items-center gap-2 flex"
            >
              <div className="text-gray-500 text-sm font-normal">
                {value.option}
              </div>
              <div className="w-5 h-5 relative">
                <ChevronDownIcon />
              </div>
            </button>
            {isOpen && (
              <div className="z-50 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {updatedOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {["Giá điện", "Giá nước", "Phí xe", "Phí dịch vụ"].includes(item.serviceName) ? (
          <button>
            <TrashIcon className="w-5 text-gray-600 m-2" />
          </button>
        ) : (
          <button onClick={handleDetele}>
            <TrashIcon className="w-5 text-rose-600 m-2" />
          </button>
        )}
      </div>
    </div>
  );
}
