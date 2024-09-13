import React, { useEffect, useState } from "react";
import MutiSelect from "./input/MutiSelect";
import InputSelect from "./input/InputSelect";
import InputArea from "./input/InputArea";
import InputText from "./input/InputText";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommissionPolicies,
  instertCommissionPolicies,
  updateBrokerage,
} from "./NewHomeSlice";
import { PlusSmallIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ListPolicyBrokeage } from "./ListPolicyBrokeage";
import { showNotification } from "../../common/headerSlice";
import { useLocation } from "react-router-dom";

const convertToISOStartOfDay = (dateString) => {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây về 0
  return date.toISOString();
};
const convertISOToDateInput = (isoString) => {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const PolicyBrokerage = () => {
  const dispatch = useDispatch();
  const { brokerage } = useSelector((state) => state.newHome);
  const [toggle, settoggle] = useState(brokerage.isAgency);
  const [isExclusive, setIsExclusive] = useState(brokerage.isExclusive);

  useEffect(() => {
    settoggle(brokerage.isAgency);
    setIsExclusive(brokerage.isExclusive);
  }, [brokerage]);

  const updateToggle = () => {
    const newBrokerageObj = { ...brokerage, isAgency: !toggle };
    dispatch(updateBrokerage({ newBrokerageObj }));
    settoggle(!toggle);
  };

  const updateExclusive = (e) => {
    const newBrokerageObj = {
      ...brokerage,
      isExclusive: !brokerage.isExclusive,
    };
    dispatch(updateBrokerage({ newBrokerageObj }));
    setIsExclusive(e.target.id === "inline-checked-radio");
  };

  const updateFormValue = ({ updateType, value }) => {
    const newBrokerageObj = { ...brokerage, [updateType]: value };
    dispatch(updateBrokerage({ newBrokerageObj }));
  };

  const handeInsertCommissionPolicies = () => {
    dispatch(instertCommissionPolicies());
    dispatch(
      showNotification({
        message: "Thêm hợp đồng thành công",
        status: 1,
      })
    );
  };
  const location = useLocation();
  const isCorrectPath = location.pathname === "/app/homemanagement/createHome";

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg leading-6 font-medium text-gray-900">
          Chính sách môi giới
        </p>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onChange={() => {
              updateToggle();
            }}
            checked={toggle}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
        </label>
      </div>

      {toggle && (
        <div className="duration-1s">
          <div className="flex flex-row-reverse mt-6">
            <button
              onClick={handeInsertCommissionPolicies}
              className=" w-24 h-7 pr-2.5 py-1.5 bg-rose-600 hover:bg-rose-500  rounded justify-center items-center gap-2 inline-flex"
            >
              <PlusSmallIcon className="w-4 h-4 relative text-white" />
              <div className="text-center text-white text-xs font-medium">
                Hợp đồng
              </div>
            </button>
          </div>

          {/* chõ sẽ thêm list hợp đồng */}
          <ListPolicyBrokeage updateFormValue={updateFormValue} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InputSelect
              updateType="numberOfVehicle"
              updateFormValue={updateFormValue}
              options={[
                { value: 0, label: "Không giới hạn" },
                { value: 1, label: "1 xe" },
                { value: 2, label: "2 xe" },
                { value: 3, label: "3 xe" },
                { value: 4, label: "4 xe" },
              ]}
              lable="Số lượng xe"
              defaultValue={[
                {
                  value: brokerage.numberOfVehicle,
                  label:
                    brokerage?.numberOfVehicle === 0 ||
                    brokerage?.numberOfVehicle === null ||
                    brokerage.numberOfVehicle === undefined
                      ? "Không giới hạn"
                      : `${brokerage?.numberOfVehicle} xe`,
                },
              ]}
            />

            <InputSelect
              updateType="numberOfPeople"
              updateFormValue={updateFormValue}
              options={[
                { value: 0, label: "Không giới hạn" },
                { value: 1, label: "1 người" },
                { value: 2, label: "2 người" },
                { value: 3, label: "3 người" },
                { value: 4, label: "4 người" },
              ]}
              lable="Số lượng người"
              defaultValue={[
                {
                  value: brokerage.numberOfPeople,
                  label:
                    brokerage.numberOfPeople === 0 ||
                    brokerage.numberOfPeople === null ||
                    brokerage.numberOfPeople === undefined
                      ? "Không giới hạn"
                      : `${brokerage.numberOfPeople} người`,
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
            <InputArea
              updateFormValue={updateFormValue}
              defaultValue={brokerage.note}
              updateType="note"
              lable="Ghi chú"
            />
          </div>
          <div className="grid grid-cols-1   gap-6 mt-6">
            <InputSelect
              updateFormValue={updateFormValue}
              updateType="numberOfDaysKeepRoom"
              options={[
                { value: 1, label: "1 Ngày" },
                { value: 3, label: "3 Ngày" },
                { value: 5, label: "5 Ngày" },
                { value: 7, label: "7 Ngày" },
                { value: 10, label: "10 Ngày" },
              ]}
              lable="Giữ phòng tối đa"
              defaultValue={[
                {
                  value: brokerage.numberOfDaysKeepRoom || 1,
                  label:
                    brokerage.numberOfDaysKeepRoom === null ||
                    brokerage.numberOfDaysKeepRoom === undefined
                      ? "1 Ngày"
                      : `${brokerage.numberOfDaysKeepRoom} Ngày`,
                },
              ]}
            />
          </div>
          {/* ngày */}
          <div className="flex items-center justify-between mt-10">
            <p className="text-lg leading-6 font-medium text-gray-900">
              Chính sách ưu đãi
            </p>
          </div>
          <div className="grid grid-cols-2   gap-6 mt-6">
            <div className="flex flex-col items-start w-full">
              <p className="text-sm leading-5 font-medium">
                Ngày bắt đầu ưu đãi:
              </p>
              <div className=" h-[38px] w-full flex   items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm py-[9px]   ">
                <input
                  type="date"
                  placeholder=""
                  name="startDate"
                  defaultValue={
                    isCorrectPath
                      ? null
                      : convertISOToDateInput(brokerage.startDate)
                  }
                  onChange={(e) =>
                    updateFormValue({
                      updateType: "startDate",
                      value: convertToISOStartOfDay(e.target.value),
                    })
                  }
                  className=" w-full h-full text-gray-900 font-normal font-inter text-base leading-20 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-sm leading-5 font-medium">
                Ngày kết thúc ưu đãi:
              </p>
              <div className=" h-[38px] w-full flex   items-center self-stretch rounded-md border border-gray-300 bg-white shadow-sm py-[9px]   ">
                <input
                  type="date"
                  placeholder=""
                  name="endDate"
                  defaultValue={
                    isCorrectPath
                      ? null
                      : (new Date(brokerage.endDate) < new Date() ? null : convertISOToDateInput(brokerage.endDate))
                  }
                  onChange={(e) =>
                    updateFormValue({
                      updateType: "endDate",
                      value: convertToISOStartOfDay(e.target.value),
                    })
                  }
                  className=" w-full h-full text-gray-900 font-normal font-inter text-base leading-20 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
            <InputArea
              updateFormValue={updateFormValue}
              updateType="saleIncentives"
              lable="Ưu đãi sale"
              defaultValue={brokerage.saleIncentives}
            />
          </div>
          <div className="mt-6">
            <div className="flex gap-7 mb-4">
              <div className="flex items-center me-4">
                <input
                  checked={isExclusive}
                  onChange={updateExclusive}
                  id="inline-checked-radio"
                  type="radio"
                  name="inline-radio-group"
                  className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500 focus:ring-2"
                />
                <label
                  htmlFor="inline-checked-radio"
                  className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Độc quyền
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  checked={!isExclusive}
                  onChange={updateExclusive}
                  id="inline-2-radio"
                  type="radio"
                  name="inline-radio-group"
                  className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500 focus:ring-2"
                />
                <label
                  htmlFor="inline-2-radio"
                  className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Không độc quyền
                </label>
              </div>
            </div>
            {isExclusive && (
              <InputText
                updateFormValue={updateFormValue}
                updateType="pass"
                lable="Mật khẩu độc quyền"
                defaultValue={brokerage.pass}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
