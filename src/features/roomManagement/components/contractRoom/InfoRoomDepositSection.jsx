import React, { useEffect, useState } from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import InputFile from "../../../../components/inputDrawRIght/InputFile";
import InputSelect from "../../../../components/inputDrawRIght/InputSelect";
import InputPrice from "../../../../components/inputDrawRIght/InputPrice";
import { useDispatch, useSelector } from "react-redux";
import { updateContractRoomSlice } from "./contractRoomSlice";
import moment from "moment";
import { showNotification } from "../../../common/headerSlice";

export const InfoRoomDepositSection = ({ extraObject }) => {
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);
  const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);

  const updateFormValue = ({ updateType, value, index }) => {
    const newOBJ = { ...infoContractRoom, [updateType]: value };

    if (updateType === "rentalStartDate") {
      if (moment(newOBJ.rentalStartDate).isAfter(moment(newOBJ.depositDate))) {
        // Nếu đúng, dispatch hành động cập nhật deposit room slice với newOBJ
        dispatch(updateContractRoomSlice(newOBJ));
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
    dispatch(updateContractRoomSlice(newOBJ));
  };
  const options = [
    {
      value: 1,
      label: `HĐ ${infoContractRoom?.commissionPolicy?.month} Tháng - 
              Cọc ${infoContractRoom?.commissionPolicy?.deposit} - 
              Hoa Hồng ${infoContractRoom?.commissionPolicy?.commission}`,
    },
  ];

  const defaultValue = infoContractRoom.commissionPolicyId
    ? `HĐ ${infoContractRoom?.commissionPolicy?.month} Tháng - 
     Cọc ${infoContractRoom?.commissionPolicy?.deposit} - 
     Hoa Hồng ${infoContractRoom?.commissionPolicy?.commission}`
    : "";

  //  xư lý ngu, vì cái cũ ko ăn :)
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(moment(infoContractRoom.contractEndDate).format(
      "YYYY-MM-DD"
    ));
  }, [infoContractRoom.contractEndDate]);
  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType:'contractEndDate', value: val });
  };
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
        updateType="rentalPrice"
        defaultValue={infoContractRoom.rentalPrice}
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
        defaultValue={infoContractRoom.rentalTerm}
      />
      {infoContractRoom.commissionPolicyId && (
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
        updateFormValue={updateFormValue}
        lable="Ngày đặt cọc"
        defaultValue={moment(infoContractRoom.depositDate).format("YYYY-MM-DD")}
      />

      <InputPrice
        unit="đ"
        updateType="totalDepositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc giữ phòng"
        defaultValue={infoContractRoom.totalDepositAmount}
      />
      <InputPrice
        unit="đ"
        updateType="depositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc trước"
        defaultValue={infoContractRoom.depositAmount}
      />

      <InputPrice
        unit="đ"
        updateType="additionalDepositAmount"
        updateFormValue={updateFormValue}
        lable="Số tiền cọc bổ sung"
        defaultValue={
          infoContractRoom.totalDepositAmount -
            infoContractRoom.depositAmount >=
          0
            ? infoContractRoom.totalDepositAmount -
              infoContractRoom.depositAmount
            : infoContractRoom.additionalDepositAmount
        }
        disabled={true}
      />

      <InputDate
        updateType="depositPaymentDeadline"
        updateFormValue={updateFormValue}
        lable="Hạn thanh toán tiền cọc"
        defaultValue={moment(infoContractRoom.depositPaymentDeadline).format(
          "YYYY-MM-DD"
        )}
      />

      <InputDate
        updateType="rentalStartDate"
        updateFormValue={updateFormValue}
        lable="Ngày bắt đầu cho thuê"
        defaultValue={moment(infoContractRoom.rentalStartDate).format(
          "YYYY-MM-DD"
        )}
      />
      {/* <InputDate
        updateType="contractEndDate"
        defaultValue={moment(infoContractRoom.contractEndDate).format(
          "YYYY-MM-DD"
        )}
        updateFormValue={updateFormValue}
        lable="Ngày kết thúc hợp đồng"
      /> */}
      <div className="flex justify-between items-center mb-5">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Ngày kết thúc hợp đồng
        </p>
        <div
          className={`relative w-80 shadow border border-gray-300 rounded-md `}
        >
          <input
            value={value}
            onChange={(e) => updateInputValue(e.target.value)}
            type="date"
            className={` border-gray-300 text-gray-900 text-sm rounded-lg block w-full   p-2.5 `}
            placeholder="Chọn ngày"
          />
        </div>
      </div>

      <InputText
        type="number"
        updateType="numberOfPeople"
        updateFormValue={updateFormValue}
        lable="Số lượng người ở"
        defaultValue={infoContractRoom.numberOfPeople}
      />

      <InputText
        type="number"
        updateType="numberOfVehicle"
        updateFormValue={updateFormValue}
        lable="Số lượng xe"
        defaultValue={infoContractRoom.numberOfVehicle}
      />

      <InputText
        lable="Chương trình ưu đãi"
        updateType="chuongTrinhUuDai"
        disabled={true}
      />
      <div className="divider my-1"></div>
    </>
  );
};
