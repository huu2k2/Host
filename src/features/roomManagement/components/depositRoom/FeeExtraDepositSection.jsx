import React from "react";
import InputGroup from "../../../../components/inputDrawRIght/InputGroup";
import InputArea from "../../../../components/inputDrawRIght/InputArea";
import { useDispatch, useSelector } from "react-redux";
import { updateDepositRoomSlice } from "./depositRoomSlice";

export const FeeExtraDepositSection = () => {
  const dispatch = useDispatch();

  const { infoDepositRoom } = useSelector((state) => state.depositRoomSlice);


  const updateFormValue = ({ updateType, value, index }) => {
    let services = infoDepositRoom.services.slice();
    services[index] = value;
    dispatch(updateDepositRoomSlice({ ...infoDepositRoom, services }));
  };

  const updateFormNote = ({ updateType, value, index }) => {
    const newOBJ = { ...infoDepositRoom, [updateType]: value };
    dispatch(updateDepositRoomSlice(newOBJ));
  };

  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Các khoản phụ thu
      </p>

      {infoDepositRoom.services.map((item, index) => (
        <InputGroup
          updateType="services"
          updateFormValue={updateFormValue}
          key={index}
          index={index}
          lable={item.serviceName}
          item={{
            serviceName: item.serviceName,
            option: item.dvt,
            price: item.servicePrice,
            units: [item.dvt],
            serviceId: item.serviceId,
          }}
        />
      ))}

      <InputArea
        updateType="notePrivate"
        updateFormValue={updateFormNote}
        lable="Ghi chú nội bộ"
        defaultValue={infoDepositRoom.notePrivate}
      />
      <div className="divider my-1"></div>
    </>
  );
};
