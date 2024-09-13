import React, { useEffect, useState } from "react";
import InputGroup from "./input/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { openRightDrawer } from "../../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil";
import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";

export const ServicePolicySection = () => {
  const { servicesPolicy } = useSelector((state) => {
    return state.newHome;
  });

  const dispatch = useDispatch();

  const openRightDrawerCreatePolicy = () => {
    dispatch(
      openRightDrawer({
        header: "Thêm chính sách dịch vụ",
        content: "Vui lòng cập nhật thông tin dưới đây để thêm dịch vụ mới.",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_POLICY,
      })
    );
  };

  const ItemsDefault = [
    { id: 1, serviceName: "Giá điện", units: ["Kwh"], price: 0 },
    {
      id: 2,
      serviceName: "Giá nước",
      units: ["Người", "M3", "Phòng"],
      price: 0,
    },
    { id: 3, serviceName: "Phí xe", units: ["Xe"], price: 0 },
    { id: 4, serviceName: "Phí dịch vụ", units: ["Người", "Phòng"], price: 0 },
  ];
  const merge = (arr1, arr2) => {
    const dataMerge = [...arr1, ...arr2];
    const uniqueItems = new Map();
  
    dataMerge.forEach((item) => {
      if (!uniqueItems.has(item.serviceName)) {
        uniqueItems.set(item.serviceName, item);
      }
    });
  
    const Items = Array.from(uniqueItems.values());
    const ArrIn = ['Giá điện', 'Giá nước', 'Phí xe', 'Phí dịch vụ'];
    const valFinal = [];
    const endFinal = [];
  
    Items.forEach((item) => {
      if (ArrIn.includes(item.serviceName.trim())) {
        valFinal.push(item);
      } else {
        endFinal.push(item);
      }
    });
  
    return valFinal.concat(endFinal);
  };
const [getDataMerge,setDatamerge] = useState([])
useEffect(()=>{
  setDatamerge(merge(servicesPolicy,ItemsDefault))
},[servicesPolicy])

  return (
    <>
      <div>
        <p className="text-lg leading-6 font-medium text-gray-900">
          Chính sách dịch vụ
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {getDataMerge.map((item, index) => (
            <InputGroup
              key={index}
              index={index}
              lable={item.serviceName}
              options={item.units}
              item={item}
              setDatamerge={setDatamerge}
            />
          ))}
        </div>
        <button
          onClick={openRightDrawerCreatePolicy}
          className="mt-2 w-9 h-9 p-2 bg-white rounded-2xl shadow border border-zinc-400 justify-center items-center inline-flex hover:border-rose-700"
        >
          <PlusSmallIcon className="w-5 h-5 relative" />
        </button>
      </div>
    </>
  );
};
