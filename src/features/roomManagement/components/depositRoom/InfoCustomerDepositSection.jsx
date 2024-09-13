import React, { useEffect, useState, useCallback } from "react";
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import { useDispatch, useSelector } from "react-redux";
import { updateDepositRoomSlice } from "./depositRoomSlice";
import moment from "moment";
import { openModal } from "../../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../../utils/globalConstantUtil";
import { parse, format } from "date-fns";
import CCCD from "./CCCD";
import { postCCCD } from "./apiGetInfoFormCCCD";
import Signature from "./Signature";

export const InfoCustomerDepositSection = () => {
  const dispatch = useDispatch();
  const { infoDepositRoom } = useSelector((state) => state.depositRoomSlice);

  const [InfoCCCD, setInfoCCCD] = useState({
    fullName: "",
    birthOfDay: "",
    identification: "",
    dateRange: "",
    issuedBy: "",
    permanentAddress: "",
  });

  const [getCCCD, setCCCD] = useState({ mt: "", ms: "" });
  const [isLoading, setIsLoading] = useState(false);

  const updateFormValue = useCallback(({ updateType, value }) => {
    const hasEmptyValue = Object.values(InfoCCCD).some(value => value === "");
    let newOBJ = { ...infoDepositRoom, [updateType]: value };
    if(!hasEmptyValue){
      const val={...newOBJ,...InfoCCCD}
      console.log("newOBJ",val)
      dispatch(updateDepositRoomSlice(val));
    }
  }, [infoDepositRoom, dispatch]);

  const openModalSign = () => {
    dispatch(
      openModal({
        title: "Tạo chữ kí",
        bodyType: MODAL_BODY_TYPES.SIGNATURE,
        extraObject: {
          callBack: (data) => {
            const newOBJ = { ...infoDepositRoom, signature: data };
            dispatch(updateDepositRoomSlice(newOBJ));
          },
        },
      })
    );
  };

  const convertDate = (dateString) => {
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return format(parsedDate, "yyyy-MM-dd");
  };

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
        };
        setInfoCCCD(newInfo);
        Object.keys(newInfo).forEach((key) => {
          updateFormValue({ updateType: key, value: newInfo[key] });
        });
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
        Thông tin khách hàng
      </p>

      <InputText
        lable="Họ và tên"
        defaultValue={InfoCCCD.fullName || infoDepositRoom.fullName}
        disabled
      />

      <InputText
        type="text"
        updateType="phoneNumber"
        updateFormValue={updateFormValue}
        lable="Số điện thoại"
        defaultValue={infoDepositRoom.phoneNumber}
         
      />

      <InputDate
        updateType="birthOfDay"
        lable="Ngày sinh"
        defaultValue={
          InfoCCCD.birthOfDay ||
          moment(infoDepositRoom.birthOfDay).format("YYYY-MM-DD")
        }
        disabled
      />

      <InputText
        type="text"
        updateType="identification"
        lable="CCCD/CMND"
        defaultValue={InfoCCCD.identification || infoDepositRoom.identification}
        disabled
      />

      <InputDate
        updateType="dateRange"
        lable="Ngày cấp"
        defaultValue={
          InfoCCCD.dateRange ||
          moment(infoDepositRoom.dateRange).format("YYYY-MM-DD")
        }
        disabled
      />

      <InputText
        updateType="issuedBy"
        lable="Nơi cấp"
        defaultValue={InfoCCCD.issuedBy || infoDepositRoom.issuedBy}
        disabled
      />

      <InputText
        updateType="permanentAddress"
        lable="Địa chỉ thường trú"
        defaultValue={
          InfoCCCD.permanentAddress || infoDepositRoom.permanentAddress
        }
        disabled
      />

      {isLoading && (
        <span className="loading loading-spinner text-neutral"></span>
      )}
  {!infoDepositRoom.commissionPolicyId && !infoDepositRoom.commissionPolicy &&(<>
    <CCCD
        title="CCCD"
        title2="(Mặt trước)"
        defaultValue={infoDepositRoom.beforeIdentificationUrl}
        setCCCD={setCCCD}
        updateFormValue={updateFormValue}
        updateType="beforeIdentificationBase64"
      />
      <CCCD
        title="CCCD"
        title2="(Mặt sau)"
        defaultValue={infoDepositRoom.afterIdentificationUrl}
        setCCCD={setCCCD}
        updateFormValue={updateFormValue}
        updateType="afterIdentificationBase64"
      />
  </>)}
      
      <Signature
        title="Chữ ký"
        openModalSign={openModalSign}
        defaultValue={infoDepositRoom.signature}
        updateFormValue={updateFormValue}
        updateType="signature"
      />
      <div className="divider my-1"></div>
    </>
  );
};
