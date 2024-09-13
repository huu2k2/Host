import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { openRightDrawer } from "../../../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../../../utils/globalConstantUtil";
import { showNotification } from "../../../common/headerSlice";

const RowInfo = ({ label, value }) => {
  return (
    <>
      <div className="w-full justify-between items-center inline-flex">
        <div className="text-gray-500 text-sm font-medium leading-tight">
          {label}
        </div>
        <div className="text-right text-gray-900 text-sm font-medium  leading-tight">
          {value}
        </div>
      </div>
      <div className="divider my-1"></div>
    </>
  );
};
export const InfoCustomerSection = ({ detailsRoom }) => {
  const dispatch = useDispatch();

  const openRightDrawerAddCustomer = (
    roomId,
    contractId,
    numberOfResidents
  ) => {
    if (contractId === null) {
      dispatch(
        showNotification({ message: "Phòng chưa có hợp đồng", status: 0 })
      );
    } else {
      dispatch(
        openRightDrawer({
          header: `Thêm khách hàng`,
          content: "Vui lòng điền thông tin dưới đây để thêm khách hàng",
          bodyType: RIGHT_DRAWER_TYPES.ADD_CUSTOMER,
          extraObject: { roomId, contractId, numberOfResidents },
        })
      );
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-rose-800 text-base font-medium leading-normal my-5">
          Thông tin khách thuê
        </div>

        <button
        onClick={() => {openRightDrawerAddCustomer(
          detailsRoom.roomID,
          detailsRoom.contractId,
          detailsRoom.numberOfPeople
        )}}
          type="button"
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-rose-300"
        >
          <PencilIcon className="text-gray-500 w-4 " />
        </button>
      </div>
      <RowInfo
        label="Số lượng người ở"
        value={detailsRoom.numberOfPeople || "0"}
      />
      <RowInfo
        label="Số lượng người xe"
        value={detailsRoom.numberOfVehicle || "0"}
      />
    </div>
  );
};
