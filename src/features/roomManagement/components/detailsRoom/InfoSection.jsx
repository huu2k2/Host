import React from "react";
import { formatPrice } from "../../../../components/Input/Format";
import { formatStatusRoom } from "../../../../components/format/formatStatusRoom";

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
export const InfoSection = ({ detailsRoom }) => {
 
  return (
    <div>
      <div className="text-rose-800 text-base font-medium leading-normal my-4">
        Thông tin phòng
      </div>
      <RowInfo label="Loại phòng" value={detailsRoom.category} />
      <RowInfo label="Loại tầng" value={`Tầng ${detailsRoom.floor ? detailsRoom.floor : 'G'}`} />
      <RowInfo
        label="Giá thuê (VNĐ)"
        value={`${formatPrice(detailsRoom.rentPrice)}đ`}
      />
      <RowInfo
        label="Đặt cọc (VNĐ)"
        value={`${formatPrice(detailsRoom.depositAmount)}đ`}
      />
      <RowInfo label="Tiền nợ (VNĐ)" value={`${formatPrice(detailsRoom.debtPrice)}đ`} />
      <RowInfo label="Số lượng người" value={detailsRoom.numberOfPeople || "0"} />
      <RowInfo label="Số lượng xe" value={detailsRoom.numberOfVehicle || "0"} />
      <RowInfo label="Tình trạng" value={formatStatusRoom(detailsRoom.status) || "-"} />
    </div>
  );
};