import React, { useCallback, useEffect, useState } from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import { postCCCD } from "../depositRoom/apiGetInfoFormCCCD";
import CCCD from "./CCCD";

export const InfoCustomerDepositSection = ({
  updateFormValue,
  updateFormValue1,
  updateFormVehicleValue,
  handleDeleteObjCustomer,
  handleAddVehicleCustomer,
  handleDeleteObjVehicle,
  customersObj,
  index,
  item,
  disabled = false,
  isShowCCCd,
}) => {
  const [value,setValue] = useState('')
  useEffect(() => {
    setValue(customersObj[index]?.dateRange?.split("T")[0] || "");
  }, [customersObj[index]]);
  // CCCD

  const convertDate = (dateStr) => {
    const [month, day, year] = dateStr.split("/"); // Split the date by "/"
    const formattedDate = `${year}-${month}-${day}`; // Reformat to "YYYY-MM-DD"
    const isoString = new Date(formattedDate).toISOString();
    return isoString
  };

  const [getCCCD, setCCCD] = useState({ mt: "", ms: "" });

  const [isLoading, setIsLoading] = useState(false);

  const fetchCCCDInfo = useCallback(async () => {
    if (getCCCD.mt && getCCCD.ms) {
      setIsLoading(true);
      try {
        const kq = await postCCCD({
          iD_Front: getCCCD.mt,
          iD_Back: getCCCD.ms,
        });

        const newInfo = {
          fullName: kq.result.name,
          birthOfDay: convertDate(kq.result.dob),
          identification: kq.result.id,
          dateRange: convertDate(kq.result.issue_date),
          issuedBy: kq.result.issue_loc,
          permanentAddress: kq.result.address,
          beforeIdentificationBase64:getCCCD.mt,
          afterIdentificationBase64:getCCCD.ms
        };
        console.log("newInfo",newInfo)
        updateFormValue1(newInfo,index);
 
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [getCCCD]);

  useEffect(() => {
    fetchCCCDInfo();
  }, [getCCCD, fetchCCCDInfo]);
 
  return (
    <>
      <p className="text-lg py-5 font-medium text-rose-800 dark:text-white">
        Thông tin khách hàng {index + 1}
      </p>

      <InputText
        lable="Họ tên"
        format="fullName"
        updateType="fullName"
        // updateFormValue={updateFormValue}
        defaultValue={customersObj[index].fullName}
        index={index}
        disabled={disabled}
      />

      <InputText
        type="text"
        lable="Số điện thoại"
        updateType="phoneNumber"
        updateFormValue={updateFormValue}
        defaultValue={customersObj[index].phoneNumber}
        index={index}
        disabled={!isShowCCCd}
      />

      <InputText
        type="text"
        lable="CCCD/CMND"
        updateType="identification"
        // updateFormValue={updateFormValue}
        index={index}
        defaultValue={customersObj[index].identification}
        disabled={disabled}
      />

      <InputDate
        defaultValue={value}
        lable={"Ngày cấp"}
        updateType="dateRange"
        // updateFormValue={updateFormValue}
        index={index}
        disabled={disabled}
      />
      <InputText
        type="text"
        lable="Nơi cấp"
        updateType="issuedBy"
        // updateFormValue={updateFormValue}
        index={index}
        defaultValue={customersObj[index].issuedBy}
        disabled={disabled}
      />
      {isLoading && (
        <span className="loading loading-spinner text-neutral"></span>
      )}
      <CCCD
        title="CCCD"
        title2="(Mặt trước)"
        defaultValue={item.beforeIdentificationUrl || ""}
        setCCCD={setCCCD}
        updateType="beforeIdentificationBase64"
        disabled
      />
      <CCCD
        title="CCCD"
        title2="(Mặt sau)"
        defaultValue={item.afterIdentificationUrl || ""}
        setCCCD={setCCCD}
        updateType="afterIdentificationBase64"
        disabled
      />

      <button
        onClick={() => {
          handleAddVehicleCustomer(index);
        }}
        className="float-right h-7 pr-2.5 py-1.5 bg-rose-600 hover:bg-rose-500  rounded justify-center items-center gap-2 inline-flex"
      >
        <PlusSmallIcon className="w-4 h-4 relative text-white" />
        <div className=" text-center text-white text-xs font-medium">
          Thêm xe
        </div>
      </button>

      {item?.vehicles?.map((vehicle, indexVehicle) => {
        return (
          <div key={indexVehicle}>
            <div className="flex ">
              <p className="text-lg font-normal text-rose-800 dark:text-white">
                Thông tin xe {indexVehicle + 1}
              </p>
            </div>
            <InputText
              lable="Loại xe"
              updateType="type"
              updateFormValue={updateFormVehicleValue}
              index={index}
              index2={indexVehicle}
              defaultValue={customersObj[index].vehicles[indexVehicle].type}
            />

            <InputText
              lable="Biển số xe"
              updateType="licensePlates"
              updateFormValue={updateFormVehicleValue}
              index={index}
              index2={indexVehicle}
              defaultValue={
                customersObj[index].vehicles[indexVehicle].licensePlates
              }
              format="upCase"
            />

            <div className="text-right">
              <button
                className="text-right btn w-80 bg-rose-50 text-rose-700 border-none hover:bg-rose-200"
                onClick={() => handleDeleteObjVehicle(index, indexVehicle)}
              >
                <TrashIcon className="w-5 mx-2" />
                Xoá xe
              </button>
            </div>
          </div>
        );
      })}

      {isShowCCCd &&  <button
        className="mt-2 btn w-full bg-rose-50 text-rose-700 border-none hover:bg-rose-200"
        onClick={() => handleDeleteObjCustomer(index)}
      >
        <TrashIcon className="w-5 mx-2" />
        Xoá khách hàng
      </button>}
     

      <div className="divider my-1"></div>
    </>
  );
};
