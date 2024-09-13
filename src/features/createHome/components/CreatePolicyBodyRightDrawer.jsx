import React, { useState } from "react";
import InputTextServicePolicy from "./input/InputTextServicePolicy";
import CheckBox from "./input/CheckBox";
import { instertServicePolicy } from "./NewHomeSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import InputServicePricePolicy from "./input/InputPriceServicePolicy";
import SelectCompoment from "./SelectCompoment";

function CreatePolicyBodyRightDrawer({ closeRightDrawer }) {
  const dispatch = useDispatch();

  const INIT_POLICY = {
    serviceName: "",
    price: 0,
    units: ["Phòng", "Người"],
    option: "Người",
    default: false,
  };

  const updateFormValue = ({ updateType, value }) => {
    setPolicyobObj({ ...policyObj, [updateType]: value });
  };



  const handleInsretServicePolicy = () => {
    let flag = true;

    if (policyObj.units === undefined) {
      flag = false;
      dispatch(
        showNotification({ message: "Dơn vị được để trống", status: 0 })
      );
    }
    if (policyObj.price < 0) {
      flag = false;
      dispatch(showNotification({ message: "Giá không hợp lệ", status: 0 }));
    }
    if (policyObj.serviceName === "") {
      flag = false;
      dispatch(
        showNotification({ message: "Tên không được để trống", status: 0 })
      );
    }

    if (flag) {
      const newServicePolicyObj = policyObj;
      dispatch(instertServicePolicy({ newServicePolicyObj }));
      dispatch(
        showNotification({
          message: "Thêm chính sách dịch vụ thành công",
          status: 1,
        })
      );
      closeRightDrawer();
    }
  };

  const [policyObj, setPolicyobObj] = useState(INIT_POLICY);
  //  const ItemSelect
  return (
    <div className="mt-4 h-[500px]">
      <SelectCompoment
        lable="Tên dịch vụ"
        updateType="serviceName"
        updateFormValue={updateFormValue} />
 
      <InputServicePricePolicy
        type="text"
        lable="Chi phí (VND)"
        unit="đ"
        updateType="price"
        updateFormValue={updateFormValue}
      />


      {/* button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => closeRightDrawer()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>
        <button
          onClick={handleInsretServicePolicy}
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}

export default CreatePolicyBodyRightDrawer;
