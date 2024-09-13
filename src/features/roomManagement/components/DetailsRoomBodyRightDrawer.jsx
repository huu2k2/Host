import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { FetchDetailsRoom } from "./service/FetchDetailsRoom";
import InputText from "../../../components/inputDrawRIght/InputText";
import SelectBankAPI from "../../leads/components/input/SelectBankAPI";
import { getBroker } from "../BrokerSlice";
import { formatPrice } from "../../../components/Input/Format";

function DetailsBrokerBodyRightDrawer({ closeRightDrawer, extraObject }) {

  const dispatch = useDispatch();
  const { Broker } = useSelector((state) => state.Broker);
  useEffect(() => {
    if (extraObject.depositId) {
      dispatch(getBroker(extraObject.depositId)); // Fetch broker details with the depositId
    }
  }, [dispatch, extraObject.depositId]);

  


  return (
    <div className="mt-4 h-screen">
      <div className="">
        <p className="text-lg py-5  font-medium text-rose-800 dark:text-white">
          Thông tin môi giới
        </p>

        <InputText
          format="fullName"
          updateType="fullName"
          defaultValue={Broker.FullName}

          lable="Họ và tên"
          disabled='false'
        />
        <InputText
          type="text"
          updateType="phoneNumber"
          defaultValue={Broker.Amount}
          lable="Số điện thoại"
          disabled='false'
        />
        <p className="text-lg py-5  font-medium text-rose-800 dark:text-white">
          Thông tin hợp đồng
        </p>
        <InputText
          type="text"
          updateType="phoneNumber"
          defaultValue={formatPrice(Broker.rentalPrice)}
          lable="Giá Thuê"
          disabled='false'
        />
        <InputText
          format="fullName"
          updateType="fullName"
          defaultValue= {"HĐ "+Broker.Month +" Tháng - Cọc "+ Broker.Deposit + " - Hoa Hồng " + Broker.Commission } 

          lable="Hợp đồng"
          disabled='false'
        />
        <InputText
          format="fullName"
          updateType="fullName"
          defaultValue={formatPrice(Broker.TotalDepositAmount)}

          lable="Hoa hồng"
          disabled='false'

        />
        <InputText
          format="fullName"
          updateType="fullName"
          // defaultValue={Broker.FullName}

          lable="Trạng thái"
          disabled='false'

        />
        <p className="text-lg py-5  font-medium text-rose-800 dark:text-white">
          Tài khoản ngân hàng
        </p>
        <InputText
          format="fullName"
          updateType="fullName"
          defaultValue={Broker.BankCode}

          lable="Tên ngân hàng"
          disabled='false'
        />
        <InputText
          format="fullName"
          updateType="fullName"
          defaultValue={Broker.AccountNumber}
          
          lable="Số tài khoản"
          disabled='false'
          />
        <InputText
          format="fullName"
          updateType="fullName"
          
          defaultValue={Broker.accountName}
          lable="Chủ tài khoản"
          disabled='false'
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={() => closeRightDrawer()}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
          >
            Huỷ
          </button>


        </div>
      </div>
    </div>
  );
}

export default DetailsBrokerBodyRightDrawer;
