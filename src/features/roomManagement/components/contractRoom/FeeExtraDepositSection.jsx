import React from "react";
import InputGroup from "../../../../components/inputDrawRIght/InputGroup";
import InputArea from "../../../../components/inputDrawRIght/InputArea";
import { useDispatch, useSelector } from "react-redux";
import { updateContractRoomSlice } from "./contractRoomSlice";
import InputText from "../../../../components/inputDrawRIght/InputText";

export const FeeExtraDepositSection = () => {
  const dispatch = useDispatch();

  const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);

  const updateFormValue = ({ updateType, value, index }) => {
    let services = infoContractRoom.services.slice();
    services[index] = value;
    dispatch(
      updateContractRoomSlice({ ...infoContractRoom, services })
    );
  };
 
  // hàm cập nhật chỉ số cũ
  const updateOldNumber = ({ value, index }) => {
    let services = infoContractRoom.services.map(
      (service) => ({
        ...service,
      })
    );
    services[index].oldNumber = value;

    dispatch(
      updateContractRoomSlice({ ...infoContractRoom, services })
    );
  };

  const updateFormNote = ({ updateType, value, index }) => {
    const newOBJ = { ...infoContractRoom, [updateType]: value };
    dispatch(updateContractRoomSlice(newOBJ));
  };

  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Các khoản phụ thu
      </p>

      {infoContractRoom.services &&
        infoContractRoom.services.map((item, index) => (
          <div key={index}>
            {" "}
            <InputGroup
              updateType="services"
              updateFormValue={updateFormValue}
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
            {(item.serviceId === 42 || item.serviceId === 43) && (
              <InputText
                type="number"
                updateType="services"
                updateFormValue={updateOldNumber}
                lable="Chỉ số cũ "
                index={index}
                defaultValue={item.oldNumber}
              />
            )}
          </div>
        ))}

      <InputArea
        updateType="notePrivate"
        updateFormValue={updateFormNote}
        lable="Ghi chú nội bộ"
        defaultValue={infoContractRoom.note}
      />
      <div className="divider my-1"></div>
    </>
  );
};
