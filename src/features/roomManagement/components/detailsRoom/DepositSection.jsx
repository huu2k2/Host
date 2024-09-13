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
export const DepositSection = ({ detailsRoom }) => {

  const dispatch = useDispatch();

  const openRightDrawerDepositRoom = (
    roomId,
    roomCode,
    rentPrice,
    depositId
  ) => {
    dispatch(
      openRightDrawer({
        header: `Tạo hợp đồng cọc giữ chỗ`,
        content: "Vui lòng điền thông tin dưới đây để lên hợp đồng",
        bodyType: RIGHT_DRAWER_TYPES.DEPOSIT_ROOM,
        extraObject: {
          roomId,
          roomCode,
          rentPrice,
          depositId,
        },
      })
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-rose-800 text-base font-medium leading-normal my-5">
          Đặt cọc
        </div>

        <div className="inline-flex rounded-md shadow" role="group">
          <button
            onClick={() => {
              openRightDrawerDepositRoom(
                detailsRoom.roomID,
                detailsRoom.roomCode,
                detailsRoom.rentPrice,
                detailsRoom.depositIds
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
      <RowInfo
        label="Tên khách hàng"
        value={detailsRoom.fullNameDeposit || "-"}
      />
      <RowInfo
        label="Số điện thoại"
        value={detailsRoom.phoneNumberDeposit || "-"}
      />
      <RowInfo
        label="Giá thuê (VNĐ)"
        value={`${formatPrice(detailsRoom.rentPrice)}đ`}
      />
      <RowInfo
        label="Số tiền cọc (VNĐ)"
        value={`${formatPrice(detailsRoom.depositAmount)}đ`}
      />
      <RowInfo
        label="Ngày cọc"
        value={detailsRoom.depositDateDeposit?
          moment(detailsRoom.depositDateDeposit).format("DD-MM-YYYY") : "-"
        }
      />
      <RowInfo
        label="Ngày dự kiến vào ở"
        value={
          detailsRoom.rentalStartDateDeposit
            ? moment(detailsRoom.rentalStartDateDeposit).format("DD-MM-YYYY")
            : "-"
        }
      />
      <RowInfo label="Ghi chú" value="-" />
    </div>
  );
};
