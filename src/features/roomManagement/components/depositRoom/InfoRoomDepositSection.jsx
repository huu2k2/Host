import React from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import InputPrice from "../../../../components/inputDrawRIght/InputPrice";
import InputSelect from "../../../../components/inputDrawRIght/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { updateDepositRoomSlice } from "./depositRoomSlice";
import moment from "moment";
import { showNotification } from "../../../common/headerSlice";
export const InfoRoomDepositSection = ({ extraObject }) => {
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);
  const { infoDepositRoom } = useSelector((state) => state.depositRoomSlice);
  // Hàm cập nhật giá trị biểu mẫu
  const updateFormValue = ({ updateType, value, index }) => {
    // Tạo một đối tượng mới từ infoDepositRoom và cập nhật trường updateType với giá trị mới
    const newOBJ = {
      ...infoDepositRoom,
      [updateType]: value,
    };
    if (updateType === "rentalStartDate") {
      if (moment(newOBJ.rentalStartDate).isAfter(moment(newOBJ.depositDate)) || moment(newOBJ.rentalStartDate).isSame(moment(newOBJ.depositDate))) {
        // Nếu đúng, dispatch hành động cập nhật deposit room slice với newOBJ
        dispatch(updateDepositRoomSlice(newOBJ));
      } else {
        // Nếu không đúng, hiển thị thông báo lỗi
        dispatch(
          showNotification({
            message: "Ngày bắt đầu cho thuê phải lớn hơn ngày đặt cọc!",
            status: 0,
          })
        );
      }
    }
    dispatch(updateDepositRoomSlice(newOBJ));
  };
  const options = [
    {
      value: 1,
      label: `HĐ ${infoDepositRoom?.commissionPolicy?.month} Tháng - 
              Cọc ${infoDepositRoom?.commissionPolicy?.deposit} - 
              Hoa Hồng ${infoDepositRoom?.commissionPolicy?.commission}`,
    },
  ];

  const defaultValue = infoDepositRoom.commissionPolicyId
    ? `HĐ ${infoDepositRoom?.commissionPolicy?.month} Tháng - 
     Cọc ${infoDepositRoom?.commissionPolicy?.deposit} - 
     Hoa Hồng ${infoDepositRoom?.commissionPolicy?.commission}`
    : "";
  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Thông tin căn hộ
      </p>

      <InputText
        lable="Địa chỉ toà nhà"
        disabled={true}
        defaultValue={selectedHome.name}
      />

      <InputText
        lable="Mã phòng"
        disabled={true}
        defaultValue={extraObject.roomCode}
      />

      <InputPrice
        unit="đ"
        defaultValue={infoDepositRoom.rentalPrice}
        updateType="rentalPrice"
        updateFormValue={updateFormValue}
        lable="Giá cho thuê"
        lable1="(Chưa bao gồm nội thất)"
      />

      <InputText
        type="number"
        updateType="rentalTerm"
        updateFormValue={updateFormValue}
        lable="Thời hạn thuê"
        unit="Tháng"
        defaultValue={infoDepositRoom.rentalTerm}
      />
      {infoDepositRoom.commissionPolicyId && (
        <InputSelect
          defaultValue={defaultValue}
          lable={"Đặt cọc"}
          options={options}
          updateFormValue={updateFormValue}
          updateType={"commissionPolicy"}
          disabled={true}
        />
      )}
      <InputDate
        updateType="depositDate"
        defaultValue={moment(infoDepositRoom.depositDate).format("YYYY-MM-DD")}
        updateFormValue={updateFormValue}
        lable="Ngày đặt cọc"
      />
      <InputPrice
        unit="đ"
        updateType="totalDepositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc giữ phòng"
        defaultValue={infoDepositRoom.totalDepositAmount}
      />
      <InputPrice
        unit="đ"
        updateType="depositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc trước"
        defaultValue={infoDepositRoom.depositAmount}
      />

      <InputPrice
        unit="đ"
        updateType="additionalDepositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc bổ sung"
        defaultValue={
          infoDepositRoom.totalDepositAmount - infoDepositRoom.depositAmount >= 0
            ? infoDepositRoom.totalDepositAmount - infoDepositRoom.depositAmount
            : infoDepositRoom.additionalDepositAmount
        }
        disabled={true}
      />

      <InputDate
        updateType="depositPaymentDeadline"
        defaultValue={moment(infoDepositRoom.depositPaymentDeadline).format(
          "YYYY-MM-DD"
        )}
        updateFormValue={updateFormValue}
        lable="Hạn thanh toán tiền cọc"
      />

      <InputDate
        updateType="rentalStartDate"
        defaultValue={moment(infoDepositRoom.rentalStartDate).format(
          "YYYY-MM-DD"
        )}
        updateFormValue={updateFormValue}
        lable="Ngày bắt đầu cho thuê"
      />

      <InputText
        type="number"
        updateType="numberOfPeople"
        updateFormValue={updateFormValue}
        lable="Số lượng người ở"
        defaultValue={infoDepositRoom.numberOfPeople}
      />

      <InputText
        type="number"
        updateType="numberOfVehicle"
        updateFormValue={updateFormValue}
        lable="Số lượng xe"
        defaultValue={infoDepositRoom.numberOfVehicle}
      />

      <InputText
        lable="Chương trình ưu đãi"
        updateType="chuongTrinhUuDai"
        disabled={true}
        updateFormValue={updateFormValue}
        defaultValue={""}
      />
      <div className="divider my-1"></div>
    </>
  );
};
