import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";
import React from "react";
import ListFurniture from "./ListFurniture";
import { useDispatch } from "react-redux";
import { RIGHT_DRAWER_TYPES } from "../../../utils/globalConstantUtil";
import { openRightDrawer } from "../../common/rightDrawerSlice";
export const FurnitureSection = () => {
  const dispatch = useDispatch();

  const openRightDrawerCreateFurniture = () => {
    dispatch(
      openRightDrawer({
        header: "Thêm danh mục nội thất",
        content: "Vui lòng cập nhật thông tin dưới đây để thêm nội thất mới.",
        bodyType: RIGHT_DRAWER_TYPES.CREATE_FURNITURE,
      })
    );
  };
  return (
    <>
      <div className="flex justify-between">
        <p className="text-lg leading-6 font-medium text-gray-900">
          Danh mục nội thất
        </p>
        <button
          onClick={openRightDrawerCreateFurniture}
          className="w-24 h-7 pr-2.5 py-1.5 bg-rose-600 hover:bg-rose-500  rounded justify-center items-center gap-2 inline-flex"
        >
          <PlusSmallIcon className="w-4 h-4 relative text-white" />
          <div className="text-center text-white text-xs font-medium">
            Nội thất
          </div>
        </button>
      </div>

      <ListFurniture />
    </>
  );
};
