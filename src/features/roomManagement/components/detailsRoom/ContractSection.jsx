import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "../../../../components/Input/Format";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openRightDrawer } from "../../../common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../../../../utils/globalConstantUtil";
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

export const ContractSection = ({ detailsRoom }) => {
  const dispatch = useDispatch();

  const openRightDrawerContractRoom = (
    roomId,
    roomCode,
    rentPrice,
    contractId,
    depositId
  ) => {
    dispatch(
      openRightDrawer({
        header: `Tạo hợp đồng khách thuê`,
        content: "Vui lòng nhập các thông tin dưới đây để lên hợp đồng.",
        bodyType: RIGHT_DRAWER_TYPES.CONTRACT_ROOM,
        extraObject: {
          roomId,
          roomCode,
          rentPrice,
          contractId,
          depositId,
        },
      })
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-rose-800 text-base font-medium leading-normal my-5">
          Hợp đồng thuê
        </div>

        <div className="inline-flex rounded-md shadow" role="group">
          <button
            onClick={() => {
              openRightDrawerContractRoom(
                detailsRoom.roomID,
                detailsRoom.roomCode,
                detailsRoom.rentPrice,
                detailsRoom.contractId,
                detailsRoom.depositId
              );
            }}
            type="button"
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-l-md hover:bg-rose-300"
          >
            <PencilIcon className="text-gray-500 w-4 " />
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-r-md hover:bg-rose-300"
          >
            <ArrowUpTrayIcon className="text-gray-500 w-4 " />
          </button>
        </div>
      </div>
      <RowInfo label="Tên khách hàng" value={detailsRoom.fullNameRent || "-"} />
      <RowInfo
        label="Số điện thoại"
        value={detailsRoom.phoneNumberRent || "-"}
      />
      <RowInfo
        label="Giá thuê (VNĐ)"
        value={`${formatPrice(detailsRoom.rentPrice ? detailsRoom.rentPrice : 0)}đ`}
      />
      <RowInfo
        label="Số tiền cọc (VNĐ)"
        value={`${formatPrice(detailsRoom.depositAmountRental)}đ`}
      />
      <RowInfo
        label="Ngày bắt đầu"
        value={detailsRoom.rentalStartDateRental ?
          moment(detailsRoom.rentalStartDateRental).format("DD-MM-YYYY") : "-"
        }
      />
      <RowInfo
        label="Ngày kết thúc"
        value={detailsRoom.contractEndDate ? moment(detailsRoom.contractEndDate).format("DD-MM-YYYY") : "-"}
      />
      <RowInfo label="Ghi chú" value="-" />
    </div>
  );
};
