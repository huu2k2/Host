import React, { useState } from "react";
import InputTextServicePolicy from "./input/InputTextServicePolicy";
import { insertFurniture } from "./NewHomeSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import InputPriceServicePolicy from "./input/InputPriceServicePolicy";
import SelectCompoment from "./SelectCompoment";

function CreateFurnituresBodyRightDrawer({ closeRightDrawer }) {
  const dispatch = useDispatch();

  const INIT_FURNITURE = {
    furnitureName: "",
    price: null,
    isActived: true,
    isRemove:true
  };

  const [furnitureObj, setFurnitureObj] = useState(INIT_FURNITURE);

  const updateFormValue = ({ updateType, value }) => {
    setFurnitureObj({ ...furnitureObj, [updateType]: value });
  };

  const handleInsretFurniture = () => {
    let flag = true;
    if (furnitureObj.price < 0) {
      flag = false;
      dispatch(showNotification({ message: "Giá không hợp lệ", status: 0 }));
    }
    if (furnitureObj.furnitureName === "") {
      flag = false;
      dispatch(
        showNotification({ message: "Tên không được để trống", status: 0 })
      );
    }
    if (flag) {
      const newFurnitureObj = {
        ...furnitureObj,
        isActived: true,
        price: furnitureObj.price ? furnitureObj.price : 0,
        isRemove:true
      };
      dispatch(insertFurniture({ newFurnitureObj }));
      dispatch(
        showNotification({
          message: "Thêm nội thất thành công",
          status: 1,
        })
      );
      closeRightDrawer();
    }
  };

  return (
    <div className="mt-4 h-[500px]">
      <SelectCompoment
        lable="Tên nội thất"
        updateType="furnitureName"
        updateFormValue={updateFormValue}
      />
      <InputPriceServicePolicy
        type="text"
        lable="Chi phí (VND)"
        unit="đ"
        updateType="price"
        updateFormValue={updateFormValue}
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={() => closeRightDrawer()}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
        >
          Huỷ
        </button>
        <button
          onClick={handleInsretFurniture}
          type="button"
          className=" text-white bg-rose-600 border border-rose-600 focus:outline-none hover:bg-rose-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 ml-4"
        >
          Thêm
        </button>
      </div>
    </div>
  );
}

export default CreateFurnituresBodyRightDrawer;
