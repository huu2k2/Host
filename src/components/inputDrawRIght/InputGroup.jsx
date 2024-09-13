import React, { useEffect, useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { useDispatch } from "react-redux";
import { formatPrice } from "../Input/Format";

export default function InputGroup({
  lable,
  disabled,
  index,
  item,
  updateFormValue,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({ price: "", option: item.option });

  useEffect(() => {
    setValue({ price: item.price, option: item.option });
  }, [item]);

  const handleOptionClick = (option) => {
    setValue({ ...value, option: option });
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
    price = extractNumbers(price);
    setValue({ ...value, price: price });
    const newObj = {
      serviceName: item.serviceName,
      serviceId: item.serviceId,
      servicePrice: price,
      dvt: item.option,
    };
    updateFormValue({ value: newObj, index: index });
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {lable}
      </p>
      <div className="shadow border border-gray-300 rounded-md w-80 flex">
        <div className="flex w-full">
          <div className="self-stretch w-full bg-white rounded-md  justify-start items-center inline-flex">
            <div className="w-full inline-flex">
              <div className="grow">
                <input
                  value={formatPrice(value.price)}
                  onChange={(e) => handleUpdatePrice(e.target.value)}
                  type="text"
                  min={100}
                  disabled={disabled || false}
                  className="w-full pl-2 h-[38px] p-[9px 13px 9px 13px] border-none border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div className=" h-9 text-gray-500 text-sm font-normal leading-tight py-2 px-2">
                đ
              </div>
            </div>
            <div className="relative inline-block text-left">
              <button
                // onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="pl-3.5 pr-4 py-2 bg-gray-50 rounded-tr-md rounded-br-md border-l border-gray-300 justify-center items-center gap-2 flex"
              >
                <div className="text-gray-500 text-sm font-normal">
                  {value.option}
                </div>
                {/* <div className="w-5 h-5 relative">
                  <ChevronDownIcon />
                </div> */}
              </button>
              {isOpen && (
                <div className="z-50 origin-top-right absolute right-0 mt-2 rounded-md bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {item.units.map((option, index) => (
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
        </div>
      </div>
    </div>
  );
}
